const express = require('express');
var nodemailer = require('nodemailer');
const app = new express();
const port = process.env.PORT || 1001;

const wishdata = require('./src/model/wishdata');

var cookieParser = require('cookie-parser');
var session      = require('express-session');
var flash = require('req-flash');

app.use(cookieParser());
app.use(session({ secret: '123' }));
app.use(flash())

app.use(express.urlencoded({extended:true}));
app.use(express.static('./public'));
app.set('view engine','ejs');
app.set('views', './src/views');

app.get('/',(req,res)=>{
    res.render("home");
 });
 
 app.post('/submit',(req,res)=>{
   var item ={
      uname:  req.body.uname,
      wname: req.body.wname,
     email:  req.body.email,
      
   }

   var wish = wishdata(item);
  
    wish.save((err, result) => {
       if (err) {
          
       } else {
         res.redirect(`success/${result._id}`);
       }
    });
          

 });
  
app.get('/success/:id', (req, res) => {
 const msg = req.flash()

   const id = req.params.id
   
  wishdata.findOne({_id: id})

  .then((wish)=>{
      
  res.render("success",{
    wish,
    msg
  });
  })

});


app.get('/wish/:i',(req,res)=>{
   const i = req.params.i
   
  wishdata.findOne({_id: i})

  .then((wish)=>{
      
  res.render("wish",{
      wish
  });
  })

});

app.get('/wishes/:i',(req,res)=>{
  const i = req.params.i
  
 wishdata.findOne({_id: i})

 .then((wish)=>{
     
 res.render("wishes",{
     wish
 });
 })

});

app.get('/send/:id', (req, res) => {
 
  
  const id = req.params.id

  wishdata.findOne({_id: id})

 .then((wish)=>{

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
           user: 'kevinictchallenge@gmail.com',
           pass: 'diwalichallenge123'
       }
   })
  
  
  var mailOptions = {
    from: 'kevinshaj98@gmail.com',
    to: wish.email,
    subject: 'Happy Diwali '+ wish.wname,
    text:'Hi '+ wish.wname+ ','+wish.uname+' send you  diwali wishes check it.     👉🏻👉🏻     '+'https://diwali-ict.herokuapp.com/wish/'+wish._id

  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      
      res.redirect(`/success/${wish._id}`);
            
    } else {

      req.flash('successMessage', 'true');
      res.redirect(`/success/${wish._id}`);

     

    }
  });
 
 });
})
 




app.listen(port,()=>{console.log(`Server Ready at ${port}`)});
