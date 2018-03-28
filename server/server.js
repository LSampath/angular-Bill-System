const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const UserRoute = require('./routes/user');
const ExpenseRoute = require('./routes/expense');
const SupplierRoute = require('./routes/supplier');
const InvoiceRoute = require('./routes/invoice');

app.listen(3000, () => {
  console.log("Server is up on 3000");
});

app.use('/user', UserRoute);
app.use('/expense', ExpenseRoute);
app.use('/supplier', SupplierRoute);
app.use('/invoice', InvoiceRoute);

app.get('/', function(req, res){
  res.send('express server working....');
});
