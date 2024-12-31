# API Documentation: Authentication Routes

## 1. Login

**Method:** POST  
**Endpoint:** `/api/auth/login`  
**Description:** Authenticates a user and provides an access token.

### Request Body
```json
{
  "email": "gabriel@example.com",
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
**Endpoint:** `/api/auth/register`  
**Description:** Creates a new user account and provides a JWT token upon success.

### Request Body
```json
{
  "name": "gabriel1",
  "email": "gabriel1@example.com",
  "password": "password123",
 
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
    "user": {
        "name": "gabriel1",
        "email": "gabriel1@example.com",
        "updated_at": "2024-12-31T17:33:58.000000Z",
        "created_at": "2024-12-31T17:33:58.000000Z",
        "id": 2
    },
    "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL2F1dGgvcmVnaXN0ZXIiLCJpYXQiOjE3MzU2NjY0MzgsImV4cCI6MTczNTY3MDAzOCwibmJmIjoxNzM1NjY2NDM4LCJqdGkiOiJtRkVxSjZyNTFCMjE1ZEZZIiwic3ViIjoiMiIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.EfT-UZwQcuAiQC7aYlYDSjhQSDwFjF-Kfhey-mbZKfM",
    "token_type": "bearer",
    "expires_in": 3600
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
---
## 3. Logout

**Method:** POST  
**Endpoint:** `/api/auth/logout`  
**Description:** Logs out the authenticated user by invalidating their access token.

### Headers
| Name           | Type   | Description           |
|----------------|--------|-----------------------|
| Authorization  | string | Should be `Bearer <access_token>`. |

### Responses
#### 200 OK
```json
{
  "message": "Successfully logged out."
}
```

#### 401 Unauthorized
```json
{
  "error": "Invalid or missing token."
}
```
---
## 4. Profile

**Method:** GET  
**Endpoint:** `/api/auth/profile`  
**Description:** Retrieves the profile information of the authenticated user.

### Headers
| Name           | Type   | Description           |
|----------------|--------|-----------------------|
| Authorization  | string | Should be `Bearer <access_token>`. |

### Responses
#### 200 OK
```json
{
  "id": 1,
  "name": "gabriel",
  "email": "gabriel@example.com",
  "profile_picture_url": "https://example.com/storage/profile-pic.jpg"
}
```

#### 401 Unauthorized
```json
{
  "error": "Invalid or expired token."
}
```

#### 404 Not Found
```json
{
  "error": "User not found."
}
```
---

**Note:** Ensure secure HTTPS is used for transmitting sensitive information.
