# API Documentation: Authentication Routes

## 1. Login

**Method:** POST  
**Endpoint:** `/api/login`  
**Description:** Authenticates a user and provides an access token.

### Request Body
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

### Headers
| Name           | Type   | Description           |
|----------------|--------|-----------------------|
| Content-Type   | string | Should be `application/json`. |

### Responses
#### 200 OK
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer"
}
```

#### 401 Unauthorized
```json
{
  "error": "Invalid credentials."
}
```

---

## 2. Register

**Method:** POST  
**Endpoint:** `/api/register`  
**Description:** Creates a new user account and provides a JWT token upon success.

### Request Body
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
```

### Headers
| Name           | Type   | Description           |
|----------------|--------|-----------------------|
| Content-Type   | string | Should be `application/json`. |

### Responses
#### 201 Created
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "token_type": "Bearer",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

#### 400 Bad Request
- **Missing Fields:**
  ```json
  {
    "error": "Validation error.",
    "details": {
      "email": "The email field is required.",
      "password": "The password field is required."
    }
  }
  ```

- **Invalid Email Format:**
  ```json
  {
    "error": "Validation error.",
    "details": {
      "email": "The email must be a valid email address."
    }
  }
  ```

- **Password Mismatch:**
  ```json
  {
    "error": "Validation error.",
    "details": {
      "password_confirmation": "The password confirmation does not match."
    }
  }
  ```

- **Email Already Taken:**
  ```json
  {
    "error": "Validation error.",
    "details": {
      "email": "The email has already been taken."
    }
  }
  ```

#### 500 Internal Server Error
```json
{
  "error": "An unexpected error occurred. Please try again later."
}

```
---

**Note:** Ensure secure HTTPS is used for transmitting sensitive information.
