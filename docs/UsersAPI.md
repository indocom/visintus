# Categories:

:information_source: JSON Format

All requests must have JSON format. Hence, you have to set "Content-Type" field in the header to be "application/json".

:information_source: Authorization

Some API calls require authorization. Set "Authorization" field in header to contain JWT token that you obtained from the last successful login attempt. You will be able to access those APIs based on the permission level that you have.


### POST `/register`

Register a new user.

#### Request:

Body: 
```
{
  "user": {
    "name"      : ...,
    "email"     : ...,
    "password"  : ...
  }
}
```

#### Response 

Body:
```
{
  "message" : {
    "token" : ...
  }
}
```

### POST `/login`

Login.

#### Request:

Body: 
```
{
  "user": {
    "email"     : ...,
    "password"  : ...
  }
}
```

#### Response 

Body:
```
{
  "message" : {
    "token" : ...
  }
}
```

### POST `/logout`

Logout.

#### Request:

Body: 
```
{}
```

#### Response 

Body:
```
{
  "message" : ...
}
```
