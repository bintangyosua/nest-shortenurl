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

4. Set up Prisma

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

1. Sign Up and Log In

   - To use the API, users must first create an account and log in to receive an authorization token.
   - **Sign Up**: Send a `POST` request to `/auth/signup` with a JSON body like:
     ```json
     {
       "email": "user@example.com",
       "password": "securePassword"
     }
     ```
   - **Log In**: After signing up, log in using the `/auth/login` endpoint to receive a JWT token. Send a `POST` request with:
     ```json
     {
       "email": "user@example.com",
       "password": "securePassword"
     }
     ```
   - **Receive Token**: The response will include an `access_token`. This token is required for authenticated requests.

2. **Create a Short URL**:

   - Use the `/shortenurl` endpoint with a `POST` request
   - Include the `Authorization` header with the token received from login.
   - Send the following JSON body to shorten a URL:

     ```json
     {
       "originalUrl": "https://example.com",
       "customCode": "myshorturl"
     }
     ```

   - Example Authorization Header:
     ```http
     Authorization: Bearer your_access_token_here
     ```

3. Redirect URL: Access `http://localhost:3000/myshorturl` to be redirected to the original URL.

## LICENSE

This project is licensed under the MIT License.
