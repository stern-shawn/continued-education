const Buffer = require('safe-buffer').Buffer;
const Keygrip = require('keygrip');
const keys = require('../../config/keys');

const keygrip = new Keygrip([keys.cookieKey]);

module.exports = (user) => {
  const sessionObject = {
    passport: {
      user: user._id.toString(), // user is a mongoose document, and _id is actually an object not a plain string, yet
    },
  };

  const session = Buffer.from(JSON.stringify(sessionObject)).toString('base64');

  const sig = keygrip.sign(`session=${session}`);

  return {
    session,
    sig,
  };
};
