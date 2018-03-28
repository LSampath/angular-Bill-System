const express = require('express');
const router = express.Router();

const {connection} = require('../connection');

// get all supplier details
router.get('/get_suppliers', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query("select * from supplier",
      (err, res) => {
        if(err){
          reject(err);
        }
        if (res.length) {
          resolve(res);
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

// remove supplier record
router.post('/remove_supplier', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query("delete from supplier where s_id=?",
      [req.body.s_id],
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

// insert a new supplier
router.post('/insert_supplier', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query("insert into supplier (name, email, contact, fax) values(?,?,?,?)",
      [req.body.name, req.body.email, req.body.contact, req.body.fax],
      (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
  }).then((result) => {
    res.status(200).send(result);
  }).catch((error) => {
    res.status(400).send(error);
  });
});

// update supplier record
router.post('/update_supplier', (req, res) => {
  console.log(req.body);
  new Promise((resolve, reject) => {
    connection.query("update supplier set name=?, email=?, contact=?, fax=? where s_id=?",
      [req.body.name, req.body.email, req.body.contact, req.body.fax, req.body.s_id],
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

module.exports = router;
