# Categories:

:information_source: JSON Format

All requests must have JSON format. Hence, you have to set "Content-Type" field in the header to be "application/json".

:information_source: Authorization

Some API calls require authorization. Set "Authorization" field in header to contain JWT token that you obtained from the last successful login attempt. You will be able to access those APIs based on the permission level that you have.

## Basic Categories Info

### GET `/categories`

Read multiple categories basic info (for Home).

#### Request:

Body: 
```
{}
```

#### Response 

Body:
```
{
  "message" : [ {
      "name"      : ..., 
      "slug"      : ...,
      "logo_url"  : ...,
  } ]
}
```

### GET `/categories/:slug`

Read full info of a cateogry (for category page)

#### Request 

Body:
```
{}
```

#### Response 

Body:
```
{
  "message" : {
    "name"            : ...,
    "slug"            : ...,
    "logo_url"        : ...,
    "description"     : ...,
    "banners"         : [ {
      "_id"         : ...,
      "image_url"   : ...
    } ],
    "plans"           : [ {
      "_id"         : ...,
      "name"        : ...,
      "description" : ...
    } ], 
    "representatives" : [ {
      "_id"         : ...,
      "name"        : ...,
      "description" : ...,
      "photo_url"   : ...
    } ],
  }
}
```

### GET `/plan-info`

Real plan info of multiple categories:

#### Request 

Body:
```
{
  "categories": [ {
    "slug"    : ...,
    "planIds" : [ ... ] 
  } ]
}
```

#### Response 

Body:
```
{
  "message": {
    "categories" : [ {
      "name"  : ...,
      "plans" : [ {
        "_id"         : ...,
        "name"        : ...,
        "description" : ...,
      } ]
    } ]
  }
}
```

### POST `/categories`

> :warning: **Requires authorization**

Create category

#### Request 

Body:
```
{
  "category": {
    "name"        : ...,
    "logo_url"    : ...,
    "description" : ...
  }
}
```

#### Response

Body:
```
{
  "message": ...
}
```

### DELETE `/categories/:slug`

> :warning: **Requires authorization**

Delete category

#### Request

Body: 
```
{}
```

#### Response

Body:
```
{
  "message": ...
}
```

### POST `/categories/:slug`

> :warning: **Requires authorization**

Update category

#### Request
```
{
  "category": {
    "name"        : ...,
    "logo_url"    : ...,
    "description" : ...
  }
}
```

#### Response
```
{
  "message": ...
}
```

## Banners for Categories

### POST `/categories/:slug/banners`

Add a banner for a category

#### Request
```
{
  "banner": {
    "image_url" : ...
  }
}
```

#### Response
```
{
  "message" : ...
}
```

### DELETE `/categories/:slug/banners/:bannerId`

Remove a banner for a category

#### Request
```
{}
```

#### Response
```
{
  "message" : ...
}
```

## Plans for Categories

### POST `/categories/:slug/plans`

Add a plan for a category

#### Request
```
{
  "plan" : {
    "name"        : ...,
    "description" : ...
  }
}
```

#### Response
```
{
  "message" : ...
}
```

### POST `/categories/:slug/plans/:planId`

Update a plan for a category

#### Request
```
{
  "plan" : {
    "name"        : ...,
    "description" : ...
  }
}
```

#### Response
```
{
  "message" : ...
}
```

### DELETE `/categories/:slug/plans/:planId`

Remove a plan for a category

#### Request
```
{}
```

#### Response
```
{
  "message" : ...
}
```

## Representatives for Categories

### POST `/categories/:slug/representatives`

Add a representative for a category

#### Request
```
{
  "representative" : {
    "name"        : ...,
    "description" : ...,
    "photo_url"   : ...
  }
}
```

#### Response
```
{
  "message" : ...
}
```

### POST `/categories/:slug/representatives/:representativeId`

Update a representative for a category

#### Request
```
{
  "representative" : {
    "name"        : ...,
    "description" : ...,
    "photo_url"   : ...
  }
}
```

#### Response
```
{
  "message" : ...
}
```

### DELETE `/categories/:slug/representatives/:representativeId`

Remove a representative for a category

#### Request
```
{}
```

#### Response
```
{
  "message" : ...
}
```
