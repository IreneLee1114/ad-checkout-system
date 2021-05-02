# AD Checkout System

AD Checkout System is an small api for dealing with the advertisements checkout.

## Installation

Use [NPM](https://www.npmjs.com/get-npm) to install the AD checkout system.

```bash
npm install
```
## Usage

### Run unit tests
```bash
npm run test
```

### Start the api
```bash
npm run start
```

# Features

## Select a customer
Select an existing customer that you want to use for calculating the ad price, 
if the customerName you enter doesn't exist then the system will use the default price for calculating. The default customers includes "MYER", "Axil Coffee Roasters" and "SecondBite"
```bash
curl -X POST \
  http://localhost:8080/select-customer \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d customerName=MYER
```

## Add item
Insert the advertisement type that you want to put into your checkout list.
The Type should be either "Classic", "StandOut" or "Premium".

```bash
curl -X POST \
  http://localhost:8080/add-item \
  -H 'content-type: application/x-www-form-urlencoded' \
  -d type=StandOut
```

## Calculate the total price
Calculate the total price of the checkout list based on your previous insert value and the pricing rule of the customer.

```bash
curl -X GET http://localhost:8080/total
```