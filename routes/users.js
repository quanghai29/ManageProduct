var express = require('express');
const bcrypt = require('bcryptjs');
const userModel = require('../models/user.model');
const roleAdmin=require('../middlewares/authAdmin.mdw');
const moment = require('moment');
const router = express.Router();


//Sign up
router.get('/signup',roleAdmin, async (req, res) => {
  res.render('signup',{
    layout:false
  });
});


router.post('/signup',roleAdmin, async (req, res) => {
  const N = 10;
  var gioitinh='Nam';
  const hash = bcrypt.hashSync(req.body.raw_password, N);
  const dob = moment(req.body.dob, 'DD/MM/YYYY').format('YYYY-MM-DD');
  if(req.body.value_GioiTinh==1)
  {
    gioitinh='Nữ';
  }
  const entity = req.body;
  entity.password = hash;
  entity.ngaysinh = dob;
  entity.gioitinh=gioitinh;
  
  delete entity.value_GioiTinh;
  delete entity.raw_password;
  delete entity.dob;
  const result = await userModel.add(entity);
  console.log(result);

  res.redirect('/');
});

//Login
router.get('/login', async (req, res) => {
  res.render('login',{
    layout:false
  });
});

router.post('/login', async (req, res) => {
  const user = await userModel.singleByUsername(req.body.username);
  if (user === null)
    throw new Error('Invalid username or password.');

  const rs = bcrypt.compareSync(req.body.password, user.password);
  if (rs === false)
    return res.render('login', {
      layout: false,
      err_message: 'Login failed '
    });

  delete user.f_Password;

  req.session.isAuthenticated = true;
  req.session.authUser = user;
  req.session.role=user.loai;

  const url = req.query.retUrl || '/';
  res.redirect(url);
})


router.post('/logout', (req, res) => {
  req.session.isAuthenticated = false;
  req.session.authUser = null;
  req.session.role=-1;
  res.redirect('/user/login');
});


//Modified Prfile

//code here

//
module.exports = router;
