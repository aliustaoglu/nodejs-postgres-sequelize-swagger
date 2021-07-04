# Nodejs Postgres Sequelize Swagger 

This repository contains an example nodejs project using Postgres & Sequelize with a generated Swagger UI. Part of this example there's a table that contains customers and a `note` table containing notes about the customers. You can create a customer, update the status of a customer, create a note and update a note.

## How to run

Running this in your local environment is pretty simple using docker compose.

> docker-compose up

Then navigate to Swagger UI endpoint to test the API

http://localhost:3000/swagger

This example project was setup in around 6-7 hours. If I had more time I would add more secure way to expose 500 error messages. For the sake of simplicity HTTP-500 errors was dumped into the error code without any filtering. This is considered a bad practice and is not very secure since the endpoints are exposed to public. I would also add some unit tests. This project does not contain any unit tests.

Auto generated Swagger-UI makes manual testing a breeze. `swagger-autogen` library scans your routes, analysis your code so to check out querystrings and request body. Then it generates the `swagger.json` file which is used by swagger-ui and can directly invoke the endpoints.