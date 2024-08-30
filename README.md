Here's the corrected version of your README file:

```markdown
# gRPC Product Service

This project is a simple gRPC service implemented in Node.js. The service manages a list of products, allowing you to add, edit, delete, and retrieve products. The data is stored in an SQLite database.

## Features

- **gRPC Service**: Implements a gRPC service with methods for listing, adding, updating, and deleting products.
- **SQLite Database**: Uses SQLite for data storage.
- **Node.js Server and Client**: Includes both server and client implementations.

## Prerequisites

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Git](https://git-scm.com/)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/rezamh67/grpc-product-service.git
   cd grpc-product-service
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Running the Server

To start the gRPC server, run:

```bash
node server.js
```

The server will start on `localhost:50051`.

## Running the Client

To interact with the gRPC service, you can use the provided client. Run the client with:

```bash
node client.js
```

This will perform a series of operations such as adding, listing, updating, and deleting products.

## Project Structure

- **protos/**: Contains the `.proto` file that defines the gRPC service and messages.
- **server.js**: The Node.js server that implements the gRPC service.
- **client.js**: The Node.js client that interacts with the gRPC server.
- **database.js**: Sets up and manages the SQLite database.
- **README.md**: This file, explaining the project and how to run it.

## Contributing

If you'd like to contribute to this project, feel free to fork the repository and submit a pull request.

## License

This project is open-source and available under the [MIT License](LICENSE).
