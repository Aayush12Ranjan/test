
// import express from 'express';
// import mongoose from 'mongoose';
// const app = express();
// app.use(express.json()); // ✅ MUST be before app.post(...)

// const PORT=5000;

// const  connectDb=async()=>{
//     try {
//          await mongoose.connect("mongodb://localhost:27017/test")
//         console.log("Mongodb Connected Successfully...")
//     } catch (error) {
//         console.log("error in connection", err)
        
//     }
// }
//     connectDb();


// const UserSchema = new mongoose.Schema({
//     name:{
//         type: String,
//         required:true
//     },
//     Email:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     }
// })

// const User= mongoose.model("User", UserSchema)




//     // app.post("/", async(req,res)=>{
//     // const User.name=name=req.body;
//     //    try {
//     //     const existu=  await User.findOne({Email})
//     //     if(existu){
//     //        return  res.status(400).json({message:"User already Exist"});
//     //     }
//     //     const user= new User({
//     //         name,
//     //         Email,
//     //         password,
//     //     })

//     //     await user.save();
        
//     //    } catch (error) {
//     //     console.log(error)
//     //     res.status(500).json({message: "Internal server error"})
        
//     //    }
//     // })



//    app.post("/", async (req, res) => {
//   console.log("Request body received:", req.body); // Debug log

//   const { name, Email, password } = req.body;

//   if (!name || !Email || !password) {
//     return res.status(400).json({ message: "Missing required fields" });
//   }

//   try {
//     const existu = await User.findOne({ Email });
//     if (existu) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const user = new User({ name, Email, password });
//     await user.save();

//     res.status(201).json({ message: "User registered successfully", user });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });


//     app.listen(PORT, ()=>{
//         console.log(`server running at http://localhost:${PORT}`)
//     })











import express from 'express';
import mongoose from 'mongoose';
import cors from "cors"

const app=express();



app.use(express.json())

app.use(cors({
    origin:"*"
}))

async function connectdb(){
    try {

   await mongoose.connect("mongodb://localhost:27017/prac1")
    console.log("database connected successfully")
    
} catch (error) {
    console.log(error.message("database connection failed"));
    
}
}

connectdb();

const userschema=new mongoose.Schema({
    Email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required:true

    }
})

const User=mongoose.model("User",userschema)

// app.post('/',async(req,res)=>{

//     const {Email,password}=req.body;

//     if(!Email || !password){
//         res.status(400).json({
//             message:"All field are required"
//         })
        
//     }

//     const userexist=await User.findOne({Email});
//     if(userexist){
//         res.status(400).json({
//             message:"email exists"
//         })
//     }

//     const  user=new User({
//         Email,
//         password
//      })

//      await user.save();


//      res.status(201).json({
//         message:"user created successfully",
//         user
//      })




   
    
// })


app.post("/", async(req,res)=>{
    const {Email, password}= req.body;

    try {
    if(!Email || !password){
        res.status(400).json({
            message:"fill require field"
        })
    }

    const existU= await User.findOne({Email});
    if(existU){
        return res.status(401).json({message: "User already exist"})
    }
        
    const user= new User({
        Email,
        password

    })
    
    res.status(200).json({
        message: "user created succsfully", user
    })
    await user.save();

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Internal server error"
        })
        
    }
})


app.get('/get',async(req,res)=>{
    const user=await User.find();

    res.status(201).json({
        user
    })
})

app.post('/upd/:id',async(req,res)=>{

    const id=req.params.id;

    const user=await User.findByIdAndUpdate(id,req.body,{new : true})

    res.status(201).json({
        user
    })


})


app.listen(5000,()=>{
    console.log(`server running at : http://localhost:${5000}`);
    
})