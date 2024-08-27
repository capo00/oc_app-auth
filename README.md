# App Authentication

- based on `jsonwebtoken` and `google`

## API

### init(app, { prefixPath = "/auth" } = {})

| Param        | Desc                                              |
|--------------|---------------------------------------------------|
| `app`        | Instance of express. E.g. `const app = express()` |    
| `prefixPath` | Prefix of url for authentication routes.          | 

```
const app = express();
OcAuth.init(app);
```

## ENV

- add .env file next to package.json and configure your App:

| Param                   | Desc                                                                                                                           |
|-------------------------|--------------------------------------------------------------------------------------------------------------------------------|
| MONGODB_URI             | Uri of the mongo database. Required for authentication and creating identity.                                                  |
| GOOGLE_CLIENT_ID        | Google client id which is generated in Google Console -> APIs & Services -> Credentials -> OAuth. Required for authentication. |
| GOOGLE_CLIENT_SECRET    | Google secret key is generated with client id. Required for authentication.                                                    |
| JWT_SECRET              | Secret key for App token.<br/>Default: GOOGLE_CLIENT_SECRET                                                                    |
| JWT_LIFETIME            | Time to live for the token.<br/>Default: 1d                                                                                    |

## Publishing to npmjs

`npm publish --access public`