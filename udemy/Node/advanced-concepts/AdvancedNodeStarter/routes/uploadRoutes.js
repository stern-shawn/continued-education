const aws = require('aws-sdk');
const uuid = require('uuid/v4');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

// Create a new AWS S3 service object
const s3 = new aws.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
});

module.exports = app => {
  app.get('/api/upload', requireLogin, async (req, res) => {
    // Generate a signed url from aws s3 that our user can use to upload the file directly to s3 with, without us having
    // to temporarily store files in the express server memory or server local disk!
    s3.getSignedUrl('putObject',
      {
        Bucket: 'shawn-stern-advanced-node',
        ContentType: 'jpeg',
        Key: `${req.user.id}/${uuid()}.jpeg`,
      },
      (err, url) => res.send({ url }),
    );
  });
};
