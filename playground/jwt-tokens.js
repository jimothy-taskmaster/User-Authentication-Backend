const log=console.log
const User=require('../src/models/user')
// const Secret=require('../src/models/secret')

const func=async()=>{
    try {
        const email="test1@email.com"
        const user=await User.findOne({email})  
        log(user)
    } catch (err) {
        log(err)
    }
    
    
}

func()

log('functionssss')