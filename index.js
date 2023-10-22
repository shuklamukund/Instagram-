const express=require('express');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const DB='mongodb+srv://mukund5457:mukund123@cluster0.ybahxi4.mongodb.net/SignUp?retryWrites=true&w=majority';

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('FrontEnd'));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/FrontEnd/SignUp.html');
})

mongoose.connect(DB,{ useNewUrlParser:true})
.then(()=>{
    console.log('Connected to the database');
}).catch((err)=>{
console.log(err);
})

const userSchema=new mongoose.Schema({
    name:String,
    username:String,
    password:String,
    email:String,
    bio:String
});

const User=mongoose.model('users',userSchema);

var name;
var username;
var email;

var password;
var bio;
app.post('/',(req,res)=>{
    name=req.body.name;
    username=req.body.username;
    email=req.body.email;
    password=req.body.password;
    bio=req.body.bio;

console.log(name+' '+username+' '+email+' '+password+' '+bio);

//instance banayenge
const user=new User({
    name:name,
    username:username,
    password:password,
    email:email,
    bio:bio
});

//database me save ho jayega
user.save();

res.redirect('/');
})

app.listen(process.env.Port||3000,(err,result)=>{
    console.log(`server is listening `);
})

// mongodb+srv://mukund5457:<password>@cluster0.ybahxi4.mongodb.net/?retryWrites=true&w=majority