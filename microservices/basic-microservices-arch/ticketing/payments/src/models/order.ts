import { OrderStatus } from '@sstickets/common';
import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface OrderAttrs {
  id: string;
  status: OrderStatus;
  version: number;
  userId: string;
  price: number;
}

interface OrderDoc extends mongoose.Document {
  status: OrderStatus;
  version: number;
  userId: string;
  price: number;
}

interface OrderModel extends mongoose.Model<OrderDoc> {
  build(attrs: OrderAttrs): OrderDoc;
}

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      // Type string, but also make sure it's limited to our enum values with a default :)
      enum: Object.values(OrderStatus),
      default: OrderStatus.Created,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

// Use versioning for OCC
orderSchema.set('versionKey', 'version');
orderSchema.plugin(updateIfCurrentPlugin);

// Force the mongo _id so we have stable ids across services
orderSchema.statics.build = ({ id, ...attrs }: OrderAttrs) => new Order({ _id: id, ...attrs });

const Order = mongoose.model<OrderDoc, OrderModel>('Order', orderSchema);

export { Order };
