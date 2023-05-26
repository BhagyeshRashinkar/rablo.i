# Product API

The Product API is a RESTful API built with Node.js, Express.js, MongoDB, and Mongoose. It provides endpoints to manage products with various properties such as ID, name, price, featured status, rating, created date, and company.

## Installation

1. Clone the repository:


2. Install the dependencies:


3. Set up the environment variables:

- Create a `.env` file in the root directory of the project.
- Add the following environment variables to the `.env` file:

  ```
  PORT=3000
  MONGODB_URI=your-mongodb-connection-string
  ```

4. Start the server:


The API will be available at `http://localhost:3000`.

## API Endpoints

### Create a product

- URL: `/`
- Method: `POST`
- Request body:
- `productID` (required): Product ID as a string.
- `name` (required): Product name as a string.
- `price` (required): Product price as a number.
- `featured`: Boolean value indicating whether the product is featured (optional).
- `rating`: Product rating as a decimal (optional).
- `company` (required): Company name as a string.
- `createdAt`(required): Date at which product created


### Update a product

- URL: `/update/:_id`
- Method: `POST`
- Request parameters:
- `_id`: MongoDB Object ID.
- Request body: Same as the create endpoint. Provide the fields you want to update.


### Fetch all products

- URL: `/`
- Method: `GET`


### Delete a product
- URL: `/delete/:_id`
- Method: `POST`
- Request parameters:
- `_id`: MongoDB Object ID.


### Fetch featured products

- URL: `/filter`
- Method: `GET`

### Fetch products with price less than a certain value

- URL: `/filter`
- Method: `GET`
- Request parameters:
- `value`: Maximum price value.

### Fetch products with rating higher than a certain value

- URL: `/filter`
- Method: `GET`
- Request parameters:
- `value`: Minimum rating value.


## Contributing

Contributions to the Product API are welcome! If you find any issues or have suggestions for improvement, feel free to open an issue or submit a pull request.
