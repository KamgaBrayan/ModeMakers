
---

# API Documentation: Command Entity

## Overview
The `command` entity represents a user’s order, including details about the user who placed the order, the date of the command, the status, the total cost, the payment method, and the time limit for the order.

---

## 1. List Commands

**Method:** GET  
**Endpoint:** `/api/command`  
**Description:** Retrieves a list of all commands.

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
        "command_date": "2024-12-29T10:00:00Z",
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
    "message": "An unexpected error occurred while fetching the commands. Please try again later."
  }
}
```

---

## 2. Retrieve a Command

**Method:** GET  
**Endpoint:** `/api/command/{id}`  
**Description:** Retrieves details of a specific command by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the command  |

### Responses
#### 200 OK
```json
{
  "id": 1,
  "user": {
    "user_id": 123,
    "user_name": "Gabriel Nomo"
  },
  "command_date": "2024-12-29T10:00:00Z",
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
    "message": "Command not found."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while fetching the command. Please try again later."
  }
}
```

---

## 3. Create a Command

**Method:** POST  
**Endpoint:** `/api/command`  
**Description:** Creates a new command.

### Request Body
```json
{
  "user": {
    "user_id": 123,
    "user_name": "Gabriel Nomo"
  },
  "command_date": "2024-12-29T10:00:00Z",
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
  "command_date": "2024-12-29T10:00:00Z",
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
    "command_date": "The command date is required.",
    "status": "The command status is required.",
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
    "message": "An unexpected error occurred while creating the command. Please try again later."
  }
}
```

---

## 4. Update a Command

**Method:** PUT  
**Endpoint:** `/api/command/{id}`  
**Description:** Updates an existing command by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the command  |

### Request Body
```json
{
  "user": {
    "user_id": 123,
    "user_name": "Gabriel Nomo"
  },
  "command_date": "2024-12-29T10:00:00Z",
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
  "command_date": "2024-12-29T10:00:00Z",
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
    "message": "Command not found."
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
    "command_date": "The command date is required.",
    "status": "The command status is required.",
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
    "message": "An unexpected error occurred while updating the command. Please try again later."
  }
}
```

---

## 5. Delete a Command

**Method:** DELETE  
**Endpoint:** `/api/command/{id}`  
**Description:** Deletes a specific command by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the command  |

### Responses
#### 200 OK
```json
{
  "message": "Command successfully deleted."
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "Command not found."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while deleting the command. Please try again later."
  }
}
```

---

**Note:** All endpoints require proper authentication and authorization headers to access.

---
