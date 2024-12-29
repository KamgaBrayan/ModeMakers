
---

# API Documentation: Payment Entity

## Overview
The `payment` entity represents a payment transaction made by a user. It includes details such as the associated command ID, the payment amount, the date of payment, the payment method, and the payment status.

---

## 1. List Payments

**Method:** GET  
**Endpoint:** `/api/payment`  
**Description:** Retrieves a list of all payments.

### Responses
#### 200 OK
```json
[
    {
        "id": 1,
        "commandId": 12345,
        "payment_cost": 100.50,
        "payment_date": "2024-12-29T10:00:00Z",
        "payment_method": "Credit Card",
        "status": "Completed"
    }
]
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while fetching the payments. Please try again later."
  }
}
```

---

## 2. Retrieve a Payment

**Method:** GET  
**Endpoint:** `/api/payment/{id}`  
**Description:** Retrieves details of a specific payment by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the payment  |

### Responses
#### 200 OK
```json
{
  "id": 1,
  "commandId": 12345,
  "payment_cost": 100.50,
  "payment_date": "2024-12-29T10:00:00Z",
  "payment_method": "Credit Card",
  "status": "Completed"
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "Payment not found."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while fetching the payment. Please try again later."
  }
}
```

---

## 3. Create a Payment

**Method:** POST  
**Endpoint:** `/api/payment`  
**Description:** Creates a new payment.

### Request Body
```json
{
  "commandId": 12345,
  "payment_cost": 100.50,
  "payment_date": "2024-12-29T10:00:00Z",
  "payment_method": "Credit Card",
  "status": "Completed"
}
```

### Responses
#### 201 Created
```json
{
  "id": 1,
  "commandId": 12345,
  "payment_cost": 100.50,
  "payment_date": "2024-12-29T10:00:00Z",
  "payment_method": "Credit Card",
  "status": "Completed"
}
```

#### 400 Bad Request
```json
{
  "error": "Validation error.",
  "details": {
    "commandId": "The command ID is required.",
    "payment_cost": "The amount is required.",
    "payment_date": "The payment date is required.",
    "payment_method": "The payment method is required.",
    "status": "The payment status is required."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while creating the payment. Please try again later."
  }
}
```

---

## 4. Update a Payment

**Method:** PUT  
**Endpoint:** `/api/payment/{id}`  
**Description:** Updates an existing payment by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the payment  |

### Request Body
```json
{
  "commandId": 12345,
  "payment_cost": 150.75,
  "payment_date": "2024-12-29T10:00:00Z",
  "payment_method": "PayPal",
  "status": "Pending"
}
```

### Responses
#### 200 OK
```json
{
  "id": 1,
  "commandId": 12345,
  "payment_cost": 150.75,
  "payment_date": "2024-12-29T10:00:00Z",
  "payment_method": "PayPal",
  "status": "Pending"
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "Payment not found."
  }
}
```

#### 400 Bad Request
```json
{
  "error": "Validation error.",
  "details": {
    "commandId": "The command ID is required.",
    "payment_cost": "The amount is required.",
    "payment_date": "The payment date is required.",
    "payment_method": "The payment method is required.",
    "status": "The payment status is required."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while updating the payment. Please try again later."
  }
}
```

---

## 5. Delete a Payment

**Method:** DELETE  
**Endpoint:** `/api/payment/{id}`  
**Description:** Deletes a specific payment by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the payment  |

### Responses
#### 200 OK
```json
{
  "message": "Payment successfully deleted."
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "Payment not found."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while deleting the payment. Please try again later."
  }
}
```

---

**Note:** All endpoints require proper authentication and authorization headers to access.

---

