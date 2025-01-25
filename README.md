# API Documentation
[/api](https://student-rizv.onrender.com/api) endpoint to access Swagger

## Course

### Endpoints

#### Create a Course
**POST** `/course`

- **Description:** Creates a new course.
- **Request Body:**
  ```json
  {
    "name": "Math",
    "studentMax": 10,
    "credits": 5
  }
  ```
- **Responses:**
  - `201 Created`: Course created successfully.
  - `500 Internal Server Error`: Internal server error.

#### Delete a Course
**DELETE** `/course/:id`

- **Description:** Deletes a course by ID.
- **Parameters:**
  - `id`: ID of the course to delete.
- **Responses:**
  - `200 OK`: Course deleted successfully.
  - `404 Not Found`: Course not found.

#### Get All Courses
**GET** `/course`

- **Description:** Retrieves all courses.
- **Responses:**
  - `200 OK`: List of courses.

#### Get a Course by ID
**GET** `/course/:id`

- **Description:** Retrieves a course by ID.
- **Parameters:**
  - `id`: ID of the course.
- **Responses:**
  - `200 OK`: Course data.
  - `404 Not Found`: Course not found.

#### Get Students in a Course
**GET** `/course/:id/students`

- **Description:** Retrieves all students in a course by course ID.
- **Parameters:**
  - `id`: ID of the course.
- **Responses:**
  - `200 OK`: List of students.

#### Add or Remove a Student from a Course
**PATCH** `/course/:id/students`

- **Description:** Adds or removes a student from a course.
- **Parameters:**
  - `id`: ID of the course.
  - `studentId`: ID of the student.
  - `type`: `add` or `remove`.
- **Responses:**
  - `200 OK`: Student added/removed successfully.
  - `400 Bad Request`: Invalid type.
  - `404 Not Found`: Course not found.

#### Update a Course
**PUT** `/course/:id`

- **Description:** Updates a course by ID.
- **Parameters:**
  - `id`: ID of the course.
- **Request Body:**
  ```json
  {
    "name": "Math",
    "studentMax": 10,
    "credits": 5
  }
  ```
- **Responses:**
  - `200 OK`: Course updated successfully.
  - `400 Bad Request`: Invalid data.
  - `404 Not Found`: Course not found.
  - `500 Internal Server Error`: Internal server error.

---

## Student

### Endpoints

#### Create a Student
**POST** `/student`

- **Description:** Creates a new student.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "sa@gmail.com"
  }
  ```
- **Responses:**
  - `201 Created`: Student created successfully.
  - `500 Internal Server Error`: Internal server error.

#### Delete a Student
**DELETE** `/student/:id`

- **Description:** Deletes a student by ID.
- **Parameters:**
  - `id`: ID of the student to delete.
- **Responses:**
  - `200 OK`: Student deleted successfully.
  - `404 Not Found`: Student not found.

#### Get All Students
**GET** `/student`

- **Description:** Retrieves all students.
- **Responses:**
  - `200 OK`: List of students.

#### Get a Student by ID
**GET** `/student/:id`

- **Description:** Retrieves a student by ID.
- **Parameters:**
  - `id`: ID of the student.
- **Responses:**
  - `200 OK`: Student data.
  - `404 Not Found`: Student not found.

#### Get Courses of a Student
**GET** `/student/:id/courses`

- **Description:** Retrieves all courses a student is enrolled in by student ID.
- **Parameters:**
  - `id`: ID of the student.
- **Responses:**
  - `200 OK`: List of courses.

#### Update a Student
**PUT** `/student/:id`

- **Description:** Updates a student by ID.
- **Parameters:**
  - `id`: ID of the student.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "sa@gmail.com"
  }
  ```
- **Responses:**
  - `200 OK`: Student updated successfully.
  - `400 Bad Request`: Invalid data.
  - `404 Not Found`: Student not found.

