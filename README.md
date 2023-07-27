# showwcase-assignment

### Description
A RESTful API server using Express.js and TypeScript. The server provides authentication using JSON Web Tokens (JWT), integrates with a third-party API for user data, and has a database layer for storing user information. Also implements middleware functions for request logging, error handling & authentication. Additionally, unit tests to ensure the functionality of the server are written.

### Installation
 - Clone the repository.
 - Run `docker-compose up -d` for starting the containers in a detached mode. (Skip the `-d` flag if you want to see the logs in the console).
 - The database and api containers should be created and be running
![Screenshot_2023-07-27_12-35-48](https://github.com/praveshpansari/showwcase-assignment/assets/25385289/350e5878-de03-40ff-a35d-9f989622c82d)

### Usage
The server exposes 4 api endpoints which can be accessed:

#### 1.  Register a new user
   Registers a new user with email and password.  
  
   **URL:** `/api/auth/register`  
   **Method:** POST  
   **Request Body:**  
   | Field	| Type | Description |
   | ---    | -----| ------------|
   | email	| string | User's email address |
   | password	| string | User's password (min 6 chars) |

   **Success Response:**  
   - **Status:** 201 Created  
   - **Body:**
     ```
     {
      "message": "User successfully created.",
      "id": 1,
      "token": "generated_jwt_token_here"
     }
     ```

   **Error Response:**    
   - **Status:** 400 Bad Request  
   - **Body:**
     ```
     {
      "error": "Bad Request",
      "message": "Invalid request body."
     }
     ```
    
#### 2.  Login
   Logs in a user and returns a JWT token.  
  
   **URL:** `/api/auth/login`  
   **Method:** POST  
   **Request Body:**  
   | Field	| Type | Description |
   | ---    | -----| ------------|
   | email	| string | 	User's registered email |
   | password	| string | 	User's registered password |
  
   **Success Response:**  
   - **Status:** 200 OK 
   - **Body:**
     ```
     {
      "message": "User successfully logged in.",
      "id": 1,
      "token": "generated_jwt_token_here"
     }
     ```
  
   **Error Response:**    
   - **Status:** 404 Not Found  
   - **Body:**
     ```
     {
      "error": "Unauthorized",
      "message": "Invalid credentials."
     }
     ```

#### 3. Retrieve User Profile
   Retrieves the user's profile information using the JWT token (protected route). 
  
   **URL:** `/api/auth/profile`  
   **Method:** GET  
   **Headers:**  
   | Field	| Type | Description |
   | ---    | -----| ------------|
   | Authorization	| string | JWT token (Bearer <token>) |

   **Success Response:**  
   - **Status:** 200 OK  
   - **Body:**
     ```
     {
      "user": {
        "email": "user@example.com",
        "createdAt": "2023-07-25T12:34:56.789Z"
      }
     }
     ```

   **Error Response:**    
   - **Status:** 401 Unauthorized 
   - **Body:**
     ```
     {
      "error": "Unauthorized",
      "message": "Invalid authentication token."
     }
     ```

#### 4.  Fetch a Random User
   Fetches a random user's details from the third-party API (Random User Generator). 
  
   **URL:** `/api/users/random`  
   **Method:** GET  
   **Success Response:**  
   - **Status:** 200 OK  
   - **Body:**
     ```
     {
      "user": {
        "name": {
          "first": "John",
          "last": "Doe"
        },
        "email": "john.doe@example.com",
        "phone": "123-456-7890"
        // other user details...
      }
     }
     ```

   **Error Response:**    
   - **Status:** 500 Internal Server Error  
   - **Body:**
     ```
     {
      "error": "Internal Server Error",
      "message": "Failed to fetch random user details."
     }
     ```
   
### Design Decisions
- **Dependency Injection** : Used a simple implementation of depenedency injection pattern to decouple code and make it more scalable. While it is not necessary for a small application like this, but this pattern allows the code to become more scalable.
- **Sequelize Migration** : Made use of `sequelize-cli` to create the table and handle migrations. Allows to make incremental changes to the DB programatically.
- **Docker Deployment** : Deployement of both the backend and the DB using Docker. Autmoatically installs application, runs migrations scripts and runs the server.

### Testing
Run `npm run test` to run all the tests.
 - **Middleware** : Unit tests for the three middlwares: authentication, request logging & error handler have been created.
    
      ![Screenshot_2023-07-27_13-28-39](https://github.com/praveshpansari/showwcase-assignment/assets/25385289/17eb7828-7945-415d-b38c-ff66dceebf24)
 - **Routes** : All the routes have been tested using the `supertest` package which allows to send requests.
   
      ![Screenshot_2023-07-27_13-31-27](https://github.com/praveshpansari/showwcase-assignment/assets/25385289/3e23a3c9-10b6-4ac1-b0bb-10a9462f2f21)
 - **Database** : The User table of the DB has been tested by mocking the sequlize model.
   
      ![Screenshot_2023-07-27_13-33-11](https://github.com/praveshpansari/showwcase-assignment/assets/25385289/92a0cf95-4576-4f22-92de-c426de4fb733)
