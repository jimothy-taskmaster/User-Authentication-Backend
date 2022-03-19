const mongoose=require('mongoose')


const secretSchema=new mongoose.Schema({
    title:{
        type:String
    },
    body:{
        type:String
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

const Secret=mongoose.model('Secret',secretSchema)

module.exports=Secret