 const users = require('../models/userModel')
 const jwt = require('jsonwebtoken')

// register
exports.registerController  = async (req,res)=>{
    console.log("Inside register controller");
     console.log(req.body);

const{username,email,password} = req.body
try{
    const existingUser = await users.findOne({email});
        if(existingUser) {
          res.status(406).json("User already exist...please login");
        }
        else {
            const newUser = new users({ 
                username, email, password,github:"",linkedin:"",profilepic:""
            })
            await newUser.save();
            res.status(200).json(newUser);
        }
}catch (err) {
    console.log(err);
    
}

}

// login
exports.loginController = async (req, res)=>{
    console.log("login controller");
    const {email, password} = req.body
    console.log(email, password);
    try {
        const existingUser = await users.findOne({email, password})
        if(existingUser){
            // token generationr
            const token = jwt.sign({userID:existingUser._id},process.env.JWTPASSWORD)
            res.status(200).json({user : existingUser,token})
        }else{
            res.status(404).json("Incorrect email/Password")
        }
    } catch (error) {
        res.status(401).json(error)
    }
}
// profile update

exports.editUserController = async (req,res)=>{
    console.log("inside editUserController");
    const {username,password,email,github,linkedin,profilePic} = req.body
    const uploadProfilePic =  req.file?req.file.filename : profilePic
    const userId = req.userId
    try{
        const updateUser = await users.findByIdAndUpdate({_id:userId},{
            username,password,email,github,linkedin,profilePic:uploadProfilePic
        },{new:true})
        await updateUser.save()
        res.status(200).json(updateUser)

    }catch(err){
        res.status(401).json(err)
    }    
}