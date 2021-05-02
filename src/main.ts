import express from 'express';
import bodyParser from 'body-parser';

import Customer from './models/Customer';
import { Advertisement } from './models/enums/Advertisement';
import PricingRule, { Discount } from './models/PricingRule';
import Checkout from './models/Checkout';

const app = express();
const port = 8080;

app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

/**
 * initial the default Customer data and their pricing rules
 */
const customersDataInit = (): Array<Customer> => {
  const customers: Array<Customer> = [];
  const sdDiscount: Discount = {
    type: Advertisement.Classic,
    quantityDiscount: {
      getQuantity: 3,
      forQuantity: 2,
    },
  };
  const secondBitePrice = PricingRule.new([sdDiscount]);

  const acDiscount: Discount = {
    type: Advertisement.StandOut,
    priceDiscount: 299.99,
  };
  const acPrice = PricingRule.new([acDiscount]);

  const myerStandOutDiscount: Discount = {
    type: Advertisement.StandOut,
    quantityDiscount: {
      getQuantity: 5,
      forQuantity: 4,
    },
  };
  const myerPremiumDiscount: Discount = {
    type: Advertisement.Premium,
    priceDiscount: 389.99,
  };
  const myerPrice = PricingRule.new([
    myerStandOutDiscount,
    myerPremiumDiscount,
  ]);

  customers.push(Customer.new('SecondBite', secondBitePrice));
  customers.push(Customer.new('Axil Coffee Roasters', acPrice));
  customers.push(Customer.new('MYER', myerPrice));

  return customers;
};

const customers = customersDataInit();

let checkout: Checkout = Checkout.new();

app.get('/', (_req, res) => {
  res.send('Welcome to the AD checkout system!');
});

app.post('/select-customer', (req, res) => {
  try {
    const { customerName } = req.body;
    const customer = customers.find((c) => c.name === customerName);
    if (!customer) {
      checkout = Checkout.new();
      res.send('No customer found, use default price for checkout');
    } else {
      checkout = Checkout.new(customer.pricingRule);
      res.send(customer);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.post('/add-item', (req, res) => {
  try {
    const { type } = req.body;
    if (!Advertisement[type]) {
      throw new Error(`type ${type} is incorrect`);
    }
    checkout.add(type);
    res.send(`${type} added`);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.get('/total', (_req, res) => {
  try {
    res.send({ price: checkout.total() });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
