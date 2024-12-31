
  ---

  # API Documentation: Measure Entity

  ## Overview
  The `measure` entity represents a user's physical measurements, including various body dimensions. It is identified by an `id` and includes attributes such as stature, chest, waist, hip measurements, and other body dimensions. The entity also records the date of measurement.

  ---

  ## 1. List Measures

  **Method:** GET  
  **Endpoint:** `/api/measure`  
  **Description:** Retrieves a list of all measures.

  ### Responses
  #### 200 OK
  ```json
  [
      {
          "id": 1,
          "user": {
              "user_id": 1,
              "user_name": "Gabriel Nomo"
          },
          "stature": 1.75,
          "shoulder_circumference": 105.5,
          "chest_circumference": 95.0,
          "waist_circumference": 85.0,
          "hip_circumference": 98.0,
          "shoulder_height": 120.0,
          "hip_height": 90.0,
          "knee_height": 55.0,
          "chest_spacing": 18.0,
          "breast_height": 105.0,
          "pelvis_height": 100.0,
          "front_waist_length": 40.0,
          "shoulder_length": 45.0,
          "back_waist_length": 50.0,
          "arm_length": 60.0,
          "total_arm_length_bent": 70.0,
          "wrist_circumference": 18.0,
          "ankle_height": 22.0,
          "seated_height": 45.0,
          "crotch_length": 30.0,
          "date_measure": "2024-12-29T10:00:00Z"
      }
  ]
  ```

  #### 500 Internal Server Error
  ```json
  {
    "error": {
      "code": 500,
      "type": "Internal server error",
      "message": "An unexpected error occurred while fetching the measures. Please try again later."
    }
  }
  ```

  ---

  ## 2. Retrieve a Measure

  **Method:** GET  
  **Endpoint:** `/api/measure/{id}`  
  **Description:** Retrieves details of a specific measure by ID.

  ### Path Parameters
  | Name | Type   | Description           |
  |------|--------|-----------------------|
  | id   | integer| The ID of the measure |

  ### Responses
  #### 200 OK
  ```json
  {
    "id": 1,
    "user": {
        "user_id": 1,
        "user_name": "Gabriel Nomo"
    },
    "stature": 1.75,
    "shoulder_circumference": 105.5,
    "chest_circumference": 95.0,
    "waist_circumference": 85.0,
    "hip_circumference": 98.0,
    "shoulder_height": 120.0,
    "hip_height": 90.0,
    "knee_height": 55.0,
    "chest_spacing": 18.0,
    "breast_height": 105.0,
    "pelvis_height": 100.0,
    "front_waist_length": 40.0,
    "shoulder_length": 45.0,
    "back_waist_length": 50.0,
    "arm_length": 60.0,
    "total_arm_length_bent": 70.0,
    "wrist_circumference": 18.0,
    "ankle_height": 22.0,
    "seated_height": 45.0,
    "crotch_length": 30.0,
    "date_measure": "2024-12-29T10:00:00Z"
  }
  ```

  #### 404 Not Found
  ```json
  {
    "error": {
      "code": 404,
      "type": "Not Found",
      "message": "Measure not found."
    }
  }
  ```

  #### 500 Internal Server Error
  ```json
  {
    "error": {
      "code": 500,
      "type": "Internal server error",
      "message": "An unexpected error occurred while fetching the measure. Please try again later."
    }
  }
  ```

  ---

  ## 3. Create a Measure

  **Method:** POST  
  **Endpoint:** `/api/measure`  
  **Description:** Creates a new measure.

  ### Request Body
  ```json
  {
    "user": {
      "user_id": 1,
      "user_name": "Gabriel Nomo"
    },
    "stature": 1.75,
    "shoulder_circumference": 105.5,
    "chest_circumference": 95.0,
    "waist_circumference": 85.0,
    "hip_circumference": 98.0,
    "shoulder_height": 120.0,
    "hip_height": 90.0,
    "knee_height": 55.0,
    "chest_spacing": 18.0,
    "breast_height": 105.0,
    "pelvis_height": 100.0,
    "front_waist_length": 40.0,
    "shoulder_length": 45.0,
    "back_waist_length": 50.0,
    "arm_length": 60.0,
    "total_arm_length_bent": 70.0,
    "wrist_circumference": 18.0,
    "ankle_height": 22.0,
    "seated_height": 45.0,
    "crotch_length": 30.0,
    "date_measure": "2024-12-29T10:00:00Z"
  }
  ```

  ### Responses
  #### 201 Created
  ```json
  {
    "id": 1,
    "user": {
      "user_id": 1,
      "user_name": "Gabriel Nomo"
    },
    "stature": 1.75,
    "shoulder_circumference": 105.5,
    "chest_circumference": 95.0,
    "waist_circumference": 85.0,
    "hip_circumference": 98.0,
    "shoulder_height": 120.0,
    "hip_height": 90.0,
    "knee_height": 55.0,
    "chest_spacing": 18.0,
    "breast_height": 105.0,
    "pelvis_height": 100.0,
    "front_waist_length": 40.0,
    "shoulder_length": 45.0,
    "back_waist_length": 50.0,
    "arm_length": 60.0,
    "total_arm_length_bent": 70.0,
    "wrist_circumference": 18.0,
    "ankle_height": 22.0,
    "seated_height": 45.0,
    "crotch_length": 30.0,
    "date_measure": "2024-12-29T10:00:00Z"
  }
  ```

  #### 400 Bad Request
  ```json
  {
    "error": "Validation error.",
    "details": {
      "user": "The user is required.",
      "stature": "The stature is required.",
      "shoulder_circumference": "The shoulder circumference is required.",
      "chest_circumference": "The chest circumference is required.",
      "waist_circumference": "The waist circumference is required.",
      "hip_circumference": "The hip circumference is required.",
      "shoulder_height": "The shoulder height is required.",
      "hip_height": "The hip height is required.",
      "knee_height": "The knee height is required.",
      "chest_spacing": "The chest spacing is required.",
      "breast_height": "The breast height is required.",
      "pelvis_height": "The pelvis height is required.",
      "front_waist_length": "The front waist length is required.",
      "shoulder_length": "The shoulder length is required.",
      "back_waist_length": "The back waist length is required.",
      "arm_length": "The arm length is required.",
      "total_arm_length_bent": "The total arm length bent is required.",
      "wrist_circumference": "The wrist circumference is required.",
      "ankle_height": "The ankle height is required.",
      "seated_height": "The seated height is required.",
      "crotch_length": "The crotch length is required.",
      "date_measure": "The date of measure is required."
    }
  }
  ```

  #### 500 Internal Server Error
  ```json
  {
    "error": {
      "code": 500,
      "type": "Internal server error",
      "message": "An unexpected error occurred while creating the measure. Please try again later."
    }
  }
  ```

  ---

  ## 4. Update a Measure

  **Method:** PUT  
  **Endpoint:** `/api/measure/{id}`  
  **Description:** Updates an existing measure by ID.

  ### Path Parameters
  | Name | Type   | Description           |
  |------|--------|-----------------------|
  | id   | integer| The ID of the measure |

  ### Request Body
  ```json
  {
    "user": {
      "user_id": 1,
      "user_name": "Gabriel Nomo"
    },
    "stature": 1.75,
    "shoulder_circumference": 106.0,
    "chest_circumference": 96.0,
    "waist_circumference": 86.0,
    "hip_circumference": 99.0,
    "shoulder_height": 121.0,
    "hip_height": 91.0,
    "knee_height": 56.0,
    "chest_spacing": 19.0,
    "breast_height": 106.0,
    "pelvis_height": 101.0,
    "front_waist_length": 41

  .0,
    "shoulder_length": 46.0,
    "back_waist_length": 51.0,
    "arm_length": 61.0,
    "total_arm_length_bent": 71.0,
    "wrist_circumference": 19.0,
    "ankle_height": 23.0,
    "seated_height": 46.0,
    "crotch_length": 31.0,
    "date_measure": "2024-12-30T10:00:00Z"
  }
  ```

  ### Responses
  #### 200 OK
  ```json
  {
    "id": 1,
    "user": {
      "user_id": 1,
      "user_name": "Gabriel Nomo"
    },
    "stature": 1.75,
    "shoulder_circumference": 106.0,
    "chest_circumference": 96.0,
    "waist_circumference": 86.0,
    "hip_circumference": 99.0,
    "shoulder_height": 121.0,
    "hip_height": 91.0,
    "knee_height": 56.0,
    "chest_spacing": 19.0,
    "breast_height": 106.0,
    "pelvis_height": 101.0,
    "front_waist_length": 41.0,
    "shoulder_length": 46.0,
    "back_waist_length": 51.0,
    "arm_length": 61.0,
    "total_arm_length_bent": 71.0,
    "wrist_circumference": 19.0,
    "ankle_height": 23.0,
    "seated_height": 46.0,
    "crotch_length": 31.0,
    "date_measure": "2024-12-30T10:00:00Z"
  }
  ```

  #### 400 Bad Request
  ```json
  {
    "error": "Validation error."
  }
  ```

  #### 500 Internal Server Error
  ```json
  {
    "error": {
      "code": 500,
      "type": "Internal server error",
      "message": "An unexpected error occurred while updating the measure. Please try again later."
    }
  }
  ```

  ---

  ## 5. Delete a Measure

  **Method:** DELETE  
  **Endpoint:** `/api/measure/{id}`  
  **Description:** Deletes a specific measure by ID.

  ### Path Parameters
  | Name | Type   | Description           |
  |------|--------|-----------------------|
  | id   | integer| The ID of the measure |

  ### Responses
  #### 204 No Content
  ```json
  {}
  ```

  #### 404 Not Found
  ```json
  {
    "error": {
      "code": 404,
      "type": "Not Found",
      "message": "Measure not found."
    }
  }
  ```

  #### 500 Internal Server Error
  ```json
  {
    "error": {
      "code": 500,
      "type": "Internal server error",
      "message": "An unexpected error occurred while deleting the measure. Please try again later."
    }
  }
  ```

  ---

  This documentation includes the endpoints for retrieving, creating, updating, and deleting measures. Each measure includes the attributes such as `stature`, `shoulder_circumference`, `chest_circumference`, `waist_circumference`, `hip_circumference`, and others, all represented in English.