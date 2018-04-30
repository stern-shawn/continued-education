Note that to enable CORS for our S3 bucket so that we can actually perform uploads, we need to update the CORS configuration in S3 by adding a new CORSRule block ex:

```xml
<!-- Sample policy -->
<CORSConfiguration>
  <!-- This block exists by default -->
	<CORSRule>
		<AllowedOrigin>*</AllowedOrigin>
		<AllowedMethod>GET</AllowedMethod>
		<MaxAgeSeconds>3000</MaxAgeSeconds>
		<AllowedHeader>Authorization</AllowedHeader>
	</CORSRule>
  <!-- This should be added to enable PUT actions from our front-end app -->
	<CORSRule>
		<AllowedOrigin>(our app domain))</AllowedOrigin>
		<AllowedMethod>PUT</AllowedMethod>
		<MaxAgeSeconds>3000</MaxAgeSeconds>
		<AllowedHeader>*</AllowedHeader>
	</CORSRule>
</CORSConfiguration>
```

Also note that when creating the aws S3 client, the method provided in the course leaves out some key properties that result in 307 redirects and 403 forbidden errors when attempting to PUT the new image to S3.
The `region` and `signatureVersion` properties MUST be included for painless uploads in addition to the CORS config. In my case, I'm in Oregon and using the 'us-west-2' region.

```js
const s3 = new aws.S3({
  accessKeyId: keys.accessKeyId,
  secretAccessKey: keys.secretAccessKey,
  signatureVersion: 'v4',
  region: 'us-west-2',
});
```

Also note that once an image is added to the S3 bucket, by default, the bucket is set so that nobody can access the files directly using the provided links. You must update the S3 bucket policy so that users can perform the `getObject` action on that bucket's ARN (easy to set up using the policy generator, etc)
