When we return from Google OAuth flow to /auth/google/callback?code=..., the headers in the response contain `session` and `session.sig`.

If we decode the value of that cookie from its base64 form, we get back a session object that contains the id of our user from mongodb like so:

```JavaScript
> const session = 'eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNWFlMGY0MTQ1OTYyMGNmN2U0MDNhOWFmIn19'
> const Buffer = require('safe-buffer').Buffer
> Buffer.from(session, 'base64').toString('utf-8')
'{"passport":{"user":"5ae0f41459620cf7e403a9af"}}'
```

This matches exactly with the user id in our mongodb mlab instance!

This user object is then assigned by cookie-session library to the `req.session` object in express as a POJO.
*It uses the session.sig value to verify the session hasn't been manipulated (somehow)?*

Passport then looks at `req.session`, and tries to find `req.session.passport.user` value.
If found, it executes `deserializeUser`, which (in this implementation) looks up that user in Mongodb, and if successful, returns them, and that value is assigned to `req.user`!

Because it easy for a malicious user to decode the cookie contents so easily, it's possible for one to reverse the process by creating an object with a different user's id, convert that to a base64 key, set that as their cookie, and spoof as that user.
This is where the session signature comes in. The signature uses our server secret to sign and verify a given cookie string, by means of the keygrip library like so:

```JavaScript
> const session = 'eyJwYXNzcG9ydCI6eyJ1c2VyIjoiNWFlMGY0MTQ1OTYyMGNmN2U0MDNhOWFmIn19'
> const Keygrip = require('keygrip')
> const keygrip = new Keygrip(['123123123']) // here 123123123 is the secret used in development
> keygrip.sign('session=' + session)
'FR1G0ReVBRn282ikhTpIjS_KT_E'
> keygrip.verify('session=' + session, 'FR1G0ReVBRn282ikhTpIjS_KT_E')
true
> keygrip.verify('session=' + session, 'FR1G0ReVBRn282ikhTpIjS_KT_')
false
```

With this signature requirement, even if a malicious user creates a cookie for a different user they cannot generate a verifiable signature without knowing the secret, thus the cookies are more secure as long as the secret remains safe.
