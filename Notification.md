 ---

# API Documentation: Notification Entity

## Overview
The `notification` entity represents notifications sent to users. It includes information about the user who receives the notification, the content of the notification, the date it was created, and whether it has been read or received.

---

## 1. List Notifications

**Method:** GET  
**Endpoint:** `/api/notification`  
**Description:** Retrieves a list of all notifications.

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
        "content": "Your order has been shipped.",
        "date": "2024-12-29T10:00:00Z",
        "readed": true,
        "received": true
    }
]
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while fetching the notifications. Please try again later."
  }
}
```

---

## 2. Retrieve a Notification

**Method:** GET  
**Endpoint:** `/api/notification/{id}`  
**Description:** Retrieves details of a specific notification by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the notification  |

### Responses
#### 200 OK
```json
{
  "id": 1,
  "user": {
    "user_id": 123,
    "user_name": "Gabriel Nomo"
  },
  "content": "Your order has been shipped.",
  "date": "2024-12-29T10:00:00Z",
  "readed": true,
  "received": true
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "Notification not found."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while fetching the notification. Please try again later."
  }
}
```

---

## 3. Create a Notification

**Method:** POST  
**Endpoint:** `/api/notification`  
**Description:** Creates a new notification.

### Request Body
```json
{
  "user": {
    "user_id": 123,
    "user_name": "Gabriel Nomo"
  },
  "content": "Your order has been shipped.",
  "date": "2024-12-29T10:00:00Z",
  "readed": false,
  "received": false
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
  "content": "Your order has been shipped.",
  "date": "2024-12-29T10:00:00Z",
  "readed": false,
  "received": false
}
```

#### 400 Bad Request
```json
{
  "error": "Validation error.",
  "details": {
    "user_id": "The user ID is required.",
    "user_name": "The user name is required.",
    "content": "The content of the notification is required.",
    "date": "The date is required.",
    "readed": "The readed status is required.",
    "received": "The received status is required."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while creating the notification. Please try again later."
  }
}
```

---

## 4. Update a Notification

**Method:** PUT  
**Endpoint:** `/api/notification/{id}`  
**Description:** Updates an existing notification by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the notification  |

### Request Body
```json
{
  "user": {
    "user_id": 123,
    "user_name": "Gabriel Nomo"
  },
  "content": "Your order has been delivered.",
  "date": "2024-12-29T10:00:00Z",
  "readed": true,
  "received": true
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
  "content": "Your order has been delivered.",
  "date": "2024-12-29T10:00:00Z",
  "readed": true,
  "received": true
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "Notification not found."
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
    "content": "The content of the notification is required.",
    "date": "The date is required.",
    "readed": "The readed status is required.",
    "received": "The received status is required."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while updating the notification. Please try again later."
  }
}
```

---

## 5. Delete a Notification

**Method:** DELETE  
**Endpoint:** `/api/notification/{id}`  
**Description:** Deletes a specific notification by ID.

### Path Parameters
| Name | Type   | Description           |
|------|--------|-----------------------|
| id   | integer| The ID of the notification  |

### Responses
#### 200 OK
```json
{
  "message": "Notification successfully deleted."
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "Notification not found."
  }
}
```

#### 500 Internal Server Error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while deleting the notification. Please try again later."
  }
}
```

---

**Note:** All endpoints require proper authentication and authorization headers to access.

---
