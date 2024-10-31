# Nest-Short Url

## Description

Nest-Shorturl is a URL shortening service built with NestJS, offering features like unique short URLs, URL customization, and JWT-based authentication. This project is designed for high performance, security, and scalability, capable of handling thousands of requests per second.

## Features

- Create Short URLs: Shortens URLs with unique codes that expire after 5 years.
- JWT Authentication: Endpoints are protected by token-based authentication using email and password.
- URL Customization: Users can customize URL codes up to 16 characters.
- Rate-Limiting: Prevents abuse by limiting the number of requests.
- Redirect: Redirects users from short URLs to the original URL.
- API Documentation: Swagger documentation is available.

## API Structure

|      Route       | Method |            Description            |
| :--------------: | :----: | :-------------------------------: |
|        /         |  GET   |      Displays the main page       |
|   /auth/signup   |  POST  |       Registers a new user        |
|   /auth/login    |  POST  | Logs in and generates a JWT token |
|  /auth/profile   |  GET   |    Retrieves the user profile     |
|   /shortenurl    |  POST  |        Creates a short URL        |
| /:shortened_code |  GET   |   Redirects to the original URL   |

## API Documentation

You can visit the api documentation in Postman. visit this [Documentation](https://documenter.getpostman.com/view/14048142/2sAY4vgN4D)

## Setup and Installation

1. Clone the repository:

```bash
$ git clone https://github.com/bintangyosua/nest-shortenurl.git
```

2. Install Dependencies

```bash
$ npm install
```

3. Configure environment variables

```bash
# Create Database named nestjs_url_shortener in MySQL.
DATABASE_URL="mysql://username:password@localhost:3306/nestjs_url_shortener?schema=public"
JWT_SECRET="SECRET"
```

1. Set up Prisma

   1. Generate Prisma Client

   ```bash
   $ npx prisma generate
   ```

   2. Run Prisma Migration

   ```bash
   $ npx prisma migrate dev
   ```

## Start the server

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

```

## Usage Examples

- **Create a Short URL**: Use the /shortenurl endpoint with a POST request, sending a JSON body like:

  ```json
  {
    "originalUrl": "https://example.com",
    "customCode": "myshorturl"
  }
  ```

- Redirect URL: Access http://localhost:3000/myshorturl to be redirected to the original URL.

## LICENSE

This project is licensed under the MIT License.
