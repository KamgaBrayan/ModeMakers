
---

# API Documentation: order Entity

## Overview
The `order` entity represents a user’s order, including details about the user who placed the order, the date of the order, the status, the total cost, the payment method, and the time limit for the order.

---

## 1. List orders

**Method:** GET  
**Endpoint:** `/api/order`  
**Description:** Retrieves a list of all orders.

### Responses
#### 200 OK
```json
[
    {
        "id": 1,
        "user": {
            "user_id": 123,
            "user_name": "Gabriel Nomo"
        },
        "order_date": "2024-12-29T10:00:00Z",
        "status": "Completed",
        "total_cost": 150.75,
        "paiement_method": "Credit Card",
        "time_limit": "2024-12-31T23:59:59Z"
    }
]
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while fetching the orders. Please try again later."
  }
}
```

---

## 2. Retrieve a order

**Method:** GET  
**Endpoint:** `/api/order/{id}`  
**Description:** Retrieves details of a specific order by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the order  |

### Responses
#### 200 OK
```json
{
  "id": 1,
  "user": {
    "user_id": 123,
    "user_name": "Gabriel Nomo"
  },
  "order_date": "2024-12-29T10:00:00Z",
  "status": "Completed",
  "total_cost": 150.75,
  "paiement_method": "Credit Card",
  "time_limit": "2024-12-31T23:59:59Z"
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "order not found."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while fetching the order. Please try again later."
  }
}
```

---

## 3. Create a order

**Method:** POST  
**Endpoint:** `/api/order`  
**Description:** Creates a new order.

### Request Body
```json
{
  "user": {
    "user_id": 123,
    "user_name": "Gabriel Nomo"
  },
  "order_date": "2024-12-29T10:00:00Z",
  "status": "Pending",
  "total_cost": 150.75,
  "paiement_method": "Credit Card",
  "time_limit": "2024-12-31T23:59:59Z"
}
```

### Responses
#### 201 Created
```json
{
  "id": 1,
  "user": {
    "user_id": 123,
    "user_name": "Gabriel Nomo"
  },
  "order_date": "2024-12-29T10:00:00Z",
  "status": "Pending",
  "total_cost": 150.75,
  "paiement_method": "Credit Card",
  "time_limit": "2024-12-31T23:59:59Z"
}
```

#### 400 Bad Request
```json
{
  "error": "Validation error.",
  "details": {
    "user_id": "The user ID is required.",
    "user_name": "The user name is required.",
    "order_date": "The order date is required.",
    "status": "The order status is required.",
    "total_cost": "The total cost is required.",
    "paiement_method": "The payment method is required.",
    "time_limit": "The time limit is required."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while creating the order. Please try again later."
  }
}
```

---

## 4. Update a order

**Method:** PUT  
**Endpoint:** `/api/order/{id}`  
**Description:** Updates an existing order by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the order  |

### Request Body
```json
{
  "user": {
    "user_id": 123,
    "user_name": "Gabriel Nomo"
  },
  "order_date": "2024-12-29T10:00:00Z",
  "status": "Shipped",
  "total_cost": 200.00,
  "paiement_method": "PayPal",
  "time_limit": "2024-12-31T23:59:59Z"
}
```

### Responses
#### 200 OK
```json
{
  "id": 1,
  "user": {
    "user_id": 123,
    "user_name": "Gabriel Nomo"
  },
  "order_date": "2024-12-29T10:00:00Z",
  "status": "Shipped",
  "total_cost": 200.00,
  "paiement_method": "PayPal",
  "time_limit": "2024-12-31T23:59:59Z"
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "order not found."
  }
}
```

#### 400 Bad Request
```json
{
  "error": "Validation error.",
  "details": {
    "user_id": "The user ID is required.",
    "user_name": "The user name is required.",
    "order_date": "The order date is required.",
    "status": "The order status is required.",
    "total_cost": "The total cost is required.",
    "paiement_method": "The payment method is required.",
    "time_limit": "The time limit is required."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while updating the order. Please try again later."
  }
}
```

---

## 5. Delete a order

**Method:** DELETE  
**Endpoint:** `/api/order/{id}`  
**Description:** Deletes a specific order by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the order  |

### Responses
#### 200 OK
```json
{
  "message": "order successfully deleted."
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "order not found."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while deleting the order. Please try again later."
  }
}
```

---

**Note:** All endpoints require proper authentication and authorization headers to access.

---
