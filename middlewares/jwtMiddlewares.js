const jwt = require('jsonwebtoken')
const jwtMiddleware = (req,res,next)=>{
    console.log("Inside middleware");
    const token = req.headers['authorization'].split(" ")[1]
    console.log(token);
    if(token!=''){
        try{
            const jwtResponse = jwt.verify(token,process.env.JWTPASSWORD)
            console.log(jwtResponse);
            req.userId = jwtResponse.userID        
        }
        catch(err){
            res.status(401).json("Autherization failed... Please Login!!")
        }      
    }else{
        res.status(404).json("Authorisation Failed.. Token is Missing...!!!!")
    }
    next()   
}
 module.exports = jwtMiddleware