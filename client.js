/**
 * © 2024 rezamh67
 * This software is licensed under the MIT License.
 * See the LICENSE file for details.
 */

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Load the protobuf
const PROTO_PATH = path.join(__dirname, 'protos', 'product.proto');
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const productProto = grpc.loadPackageDefinition(packageDefinition).product;

// Create a gRPC client instance
const client = new productProto.ProductService('localhost:50051', grpc.credentials.createInsecure());

// Example functions to interact with the gRPC server
const listProducts = () => {
  client.ListProducts({}, (err, response) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Product List:', response.products);
    }
  });
};

const addProduct = (name, price) => {
  const product = { name, price };
  client.AddProduct(product, (err, response) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Added Product:', response.product);
    }
  });
};

const updateProduct = (id, name, price) => {
  const product = { id, name, price };
  client.UpdateProduct(product, (err, response) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Updated Product:', response.product);
    }
  });
};

const deleteProduct = (id) => {
  client.DeleteProduct({ id }, (err, response) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Deleted Product');
    }
  });
};

// Example usage
addProduct('Product 1', 9.99);
addProduct('Product 2', 19.99);
listProducts();
updateProduct(1, 'Updated Product 1', 14.99);
listProducts();
deleteProduct(2);
listProducts();
