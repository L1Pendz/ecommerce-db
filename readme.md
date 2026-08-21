# E-Commerce & Logistics Backend API

A Node.js/TypeScript REST API using Express and PostgreSQL.

## Requirements

* Node.js
* PostgreSQL
* npm

## Installation

Clone the repository and install the dependencies:

```bash
git clone https://github.com/L1Pendz/ecommerce-db.git
cd ecommerce-db
npm install
```

## Database Setup

Create a PostgreSQL database with these tables:

* `customer`
* `orders`
* `product`
* `order_item`
* `vendor`
* `supplies`

## Environment Variables

Create a `.env` file in the project root:

```env
DB_USER=your_username
DB_HOST=localhost
DB_NAME=your_database
DB_PASSWORD=your_password
DB_PORT=5432
```

Replace the values with your PostgreSQL information.

## Run the Project

For development:

```bash
npm run dev
```

To build:

```bash
npm run build
```

To run the built project:

```bash
npm start
```

The API runs at:

```text
http://localhost:3000
```

## API

All endpoints use the `/api` prefix.

### Customers

* `GET /api/customers`
* `GET /api/customers/:id`
* `POST /api/customers`
* `PUT /api/customers/:id`
* `DELETE /api/customers/:id`

### Products

* `GET /api/products`
* `GET /api/products/:id`
* `POST /api/products`
* `PATCH /api/products/:id/price`

### Orders

* `GET /api/orders`
* `GET /api/orders/customer/:customerId`
* `POST /api/orders`
* `DELETE /api/orders/:id`

### Order Items

* `GET /api/order-items/:orderId`
* `POST /api/order-items`

### Vendors & Supplies

* `GET /api/vendors`
* `GET /api/supplies/vendor/:vendorId`
* `PUT /api/supplies/:vendorId/:productId`
