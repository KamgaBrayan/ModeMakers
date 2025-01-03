# API Documentation: Product Entity

## Overview
The `Product` entity represents a product in the system, including its attributes and relationships with other entities. Below are the details of the API routes for managing products.

---

## 1. List Products

**Method:** GET  
**Endpoint:** `/api/products`  
**Description:** Retrieves a list of all products.

### Responses
#### 200 OK
```json
[
    {"id": 1,
    "name": "Product Name",
    "gender":"male",
    "age":"Ranges", 
    "category": "Category Name",
    "photos": ["url1", "url2"],
    "description": "Product description.",
    "price": 50.0,
    "price_per_square_metter": 25.0,
    "stylist": {
        "id": 32,
        "name": "John Doe"
    },
    "material": {
        "id": 12,
        "type": "Cotton"
    }

 }
]
```


#### 500 Internal Server Error
```json
   {
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while deleting the product. Please try again later."
  }
}
```
---


## 2. Retrieve a Product

**Method:** GET  
**Endpoint:** `/api/products/{id}`  
**Description:** Retrieves details of a specific product by ID.

### Path Parameters
| Name | Type   | Description          |
|------|--------|----------------------|
| id   | integer| The ID of the product|

### Responses
#### 200 OK
```json
{
  "id": 1,
  "name": "Product Name",
  "gender":"Product gender",
  "age":"Ranges",
  "note": 4.5,
  "category": "Category Name",
  "photos": ["url1", "url2"],
  "disponibilite": true,
  "mean_evalue": 4.2,
  "description": "Product description.",
  "price": 50.0,
  "price_per_square_metter": 25.0,
  "duree": "2 weeks",
  "couleur": "red",
  "stylist": {
    "id": 32,
    "name": "John Doe"
  },
  "material": {
    "id": 12,
    "type": "Cotton"
  }
    

}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "Product not found."
  }
}
```

---

## 3. Create a Product

**Method:** POST  
**Endpoint:** `/api/products`  
**Description:** Creates a new product.

### Request Body
```json
{
  
  "name": "Product Name",
  "gender":"Product gender",
  "age":"Ranges",
  "note": 4.5,
  "category": "Category Name",
  "photos": ["url1", "url2"],
  "disponibilite": true,
  "mean_evalue": 4.2,
  "description": "Product description.",
  "price": 50.0,
  "price_per_square_metter": 25.0,
  "duree": "2 weeks",
  "couleur": "red",
  
  "stylist": {
    "id": 32,
    "name": "John Doe"
   },
  "material": {
    "id": 12,
    "type": "Cotton"
  }

}
```

### Responses
#### 201 Created
```json
{
  "id": 1,
  "name": "Product Name",
  "gender":"Product gender",
  "age":"Ranges",
  "note": 4.5,
  "category": "Category Name",
  "photos": ["url1", "url2"],
  "disponibilite": true,
  "mean_evalue": 4.2,
  "description": "Product description.",
  "price": 50.0,
  "price_per_square_metter": 25.0,
  "duree": "2 weeks",
  "couleur": "red",
   
   "stylist": {
    "id": 32,
    "name": "John Doe"
   },
  "material": {
    "id": 12,
    "type": "Cotton"
  }
    
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "Product not found."
  }
}
```
#### 400 Bad Request
```json
{
  "error": "Validation error.",
  "details":
  {
    "name": "The name field is required.",
    "price": "The price field must be a positive number.",
    "category": "The category field is required.",
    "photos": "At least one photo URL is required.",
    "description": "The description field cannot be empty.",
    "gender": "The gender field is required.",
    "age": "The age field is required."
    }

}
```
### 500 internal server error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while deleting the product. Please try again later."
  }
}

```


---


## 4. Update a Product

**Method:** PUT  
**Endpoint:** `/api/products/{id}`  
**Description:** Updates an existing product by ID.

### Path Parameters
| Name | Type   | Description          |
|------|--------|----------------------|
| id   | integer| The ID of the product|

### Request Body
```json
{
  
  "name": "Product Name",
  "gender":"Product gender",
  "age":"Ranges",
  "note": 4.5,
  "category": "Category Name",
  "photos": ["url1", "url2"],
  "disponibilite": true,
  "mean_evalue": 4.2,
  "description": "Product description.",
  "price": 50.0,
  "price_per_square_metter": 25.0,
  "duree": "2 weeks",
  "couleur": "red",
  "stylist": {
            "id": 32,
            "name": "John Doe"
        },
  "material": {
    "id": 12,
    "type": "Cotton"
  }
}
```

### Responses
#### 200 OK
```json
{
  "id": 1,
  "name": "Updated Product Name",
  "category": "Category Name",
  "photos": ["url1", "url2"],
  "disponibilite": true,
  "description": "Updated description.",
  "price": 60.0,
  "price_per_square_metter": 25.0,
  "duree": "2 weeks",
  "couleur": "red"
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "Product not found."
  }
}
```
#### 400 Bad Request
```json
{
  "error": "Validation error.",
  "details": 
   {
    "name": "The name field is required.",
    "price": "The price field must be a positive number.",
    "category": "The category field is required.",
    "photos": "At least one photo URL is required.",
    "description": "The description field cannot be empty.",
    "gender": "The gender field is required.",
    "age": "The age field is required."
    }
}
```
### 500 internal server error
```json
{
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while deleting the product. Please try again later."
  }
}

```
---

## 5. Delete a Product

**Method:** DELETE  
**Endpoint:** `/api/products/{id}`  
**Description:** Deletes a specific product by ID.

### Path Parameters
| Name | Type   | Description          |
|------|--------|----------------------|
| id   | integer| The ID of the product|

### Responses
#### 200 OK
```json
    {
  "message": "Product successfully deleted."
}
```

#### 404 Not Found
```json
{
  "error": {
    "code": 404,
    "type": "Not Found",
    "message": "Product not found."
  }
}

```
### 500 internal server error
```json
 {
  "error": {
    "code": 500,
    "type": "Internal server error",
    "message": "An unexpected error occurred while deleting the product. Please try again later."
  }
}

```

---

**Note:** All endpoints require proper authentication and authorization headers to access.
