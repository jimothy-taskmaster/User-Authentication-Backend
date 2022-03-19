const jwt=require('jsonwebtoken')
const User=require('../models/user')
const log=console.log

const auth=async (req,res,next)=>{
    try {
        // log('hello')
        // log(req)
        const token=req.header('Authorization').replace('Bearer ','')
        // log(token)
        const decoded=jwt.verify(token,'ThisIsJames')
        const user=await User.findOne({_id:decoded._id})
        if(!user){
            throw new Error()
        }
        req.user=user
        req.token=token
        next()
    } catch (e) {
        res.status(401).send({error:'Please Authenticate'})
    }
}

module.exports=auth