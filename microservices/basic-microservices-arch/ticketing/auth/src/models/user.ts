import mongoose from 'mongoose';
import { PasswordUtils } from '../services/password';

// Attributes necessary to create a user
export interface UserAttrs {
  email: string;
  password: string;
}

// Interface that describes the properties a User Model has
interface UserModel extends mongoose.Model<UserDoc> {
  build: (attrs: UserAttrs) => UserDoc;
}

// Properties that a user Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    // Define a custom toJSON method for how mongoose will JSON.stringify our users
    toJSON: {
      transform(doc, ret) {
        // Alias the _id property to a more standard `id`
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
      },
      // Don't return the __v property
      versionKey: false,
    },
  }
);

userSchema.pre('save', async function (done) {
  if (this.isModified('password')) {
    const hashed = await PasswordUtils.toHash(this.get('password'));
    this.set('password', hashed);
  }
  done();
});

userSchema.statics.build = (attrs: UserAttrs) => new User(attrs);

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };
