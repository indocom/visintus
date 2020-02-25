# Users:

:information_source: JSON Format

All requests must have JSON format. Hence, you have to set "Content-Type" field in the header to be "application/json".

:information_source: Authorization

Some API calls require authorization. Set "Authorization" field in header to contain JWT token that you obtained from the last successful login attempt. You will be able to access those APIs based on the permission level that you have.

## APIs

- forgot-password
- list
- login
- logout
- register
- reset-password
- update-role
- verify

### POST `/users/forgot-password`

Forgot password.

#### Request:

```
{
  "user": {
    "email": ...
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

### GET `/users/list`

> :warning: **Requires authorization (superadmin)**

List all users info.

#### Response

Body:

```
{
  "message" : {
    "users": [{
      "name": ...,
      "email": ...,
      "role": ...
    }]
  }
}
```

### POST `/users/login`

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
    "token" : ...,
    "userData": {
      "name": ...,
      "initials": ...,
      "email": ...,
      "role": ...
    }
  }
}
```

### POST `/users/logout`

> :warning: **Requires authorization**

Logout.


#### Request:

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

### POST `/users/register`

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

### POST `/users/reset-password`

> :warning: **Requires authorization**

Reset password.

#### Request:

Body:

```
{
  "user": {
    "email"        : ...,
    "newPassword"  : ...
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

### POST `/users/update-role`

> :warning: **Requires authorization (superadmin)**

Update role for user.

#### Request

```
{
  "user": {
    "email": ...
    "role": ...
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

### POST `/users/verify`

Verify a user.

#### Request:

Body: 
```
{
  "user": {
    "email"           : ...
    "verificationId"  : ...
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
