const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const app=express();

app.use(express.urlencoded({extended:false}));
app.use(cors());
app.use(express.json());
const userSchema= new mongoose.Schema({
    name:String,
    email:String,
    comment:String
})
const cd=async()=>{
    const run=await mongoose.connect("mongodb://localhost:27017/checkapp").then(()=>{
        console.log("database connected")
    }).catch((e)=>{
        console.log(e);
    })
}

cd()

// const userSchema= new mongoose.Schema({
//     name:String,
//     email:String,
//     comment:String
// })

const User=mongoose.model("User",userSchema);

app.get('/',(async(req,res)=>{
    const  product=await User.find()       
    res.send(product)
}))
app.post('/register',(req,res)=>{
    const {name,email,comment}=req.body
    const user=new User({
        name:name,
        email:email,
        comment:comment
    })

    user.save((e)=>{
        if(e){res.send(e)}
        else{res.send({message:"successfull",user:user})}
    })
})

app.listen(8000,()=>{
    console.log("server running on port number 8000")
})