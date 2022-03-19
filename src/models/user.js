const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')




const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true

    },
    password:{
        type:String,
        required:true
    }
    
    
})

userSchema.virtual('secrets',{
    ref:'Secret',
    localField:'_id',
    foreignField:'owner'
})


userSchema.statics.checkEmail=async (email)=>{
    const user=await User.findOne({email})
    if(user)
    {
        throw new Error('Email already exists!!,Please login')
    }
    return user
}

userSchema.statics.findByCredentials=async (email,password)=>{
    const user=await User.findOne({email})

    if(!user)
    {
        throw new Error('Id or Password Invalid')
    }

    if(password != user.password)
    {
        throw new Error('Id or Password Invalid')
    }

    return user


}

userSchema.methods.generateToken=async function(){
    const user = this
    
    const token = jwt.sign({ _id: user._id.toString() }, 'ThisIsJames')
    

    return token
}

const User=mongoose.model('User',userSchema)





module.exports=User