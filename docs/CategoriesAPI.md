# Categories:

:information_source: JSON Format

All requests must have JSON format. Hence, you have to set "Content-Type" field in the header to be "application/json".

:information_source: Authorization

Some API calls require authorization. Set "Authorization" field in header to contain JWT token that you obtained from the last successful login attempt. You will be able to access those APIs based on the permission level that you have.

## Basic Categories Info

### GET `/categories`

Read multiple categories basic info (for Home).

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

### POST `/plan-info`

Real plan info of multiple categories:

#### Request

Body:

```
{
  "categories": {
    $slug: [ plan ids ]
  }
}
```

`$slug` represents category slug that is used as the key for a particular array of plan ids. You may pass arbitrary number of slugs and plan ids for the API query.

#### Response

Body:

```
{
  "message": {
    "categories" : {
      $slug: {
        "name"  : ...,
        "plans" : [ {
          "_id"         : ...,
          "name"        : ...,
          "description" : ...,
        } ]
      }
    }
  }
}
```

### POST `/checkout`

Real plan info of multiple categories:

#### Request

Body:

```
{
  "categories": {
    $slug: [ plan ids ]
  },
  "orderInfo": {
    "name": ...,
    "email": ...,
    "visitDate": ...,
    "organization": ...,
    "remarks": ...
  }
}
```

`$slug` represents category slug that is used as the key for a particular array of plan ids. You may pass arbitrary number of slugs and plan ids for the API query.

#### Response

Body:

```
{
  "message": ...
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

> :warning: **Requires authorization**

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

> :warning: **Requires authorization**

Remove a banner for a category

## Plans for Categories

### POST `/categories/:slug/plans`

> :warning: **Requires authorization**

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

> :warning: **Requires authorization**

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

> :warning: **Requires authorization**

Remove a plan for a category

#### Response

```
{
  "message" : ...
}
```

## Representatives for Categories

### POST `/categories/:slug/representatives`

> :warning: **Requires authorization**

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

> :warning: **Requires authorization**

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

> :warning: **Requires authorization**

Remove a representative for a category

#### Response

```
{
  "message" : ...
}
```
