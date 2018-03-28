const express = require('express');
const router = express.Router();

const {connection} = require('../connection');

// get max and min date for invoices
router.get('/get_dates', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query("select max(date) as max, min(date) as min from invoice",
      (err, res) => {
        if(err){
          reject(err);
        }
        if (res.length) {
          resolve(res[0]);
        }else {
          resolve({reply: "NO_RECORDS"})
        }
      });
  }).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

// get all invoice records - if s_id is 'ALL' then use different sql query
router.post('/get_invoices', (req, res) => {
  new Promise((resolve, reject) => {
    let queryString = "select i_no, date, amount, name, s_id, name, profit, amount*profit as total from invoice natural join supplier " +
      "where s_id=? and (date>=? and date<=?)";
    let values = [req.body.s_id, req.body.from, req.body.to];
    if (req.body.s_id === 'ALL') {
      queryString = "select i_no, date, amount, name, s_id, name, profit, (amount + amount*profit/100) as total from invoice natural join supplier " +
        "where (date>=? and date<=?)";
      values = [req.body.from, req.body.to];
    }
    connection.query(queryString, values,
      (err, res) => {
        if(err){
          reject(err);
        }
        resolve(res);
      });
  }).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

// check given invoice_no is valid
router.post('/check_invoice_no', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query("select * from invoice where i_no=?", [req.body.i_no],
      (err, res) => {
        if(err){
          reject(err);
        }
        if (res.length) {
          resolve({reply: "VALID_INVOICE"});
        }else {
          resolve({reply: "NO_RECORDS"})
        }
      });
  }).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

// get details for given invoice_no
router.post('/get_details', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query("select i_no, date, amount, s_id, profit from invoice where i_no=?", [req.body.i_no],
      (err, res) => {
        if(err){
          reject(err);
        }
        if (res.length) {
          resolve(res[0]);
        }else {
          resolve({reply: "NO_RECORDS"})
        }
      });
  }).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

module.exports = router;
