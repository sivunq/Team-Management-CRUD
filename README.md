# Team Member Management API

This project provides a RESTful API for managing team members using Node.js, Express, and MongoDB. It includes CRUD operations for team members.

### Prerequisites

1. **Node.js and npm**: Ensure you have Node.js and npm installed.
2. **MongoDB**: Ensure you have MongoDB installed and running.

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/sivunq/assignment.git
   cd assignment
   ```
2. Install the required npm packages
    ```
    npm install
    ```
3. Environment Variables
    Create a .env file under src folder and add the following:
    ```
    MONGO_URI=<your connection string>
    PORT=3000
    ```

3. Database Setup:
    The MongoDB database connection is configured in src/db/connection.js. Ensure MongoDB is running and the connection URI is correct.

### Running the Project
    npm start

the project must be running at http://localhost:3000 

### API Documentation

You can use tools like Postman or cURL to test the endpoints:

1. Get one team member:
    ```
    curl --location 'http://localhost:3000/api/v1/members/f677e37d-906b-4c54-980e-7501463b2734'
    ```

2. Get all team members with pagination:
    ```
    curl --location 'http://localhost:3000/api/v1/members/?page=1&limit=10'
    ```
3. Add a team member:
    ```
    curl --location 'http://localhost:3000/api/v1/members/' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "firstName":"test",
        "lastName":"test",
        "phoneNumber":"8427558715",
        "email":"test@test.com",
        "role":"admin"
    }'
    ```
4. Edit a team member:
    ```
       curl --location --request PUT 'http://localhost:3000/api/v1/members/665701bc75366770d40e4b52' \
    --header 'Content-Type: application/json' \
    --data-raw '{
        "firstName":"test",
        "lastName":"test",
        "phoneNumber":"8427558715",
        "email":"test@test.com",
        "role":"admin"
    }'
    ```
5. Delete a team member:
    ```
    curl --location --request DELETE 'http://localhost:3000/api/v1/members/665701bc75366770d40e4b52'
    ```
5. Health Check :
    ```
    curl --location 'http://localhost:3000/api/health'
    ```

### Additional Functionalities:

1. Input validation
2. Logging : Logs and Exceptions will be added to a log file under logs folder.
3. Rate Limiting: user can send only 10 requests in a span of 5 minutes.Otherwise http-429 is thrown.
4. Pagination for get all team memebers api.
5. Health Check end point, which returns current project version.
6. Middleware for centralized response handling.

### Future Scopes:
1. Add user authentication & authorization.
2. Deployment & CI/CD, Monitoring, Containerization.
3. Automated Testing. 
4. Graceful Shutdown.
    

