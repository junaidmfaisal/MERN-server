const projects = require("../models/projectModel")

// add projects
exports.addProjectController = async (req,res)=>{
    console.log("inside addProjectController");
    const userId = req.userId
    console.log(userId);
    console.log(req.body);
    const {title,language,overview,github,website} = req.body
    const  projectImg =  req.file? req.file.filename : null;
    console.log(title,language,overview,github,website,projectImg);
    try{
       const existingProject = await projects.findOne({github})
       if(existingProject){
        res.status(406).json("Project already exists...Please upload another one!!")
       }else{
        const newProject = new projects({
            title,language,overview,github,website,projectImg,userId
        })
        await newProject.save()
        res.status(200).json(newProject)
       }
    }catch(err){
        console.log("Error in addProjectController:",err);
        res.status(500).json({error:"Internal server error",details:err.message})
    }
  
}

// get home project - no need of authorization

exports.homePageProjectController = async (req,res)=>{
    console.log("inside homePageProjectController");
    try{
       const allHomeProjects = await projects.find().limit(3)
       res.status(200).json(allHomeProjects)
    }catch(err){
        res.status(401).json(err)
    }
    
}

// get all project - no need of authorization

exports.allProjectController = async (req,res)=>{
    const searchKey = req.query.search
    console.log(searchKey);

    const query = {
        language:{
            $regex:searchKey,$options:"i"
        }
    }
    
    console.log("inside allProjectController");
    try{
       const allProjects = await projects.find(query)
       res.status(200).json(allProjects)
    }catch(err){
        res.status(401).json(err)
    }
    
}

// get home project - no need of authorization

exports.userProjectController = async (req,res)=>{
    console.log("inside userProjectController");
    const userId = req.userId
    try{
       const allHomeProjects = await projects.find({userId})
       res.status(200).json(allHomeProjects)
    }catch(err){
        res.status(401).json(err)
    }
    
}


exports.editProjectController = async (req,res)=>{
    console.log("inside editProjectController");
    const id = req.params.id
    const userId = req.userId
    const {title,language,overview,github,website,projectImg} = req.body
    const reUploadProjectImg =  req.file?req.file.filename : projectImg
    try{
        const updateProject = await projects.findByIdAndUpdate({_id:id},{
            title,language,overview,github,website,projectImg:reUploadProjectImg,userId
        },{new:true})
        res.status(200).json(updateProject)

    }catch(err){
        res.status(401).json(err)
    }    
}

// remove project- need
exports.removeProjectController = async (req,res)=>{
    console.log("inside removeProjectController");
    const {id} = req.params
    
    try{
        const deleteProject  = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(deleteProject)
        
    }catch(err){
        res.status(401).json(err)
    }    
}


