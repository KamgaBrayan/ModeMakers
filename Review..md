# API Documentation: review Entity

## Overview
The `review` entity represents a review given by a user for a product. Each review contains details about the user, the product, and the comment provided by the user, along with the date the review was created.

---

## 1. List review

**Method:** GET  
**Endpoint:** `/api/review`  
**Description:** Retrieves a list of all review (reviews).

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
        "product": {
            "product_note": 4.5,
            "product_id": 456,
            "product_name": "Product A"
        },
        "comment": "Great product, highly recommend!",
        "date": "2024-12-29T10:00:00Z"
    }
]
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while fetching the reviews. Please try again later."
  }
}
```

---

## 2. Retrieve an review

**Method:** GET  
**Endpoint:** `/api/review/{id}`  
**Description:** Retrieves details of a specific review (review) by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the review  |

### Responses
#### 200 OK
```json
{
  "id": 1,
  "user": {
    "user_id": 123,
    "user_name": "John Doe"
  },
  "product": {
    "product_note": 4.5,
    "product_id": 456,
    "product_name": "Product A"
  },
  "comment": "Great product, highly recommend!",
  "date": "2024-12-29T10:00:00Z"
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "Review not found."
  }
}
```
#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while fetching the reviews. Please try again later."
  }
}
```


---

## 3. Create an review

**Method:** POST  
**Endpoint:** `/api/review`  
**Description:** Creates a new review (review).

### Request Body
```json
{
  "user": {
    "user_id": 123,
    "user_name": "John Doe"
  },
  "product": {
    "product_note": 4.5,
    "product_id": 456,
    "product_name": "Product A"
  },
  "comment": "Great product, highly recommend!",
  "date": "2024-12-29T10:00:00Z"
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
  "product": {
    "product_note": 4.5,
    "product_id": 456,
    "product_name": "Product A"
  },
  "comment": "Great product, highly recommend!",
  "date": "2024-12-29T10:00:00Z"
}
```

#### 400 Bad Request
```json
{
  "error": "Validation error.",
  "details": {
    "user": "The user information is required.",
    "product": "The product information is required.",
    "comment": "The comment field is required.",
    "date": "The date field is required."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while creating the review. Please try again later."
  }
}
```

---

## 4. Update an review

**Method:** PUT  
**Endpoint:** `/api/review/{id}`  
**Description:** Updates an existing review (review) by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the review  |

### Request Body
```json
{
  "user": {
    "user_id": 123,
    "user_name": "John Doe"
  },
  "product": {
    "product_note": 4.5,
    "product_id": 456,
    "product_name": "Product A"
  },
  "comment": "Great product, highly recommend!",
  "date": "2024-12-29T10:00:00Z"
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
  "product": {
    "product_note": 4.5,
    "product_id": 456,
    "product_name": "Product A"
  },
  "comment": "Great product, highly recommend!",
  "date": "2024-12-29T10:00:00Z"
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "Review not found."
  }
}
```

#### 400 Bad Request
```json
{
  "error": "Validation error.",
  "details": {
    "user": "The user information is required.",
    "product": "The product information is required.",
    "comment": "The comment field is required.",
    "date": "The date field is required."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while updating the review. Please try again later."
  }
}
```

---

## 5. Delete an review

**Method:** DELETE  
**Endpoint:** `/api/review/{id}`  
**Description:** Deletes a specific review (review) by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the review  |

### Responses
#### 200 OK
```json
{
  "message": "Review successfully deleted."
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "Review not found."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while deleting the review. Please try again later."
  }
}
```

---

**Note:** All endpoints require proper authentication and authorization headers to access.
