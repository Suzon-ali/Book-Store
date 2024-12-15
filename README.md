# Book-Store

```markdown
# Order Management System

A comprehensive order management system built with **Express.js** and **MongoDB** to manage product orders, including CRUD operations and data filtering.

## Features

- **Product Management**: Create, Read, Update, and Delete products.
- **Order Management**: Manage customer orders, including order creation, order updates, and order deletion.
- **Revenue Calculation**: Calculate total revenue based on orders, excluding deleted ones.
- **Filtering and Sorting**: Apply filters and sorting criteria to products and orders.
- **Error Handling**: Proper error handling throughout the system with helpful messages.

## Technologies Used

- **Node.js**: JavaScript runtime environment for server-side logic.
- **Express.js**: Web framework for building the REST API.
- **MongoDB**: NoSQL database for storing product and order data.
- **Mongoose**: ODM (Object Data Modeling) for MongoDB to interact with the database.
- **Zod**: Schema validation for request data.
- **CORS**: Cross-Origin Resource Sharing support for API requests.

## Prerequisites

Make sure you have the following software installed on your system:

- **Node.js** (v16 or higher)  
  [Download Node.js](https://nodejs.org/en/download/)
- **MongoDB** (local or cloud instance)
  [MongoDB Documentation](https://www.mongodb.com/docs/)

## Getting Started

### 1. Clone the repository:

```bash
git clone https://github.com/Suzon-ali/Book-Store.git
cd order-management-system
```

### 2. Install dependencies:

```bash
npm install
```

### 3. Set up your environment variables:

Create a `.env` file in the root of the project and add the following:

```plaintext
MONGO_URI=your_mongo_database_connection_string
PORT=3000
```

Replace `your_mongo_database_connection_string` with your actual MongoDB connection string.

### 4. Run the application:

```bash
npm start
```

The server will start on the port defined in `.env` (default `5000`).

### 5. Accessing the API:

Once the server is running, you can interact with the API through the following endpoints:

- **GET /api/products**: Fetch all products.
- **GET /api/products?email=email**: Fetch all products by Email.
- **GET /api/products?category=category**: Fetch all products by Category.
- **GET /api/products?title=title**: Fetch all products by Title.
- **GET /api/products/:productId**: Fetch a single product by ID.
- **POST /api/products**: Create a new product.
- **PUT /api/products/:productId**: Update a product by ID.
- **DELETE /api/products/:productId**: Delete a product by ID.
- **GET /api/orders**: Fetch all orders.
- **GET /api/orders?email=email**: Fetch all orders by customer email id.
- **GET /api/orders/:id**: Fetch a single order by ID.
- **POST /api/orders**: Create a new order.
- **PUT /api/orders/:id**: Update an order by ID.
- **DELETE /api/orders/:id**: Delete an order by ID.
- **GET /api/orders/revenue**: Calculate total revenue, excluding deleted orders.

## Folder Structure

```
.
├── src
│   ├── app
│   │   ├── modules
│   │   │   ├── order
│   │   │   │   ├── order.interface.ts
│   │   │   │   ├── order.controller.ts
│   │   │   │   ├── order.model.ts
│   │   │   │   ├── order.route.ts
│   │   │   │   └── order.service.ts
│   │   │   │   └── order.validation.ts
│   │   │   ├── product
│   │   │   │   ├── product.interface.ts
│   │   │   │   ├── product.controller.ts
│   │   │   │   ├── product.model.ts
│   │   │   │   ├── product.route.ts
│   │   │   │   └── product.service.ts
│   │   │   │   └── product.validation.ts
│   │   │   └── revenue
│   │   │       ├── revenue.interface.ts
│   │   │       ├── revenue.controller.ts
│   │   │       ├── revenue.model.ts
│   │   │       ├── revenue.route.ts
│   │   │       └── revenue.service.ts
│   │   │       └── revenue.validation.ts
│   ├── config
│   └── server.ts
├── .env
├── package.json
└── README.md
```

## Error Handling

All API responses include a `success` flag and a `message` field, with error details provided if necessary. 

Sample error response:

```json
{
  "success": false,
  "message": "Product not found!",
  "error": {
    "message": "Product with the provided ID does not exist",
    "stack": "Error stack trace"
  }
}
```

## Contributing

We welcome contributions to this project! To contribute:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

Please ensure that your code adheres to the existing style and passes all tests.

---

## Additional Information

For additional documentation, you can refer to the official [Express.js documentation](https://expressjs.com/) and [Mongoose documentation](https://mongoosejs.com/docs/).

If you have any questions or run into issues, feel free to open an issue on the GitHub repository.

