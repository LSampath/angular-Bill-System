const express = require('express');
const router = express.Router();

const {connection} = require('../connection');

// get max and min date for expenses
router.get('/get_dates', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query("select max(date) as max, min(date) as min from expense",
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

// get list of registered expense categories
router.get('/get_categories', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query("select distinct category from expense",
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

// get list of expense records within given date period
router.post('/get_records', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query("select * from expense where date>=? and date<=?",
      [req.body.from, req.body.to],
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

// record a new expense transaction
router.post('/insert_expense', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query("select e_id from expense order by e_id desc limit 1",
      (err, res2) => {
        if(err){
          reject(err);
        }else {
          var e_id = '0001';
          if (res2.length) {
            e_id = ("000" + (parseInt(res2[0].e_id)+1));
          }
          connection.query("insert into expense values(?,?,?,?,?)",
            [e_id, req.body.date, req.body.description, req.body.amount, req.body.category],
            (err, res) => {
              if (err) {
                reject(err);
              } else {
                resolve(res);
              }
            });
        }
      });
  }).then((res) => {
    res.status(200).send(res);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

// update expense record
router.post('/update_expense', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query("update expense set date=?, description=?, amount=?, category=? where e_id=?",
      [req.body.date, req.body.description, req.body.amount, req.body.category, req.body.e_id],
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

// remove expense record
router.post('/remove_expense', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query("delete from expense where e_id=?",
      [req.body.e_id],
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
