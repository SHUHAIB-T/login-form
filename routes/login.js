const express = require('express');
const router = express.Router();

const user = {
  id:"user1",
  name : 'SHUHAIB T U',
  email: "shuhaibtu79@gmail.com",
  password: "123456"
}
/* GET home page. */
router.get('/',(req,res)=>{
  if(req.session.user?.loggedin){
    let userData={
      name:user.name,
      email:user.email
    }
    res.render('home',{userData})
  }
  else{
    res.redirect('/login')
  }
})
router.get('/login', function(req, res, next) {
  if(req.session.user?.loggedin){
    res.redirect('/')
  }
  else{
  res.render('login',{err:req.session.err});
  delete req.session.err
  }
});

router.post('/login', function(req, res) {
  if(req.body.Email === user.email && req.body.Password === user.password){
    req.session.user={
      id:user.id,
      loggedin:true
    }
    res.redirect('/');
  }else{
    req.session.err="Invalid Email or Password!"
    res.redirect('/login')
  }
});

router.get('/logout',(req,res) => {
  delete req.session.user
  res.redirect('/login')
})
module.exports = router;
