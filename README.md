# DuizzServer

DuizzServer is the API backend for the Duizz website, a quiz game platform. 
## Functionality

The DuizzServer API provides the following functionality:

- User authorization using access and refresh token strategy.
- CRUD operations with users, quizzes, categories, quiz results.
- Scoring when passing the quiz based on the speed of passing, level of difficulty, and number of questions in the quiz.
- Full API documentation in the OpenAPI specification.

## Launching and Configuring the Project

To launch and configure DuizzServer, follow these steps:

1. Clone the repository from GitHub:

   ```bash
   git clone https://github.com/div4211111/DuizzServer.git
   ```

2. Install dependencies using npm:

   ```bash
   npm install
   ```

3. Copy all variables from the `env.example` file to the `.env` file and set your own values.

4. Start the development server by running the following command:

   ```bash
   npm run start:dev
   ```

5. Open your browser and navigate to `http://localhost:3000` to access the API.

## PostgreSQL using Docker

You can also raise PostgreSQL using Docker. The docker-compose file is located in the `postgresql` folder. To start the PostgreSQL server using Docker, navigate to the `postgresql` folder and run the following command:

```bash
docker-compose up -d
```

## Migrating the Database using Prisma

After setting up the PostgreSQL server, you need to migrate the database using Prisma. Run the following commands to migrate the database:

```bash
npx prisma migrate dev
```

## Conclusion

DuizzServer provides a comprehensive API backend for the Duizz quiz game website. With its user authentication, CRUD operations, scoring system, and API documentation, it provides a solid foundation for building a powerful and scalable quiz game platform. The project is built using Nest.js, PostgreSQL, and Prisma, and can be easily launched and configured using the steps outlined above.

After starting the development server, you can access the API documentation at http://localhost:3000/api. The API documentation is generated in the OpenAPI specification format and provides detailed information on the available API endpoints, request and response formats, and authentication requirements.
