const express = require('express')
const cors = require('cors');
require('./db/mongoose')
const User=require('../src/models/user')
const Secret=require('../src/models/secret')

const auth=require('./middleware/auth')

const app = express()

app.use(express.json())
app.use(cors())

const log=console.log



app.get('/secrets',auth ,async (req,res)=>{
    try {
        
        await req.user.populate('secrets').execPopulate()
        
        res.status(200).send(req.user.secrets)
    } catch (err) {
        res.status(400).send( {'Error':err.message} )
    }
})


app.post('/secrets',auth ,async (req,res)=>{
    const secret=new Secret({
        ...req.body,
        owner: req.user._id
    })
    try {
        
        await secret.save()
        res.status(201).send(secret)
    } catch (err) {
        res.status(400).send( {'Error':err.message} )
    }
})

app.delete('/secrets/:id',auth,async(req,res)=>{
    // log(req)
    const Id=req.params.id
    try {
        await Secret.deleteOne({ _id: Id  });
        res.status(200).send()    
    } catch (er) {
        res.status(500).send(er)
    }
    
})

app.patch('/secrets/:id',auth ,async (req,res)=>{
    const Id=req.params.id
    try {
        await Secret.findOneAndUpdate({_id:Id},req.body)
        res.status(200).send()
    } catch (er) {
        res.status(500).send()
    }
})

app.post('/register',async (req,res)=>{

    try {
        // log(req.body.email)
        // log(req.body.password)
        let user=await User.checkEmail(req.body.email)
        // log(user)
        user=new User(req.body)
        await user.save()
        const token=await user.generateToken()
        
        res.status(201).send({user,token})
    } catch (err) {
        log(err.message)
        res.status(400).send( err.message )
    }
})

app.post('/login',async (req,res)=>{
    try {
        const user= await User.findByCredentials(req.body.email,req.body.password)    
        const token=await user.generateToken()
        res.send({user,token})
    } catch (err) {
        
        
        return res.status(400).send( {'Error':err.message} )
    }
    
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
}) 



