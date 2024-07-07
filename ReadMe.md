# Elements API

## Overview

The Elements API is a RESTful service built with Node.js and Express, designed to provide access to a database of chemical elements. It supports operations to retrieve all elements, fetch elements by their symbol, and get a random set of questions related to a specific element.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB

### Installation

1. Clone the repository to your local machine.
2. Navigate to the cloned directory and run `npm install` to install the required dependencies.
3. Ensure MongoDB is running on your local machine or configure the application to connect to your MongoDB instance.
4. Start the server with `npm start`.

## API Endpoints

### `GET /`

- Description: Test endpoint to verify that the API is running.
- Response: `Hello World!`

### `GET /api/elements`

- Description: Retrieves all elements from the database.
- Response: JSON array of elements.

### `GET /api/element/:symbol`

- Description: Fetches a single element by its chemical symbol.
- Parameters:
  - `symbol`: The chemical symbol of the element (e.g., `Fe` for iron).
- Response: JSON object of the element.

### `GET /api/element/random/:count/:symbol`

- Description: Retrieves a random set of questionnaire items for a given element.
- Parameters:
  - `count`: Number of random questions to retrieve.
  - `symbol`: The chemical symbol of the element.
- Response: JSON array of questionnaire items.

## Environment Variables

- `PORT`: The port number on which the server will listen (default is 3000).

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

This project is open source and available under the [MIT License](LICENSE).