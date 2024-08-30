/**
 * © 2024 rezamh67
 * This software is licensed under the MIT License.
 * See the LICENSE file for details.
 */

const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const sqlite3 = require('sqlite3').verbose();
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

// Initialize the SQLite database
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
  db.run("CREATE TABLE products (id INTEGER PRIMARY KEY, name TEXT, price REAL)");
});

// Implement the ProductService methods
const listProducts = (call, callback) => {
  db.all("SELECT * FROM products", (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { products: rows });
    }
  });
};

const addProduct = (call, callback) => {
  const product = call.request;
  db.run("INSERT INTO products (name, price) VALUES (?, ?)", [product.name, product.price], function (err) {
    if (err) {
      callback(err, null);
    } else {
      product.id = this.lastID;
      callback(null, { product });
    }
  });
};

const updateProduct = (call, callback) => {
  const product = call.request;
  db.run("UPDATE products SET name = ?, price = ? WHERE id = ?", [product.name, product.price, product.id], function (err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { product });
    }
  });
};

const deleteProduct = (call, callback) => {
  const id = call.request.id;
  db.run("DELETE FROM products WHERE id = ?", id, function (err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, {});
    }
  });
};

// Start the gRPC server
const server = new grpc.Server();
server.addService(productProto.ProductService.service, {
  ListProducts: listProducts,
  AddProduct: addProduct,
  UpdateProduct: updateProduct,
  DeleteProduct: deleteProduct
});
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Server running at http://0.0.0.0:50051');
  server.start();
});
