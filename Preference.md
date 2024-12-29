 ---

# API Documentation: Preference Entity

## Overview
The `preference` entity represents a user's preferences. Each preference contains details about the user, the category, and the specific fields associated with that preference.

---

## 1. List Preferences

**Method:** GET  
**Endpoint:** `/api/preference`  
**Description:** Retrieves a list of all preferences.

### Responses
#### 200 OK
```json
[
    {
        "id": 1,
        "user": {
            "user_id": 123,
            "user_name": "John Doe"
        },
        "category": "Category A",
        "field1": "Value 1"
    }
]
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while fetching the preferences. Please try again later."
  }
}
```

---

## 2. Retrieve a Preference

**Method:** GET  
**Endpoint:** `/api/preference/{id}`  
**Description:** Retrieves details of a specific preference by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the preference  |

### Responses
#### 200 OK
```json
{
  "id": 1,
  "user": {
    "user_id": 123,
    "user_name": "John Doe"
  },
  "category": "Category A",
  "field1": "Value 1"
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "Preference not found."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while fetching the preference. Please try again later."
  }
}
```

---

## 3. Create a Preference

**Method:** POST  
**Endpoint:** `/api/preference`  
**Description:** Creates a new preference.

### Request Body
```json
{
  "user": {
    "user_id": 123,
    "user_name": "John Doe"
  },
  "category": "Category A",
  "field1": "Value 1"
}
```

### Responses
#### 201 Created
```json
{
  "id": 1,
  "user": {
    "user_id": 123,
    "user_name": "John Doe"
  },
  "category": "Category A",
  "field1": "Value 1"
}
```

#### 400 Bad Request
```json
{
  "error": "Validation error.",
  "details": {
    "user": "The user information is required.",
    "category": "The category field is required.",
    "field1": "The field1 field is required."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while creating the preference. Please try again later."
  }
}
```

---

## 4. Update a Preference

**Method:** PUT  
**Endpoint:** `/api/preference/{id}`  
**Description:** Updates an existing preference by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the preference  |

### Request Body
```json
{
  "user": {
    "user_id": 123,
    "user_name": "John Doe"
  },
  "category": "Category A",
  "field1": "Updated Value"
}
```

### Responses
#### 200 OK
```json
{
  "id": 1,
  "user": {
    "user_id": 123,
    "user_name": "John Doe"
  },
  "category": "Category A",
  "field1": "Updated Value"
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "Preference not found."
  }
}
```

#### 400 Bad Request
```json
{
  "error": "Validation error.",
  "details": {
    "user": "The user information is required.",
    "category": "The category field is required.",
    "field1": "The field1 field is required."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while updating the preference. Please try again later."
  }
}
```

---

## 5. Delete a Preference

**Method:** DELETE  
**Endpoint:** `/api/preference/{id}`  
**Description:** Deletes a specific preference by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the preference  |

### Responses
#### 200 OK
```json
{
  "message": "Preference successfully deleted."
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "Preference not found."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while deleting the preference. Please try again later."
  }
}
```

---

**Note:** All endpoints require proper authentication and authorization headers to access.

---
