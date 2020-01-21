# Highlights:

:information_source: JSON Format

All requests must have JSON format. Hence, you have to set "Content-Type" field in the header to be "application/json".

:information_source: Authorization

Some API calls require authorization. Set "Authorization" field in header to contain JWT token that you obtained from the last successful login attempt. You will be able to access those APIs based on the permission level that you have.

### GET `/highlights`

Read all highlights

#### Response

```
{
  "message" : {
    "image_url"   : ...,
    "description" : ...,
    "hyperlink"   : ...
  }
}
```

### POST `/highlights`

> :warning: **Requires authorization**

Add a highlight

#### Request

```
{
  "highlight" : {
    "image_url"   : ...,
    "description" : ...,
    "hyperlink"   : ...
  }
}
```

#### Response

```
{
  "message" : ...
}
```

### POST `/highlights/:highlightId`

> :warning: **Requires authorization**

Update a highlight

#### Request

```
{
  "highlight" : {
    "image_url"   : ...,
    "description" : ...,
    "hyperlink"   : ...
  }
}
```

#### Response

```
{
  "message" : ...
}
```

### DELETE `/highlights/:highlightId`

> :warning: **Requires authorization**

Remove a representative for a category

#### Response

```
{
  "message" : ...
}
```
