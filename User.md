# API Documentation: User Entity

## Overview
The `user` entity represents a user in the system. Users can be either clients (ROLE_USER) or stylists (ROLE_STYLIST). It includes essential user information such as name, email, password, roles, profile picture, photos, notes, bibliography, calendar, preferences, and measures. For stylists, additional information includes **specialty** and **experience**.

## Authentication
All endpoints require a valid JWT token in the Authorization header:

```bash
Authorization: Bearer {token}
```

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
        "profil_picture": "profile1.jpg",
        "roles": ["ROLE_STYLIST"],
        "photos": ["photo1.jpg", "photo2.jpg"],
        "note": 5,
        "bibliography": "Some biography text.",
        "calendar": ["monday", "thursday","sunday"],
        "preferences_id": [1, 2],
        "measures_id": [101, 102],
        "specialty": "clothes",
        "experience": "5 years in stylism"
    }
]
```

#### 401 Unauthorized
```json
{
  "error": {
    "code": 401,
    "type": "Unauthorized",
    "message": "Invalid or missing token"
  }
}
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
  "profil_picture": "profile1.jpg",
  "roles": ["ROLE_STYLIST"],
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

#### 401 Unauthorized
```json
{
  "error": {
    "code": 401,
    "type": "Unauthorized",
    "message": "Invalid or missing token"
  }
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
  "profil_picture": "",
  "roles": ["ROLE_STYLIST"],
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
  "profil_picture": "",
  "roles": ["ROLE_STYLIST"],
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
    "roles": "The roles must be either ROLE_USER or ROLE_STYLIST.",
    "photos": "The photos are required.",
    "note": "The note is required.",
    "bibliography": "The bibliography is required.",
    "calendar": "The calendar is required.",
    "preferences_id": "The preferences_id must be an array of integers.",
    "measures_id": "The measures_id must be an array of integers.",
    "specialty": "The specialty is required for stylists.",
    "experience": "The experience is required for stylists."
  }
}
```

#### 401 Unauthorized
```json
{
  "error": {
    "code": 401,
    "type": "Unauthorized",
    "message": "Invalid or missing token"
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
  "profil_picture": "new_profile.jpg",
  "roles": ["ROLE_STYLIST"],
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
  "profil_picture": "new_profile.jpg",
  "roles": ["ROLE_STYLIST"],
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

#### 400 Bad Request
```json
{
  "error": "Validation error.",
  "details": {
    "name": "The name is required.",
    "email": "The email is required.",
    "password": "The password is required.",
    "roles": "The roles must be either ROLE_USER or ROLE_STYLIST.",
    "photos": "The photos are required.",
    "note": "The note is required.",
    "bibliography": "The bibliography is required.",
    "calendar": "The calendar is required.",
    "preferences_id": "The preferences_id must be an array of integers.",
    "measures_id": "The measures_id must be an array of integers.",
    "specialty": "The specialty is required for stylists.",
    "experience": "The experience is required for stylists."
  }
}
```

#### 401 Unauthorized
```json
{
  "error": {
    "code": 401,
    "type": "Unauthorized",
    "message": "Invalid or missing token"
  }
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

#### 401 Unauthorized
```json
{
  "error": {
    "code": 401,
    "type": "Unauthorized",
    "message": "Invalid or missing token"
  }
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

## 6. Upload Profile Picture

**Method:** POST  
**Endpoint:** `/api/user/profile-picture`  
**Description:** Uploads or updates the authenticated user's profile picture.

### Request
- Content-Type: multipart/form-data
- Body: form-data with key "profile_picture" containing the image file
- Authorization: Bearer token required

### Responses
#### 200 OK
```json
{
  "message": "Profile picture updated successfully",
  "profile_picture_url": "profile1.jpg"
}
```

#### 400 Bad Request
```json
{
  "error": {
    "code": 400,
    "type": "Bad Request",
    "message": "Invalid file format. Supported formats are: jpg, jpeg, png"
  }
}
```

#### 401 Unauthorized
```json
{
  "error": {
    "code": 401,
    "type": "Unauthorized",
    "message": "Invalid or missing token"
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while uploading the profile picture. Please try again later."
  }
}
```

---

**Notes:** 
- All endpoints require proper authentication and authorization headers to access.
- The specialty and experience fields are required only for users with ROLE_STYLIST.
- Profile pictures must be in jpg, jpeg, or png format.
- Maximum file size for profile pictures: 5MB

---