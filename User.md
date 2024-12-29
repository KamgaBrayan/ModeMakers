
---

# API Documentation: User Entity

## Overview
The `user` entity represents a user in the system. It includes essential user information such as name, email, password, roles, photos, notes, bibliography, calendar, preferences, and measures. Additionally, it contains the user's **specialty** and **experience**.

---

## 1. List Users

**Method:** GET  
**Endpoint:** `/api/user`  
**Description:** Retrieves a list of all users.

### Responses
#### 200 OK
```json
[
    {
        "id": 1,
        "name": "Gabriel Nomo",
        "email": "gabriel@example.com",
        "roles": ["ROLE_USER"],
        "photos": ["photo1.jpg", "photo2.jpg"],
        "note": 5,
        "bibliography": "Some biography text.",
        "calendar": ["monday", "thursday","sunday"],
        "preferences_id": [1, 2],
        "measures_id": [101, 102],
        "specialty": "clothes",
        "experience": "5 years in stylism",
        
   }
]
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while fetching the users. Please try again later."
  }
}
```

---

## 2. Retrieve a User

**Method:** GET  
**Endpoint:** `/api/user/{id}`  
**Description:** Retrieves details of a specific user by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the user    |

### Responses
#### 200 OK
```json
{
  "id": 1,
  "name": "Gabriel Nomo",
  "email": "gabriel@example.com",
  "roles": ["ROLE_USER"],
  "photos": ["photo1.jpg", "photo2.jpg"],
  "note": 5,
  "bibliography": "Some biography text.",
  "calendar": ["monday", "thursday","sunday"],
  "preferences_id": [1, 2],
  "measures_id": [101, 102],
  "specialty": "clothes",
  "experience": "5 years in stylism"
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "User not found."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while fetching the user. Please try again later."
  }
}
```

---

## 3. Create a User

**Method:** POST  
**Endpoint:** `/api/user`  
**Description:** Creates a new user.

### Request Body
```json
{
  "name": "Gabriel Nomo",
  "email": "gabriel@example.com",
  "password": "securepassword123",
  "roles": ["ROLE_USER"],
  "photos": ["photo1.jpg", "photo2.jpg"],
  "note": 5,
  "bibliography": "Some biography text.",
  "calendar": ["monday", "thursday","sunday"],
  "preferences_id": [1, 2],
  "measures_id": [101, 102],
  "specialty": "clothes",
  "experience": "5 years in stylism"
}
```

### Responses
#### 201 Created
```json
{
  "id": 1,
  "name": "Gabriel Nomo",
  "email": "gabriel@example.com",
  "roles": ["ROLE_USER"],
  "photos": ["photo1.jpg", "photo2.jpg"],
  "note": 5,
  "bibliography": "Some biography text.",
  "calendar": ["monday", "thursday","sunday"],
  "preferences_id": [1, 2],
  "measures_id": [101, 102],
  "specialty": "clothes",
  "experience": "5 years in stylism"
}
```

#### 400 Bad Request
```json
{
  "error": "Validation error.",
  "details": {
    "name": "The name is required.",
    "email": "The email is required.",
    "password": "The password is required.",
    "roles": "The roles are required.",
    "photos": "The photos are required.",
    "note": "The note is required.",
    "bibliography": "The bibliography is required.",
    "calendar": "The calendar is required.",
    "preferences_id": "The preferences_id must be an array of integers.",
    "measures_id": "The measures_id must be an array of integers.",
    "specialty": "The specialty is required.",
    "experience": "The experience is required."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while creating the user. Please try again later."
  }
}
```

---

## 4. Update a User

**Method:** PUT  
**Endpoint:** `/api/user/{id}`  
**Description:** Updates an existing user by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the user    |

### Request Body
```json
{
  "name": "Gabriel Nomo",
  "email": "gabriel_new@example.com",
  "password": "newpassword123",
  "roles": ["ROLE_USER"],
  "photos": ["photo1.jpg", "photo2.jpg"],
  "note": 5,
  "bibliography": "Updated biography text.",
  "calendar": ["monday", "thursday","sunday"],
  "preferences_id": [1, 2],
  "measures_id": [101, 102],
  "specialty": "stylism",
  "experience": "6 years in stylism"
}
```

### Responses
#### 200 OK
```json
{
  "id": 1,
  "name": "Gabriel Nomo",
  "email": "gabriel_new@example.com",
  "roles": ["ROLE_USER"],
  "photos": ["photo1.jpg", "photo2.jpg"],
  "note": 5,
  "bibliography": "Updated biography text.",
  "calendar": ["monday", "thursday","sunday"],
  "preferences_id": [1, 2],
  "measures_id": [101, 102],
  "specialty": "stylism",
  "experience": "6 years in stylism"
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "User not found."
  }
}
```

#### 400 Bad Request
```json
{
  "error": "Validation error.",
  "details": {
    "name": "The name is required.",
    "email": "The email is required.",
    "password": "The password is required.",
    "roles": "The roles are required.",
    "photos": "The photos are required.",
    "note": "The note is required.",
    "bibliography": "The bibliography is required.",
    "calendar": "The calendar is required.",
    "preferences_id": "The preferences_id must be an array of integers.",
    "measures_id": "The measures_id must be an array of integers.",
    "specialty": "The specialty is required.",
    "experience": "The experience is required."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while updating the user. Please try again later."
  }
}
```

---

## 5. Delete a User

**Method:** DELETE  
**Endpoint:** `/api/user/{id}`  
**Description:** Deletes a specific user by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the user    |

### Responses
#### 200 OK
```json
{
  "message": "User successfully deleted."
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "User not found."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while deleting the user. Please try again later."
  }
}
```

---

**Note:** All endpoints require proper authentication and authorization headers to access.

---
