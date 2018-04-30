const aws = require('aws-sdk');
const uuid = require('uuid/v4');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

// Create a new AWS S3 service object
const s3 = new aws.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  signatureVersion: 'v4',
  region: 'us-west-2',
});

// Promisify the getSignedUrl operation, since AWS doesn't have native Promise support for operations that don't return
// a Result object (getSignedUrl is one of them, yay...)
const getSignedUrlPromise = (operation, params) =>
  new Promise((resolve, reject) => {
    s3.getSignedUrl(operation, params, (err, url) => {
      err ? reject(err) : resolve(url);
    });
  });

module.exports = app => {
  app.get('/api/upload', requireLogin, async (req, res) => {
    const key = `${req.user.id}/${uuid()}.jpeg`;
    // Generate a signed url from aws s3 that our user can use to upload the file directly to s3 with, without us having
    // to temporarily store files in the express server memory or server local disk!
    const url = await getSignedUrlPromise('putObject', {
      Bucket: 'shawn-stern-advanced-node',
      ContentType: 'image/jpeg',
      Key: key,
    }).catch(err => console.error(err));

    res.send({
      key,
      url,
    });
  });
};
