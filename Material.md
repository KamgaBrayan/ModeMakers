
# API Documentation: Material Entity

## Overview
The `Material` entity represents a material in the system, including its attributes and relationships with other entities. Below are the details of the API routes for managing materials.

---

## 1. List Materials

**Method:** GET  
**Endpoint:** `/api/materials`  
**Description:** Retrieves a list of all materials.

### Responses
#### 200 OK
```json
[
    {
        "id": 1,
        "name": "Cotton",
        "description": "Soft and breathable fabric.",
        "price_per_square_meter": 10.0,
        "color": "White"
    }
]
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while fetching the materials. Please try again later."
  }
}
```

---

## 2. Retrieve a Material

**Method:** GET  
**Endpoint:** `/api/materials/{id}`  
**Description:** Retrieves details of a specific material by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the material|

### Responses
#### 200 OK
```json
{
  "id": 1,
  "name": "Cotton",
  "description": "Soft and breathable fabric.",
  "price_per_square_meter": 10.0,
  "color": "White"
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "Material not found."
  }
}
```

---

## 3. Create a Material

**Method:** POST  
**Endpoint:** `/api/materials`  
**Description:** Creates a new material.

### Request Body
```json
{
  "name": "Cotton",
  "description": "Soft and breathable fabric.",
  "price_per_square_meter": 10.0,
  "color": "White"
}
```

### Responses
#### 201 Created
```json
{
  "id": 1,
  "name": "Cotton",
  "description": "Soft and breathable fabric.",
  "price_per_square_meter": 10.0,
  "color": "White"
}
```

#### 400 Bad Request
```json
{
  "error": "Validation error.",
  "details": {
    "name": "The name field is required.",
    "price_per_square_meter": "The price_per_square_meter field must be a positive number.",
    "color": "The color field is required."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while creating the material. Please try again later."
  }
}
```

---

## 4. Update a Material

**Method:** PUT  
**Endpoint:** `/api/materials/{id}`  
**Description:** Updates an existing material by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the material|

### Request Body
```json
{
  "name": "Cotton",
  "description": "Soft and breathable fabric.",
  "price_per_square_meter": 12.0,
  "color": "White"
}
```

### Responses
#### 200 OK
```json
{
  "id": 1,
  "name": "Cotton",
  "description": "Soft and breathable fabric.",
  "price_per_square_meter": 12.0,
  "color": "White"
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "Material not found."
  }
}
```

#### 400 Bad Request
```json
{
  "error": "Validation error.",
  "details": {
    "name": "The name field is required.",
    "price_per_square_meter": "The price_per_square_meter field must be a positive number.",
    "color": "The color field is required."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while updating the material. Please try again later."
  }
}
```

---

## 5. Delete a Material

**Method:** DELETE  
**Endpoint:** `/api/materials/{id}`  
**Description:** Deletes a specific material by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the material|

### Responses
#### 200 OK
```json
{
  "message": "Material successfully deleted."
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "Material not found."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while deleting the material. Please try again later."
  }
}
```

---

**Note:** All endpoints require proper authentication and authorization headers to access.
