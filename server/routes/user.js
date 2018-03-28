const express = require('express');
const router = express.Router();

const {connection} = require('../connection');

router.post('/log_in', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query("select u_id from user where username=? and password=aes_encrypt(?,?)",
      [req.body.username, req.body.password, req.body.username[0]],
      (err, res) => {
        if(err){
          reject(err);
        }else if(res.length) {

          resolve({reply: res[0].u_id});
        }else {
          resolve({reply: 'NO_SUCH_USER'});
        }
      });
  }).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

router.post('/get_user', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query("select username, fullname, email from user where u_id=?",
      [req.body.u_id],
      (err, res) => {
        if(err){
          reject(err);
        }else if(res.length) {
          resolve(res[0]);
        }else {
          resolve({reply: 'NO_SUCH_USER'});
        }
      });
  }).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

router.post('/get_all_users', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query("select u_id, username, fullname, email from user where not u_id=?",
      [req.body.u_id],
      (err, res) => {
        if(err){
          reject(err);
        }else {
          resolve(res);
        }
      });
  }).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

router.post('/add_user', (req, res) => {
  new Promise((resolve, reject) => {
    connection.query("select u_id from user order by u_id desc limit 1",
      [req.body.u_id],
      (err, res2) => {
        if(err){
          reject(err);
        }else {
          var u_id = '0001';
          if (res2.length) {
            u_id = ("000" + (parseInt(res2[0].u_id)+1));
          }
          connection.query("insert into user values(?,?,aes_encrypt(?,?),?,?)",
            [u_id, req.body.username, req.body.password, req.body.username[0], req.body.email, req.body.fullname],
            (err, res) => {
              if (err) {
                if(err.code === 'ER_DUP_ENTRY') {
                  resolve({reply: 'USERNAME_EXIST'});
                }
                reject(err);
              } else {
                console.log(res);
                resolve(res);
              }
            });
        }
      });
  }).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

router.post('/update_user', (req, res) => {
  new Promise((resolve, reject) => {
    if (req.body.newpassword) {
      console.log(req.body);
      connection.query("update user set username=?, password=aes_encrypt(?,?), email=?, fullname=? where u_id=? and password=aes_encrypt(?,?)",
        [req.body.username, req.body.newpassword, req.body.username[0], req.body.email, req.body.fullname,
          req.body.u_id, req.body.password, req.body.oldusername[0]],
        (err, res) => {
          if(err){
            if(err.code === 'ER_DUP_ENTRY') {
              resolve({reply: 'USERNAME_EXIST'});
            }
            reject(err);
          }else {
            resolve(res);
          }
        });
    } else {
      connection.query("update user set username=?, password=aes_encrypt(?,?), email=?, fullname=? where u_id=? and password=aes_encrypt(?,?)",
        [req.body.username, req.body.password, req.body.username[0], req.body.email, req.body.fullname,
          req.body.u_id, req.body.password, req.body.oldusername[0]],
        (err, res) => {
          if(err){
            if(err.code === 'ER_DUP_ENTRY') {
              resolve({reply: 'USERNAME_EXIST'});
            }
            reject(err);
          }else {
            resolve(res);
          }
        });
    }
  }).then((result) => {
    res.status(200).send(result);
  }).catch((err) => {
    res.status(400).send(err);
  });
});

module.exports = router;
