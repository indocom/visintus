# Images

:information_source: Authorization

Some API calls require authorization. Set "Authorization" field in header to contain JWT token that you obtained from the last successful login attempt. You will be able to access those APIs based on the permission level that you have.

## APIs

- upload
- unlink

### POST `/images/upload`

Upload an image to the API service.
Image will be stored in `/static/images` folder.

#### Request

Request is expected to be in `multipart/form-data`.

#### Response

Body:

```
{
  "message" : {
    "image": {
      "url": ...
    }
  }
}
```

### POST `/images/unlink`

#### Request:

```
{
  "image": {
    "url": ...
  }
}
```

#### Response

Body:

```
{
  "message" : ...
}
```
