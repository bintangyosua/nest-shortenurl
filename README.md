Requirements:

- [x] The shortened link must be unique and have an expiration of 5 years.
- [x] The system should implement authentication guard with email password using jwt token for creating token.
- [x] Allow the user to customize the URL with a maximum of 16 characters.
- [x] The system-generated short URL should be 6 characters.
- [x] The system should not have any downtime and must operate as fast as possible.
- [x] The system should effectively handle thousands of requests per second for generating unique short URLs.

Instructions:

- [x] Provide a RESTful API to shorten a given URL.
- [x] The API should return the shortened URL and its expiration date.
- [x] Implement a redirection service that, when a user accesses the shortened URL, redirects to the original URL.
- [x] Include rate-limiting to prevent abuse.
- [x] Implement unit tests to test the functionality of your service.
- [ ] Document your API endpoints and include a README file with setup instructions.
- [x] Document the API using Postman or Swagger.

Evaluation:
Your solution will be evaluated based on the following criteria:

- [ ] Code quality and organization
- [ ] Adherence to the project requirements
- [ ] Use of best practices for API design and security
- [ ] Efficiency of the implemented solution
- [ ] Completeness of the tests and documentation
- [ ] Use of caching mechanisms is considered a plus point
- [ ] Using a migration file for MySQL is considered a plus point

Submission Instructions

- [ ] Clone the provided GitHub repository to your personal account. After you have completed the test, send your code to effendy@evore.id, including setup instructions for the project in the README file.
- [ ] Ensure your submission is submitted within a maximum of 4 days after you receive the email.

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

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

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```
