const { Router } = require("express");
const MessagesManagerMongo = require("../managerDaos/mongo/messageManagerMongo");
const messageManager = new MessagesManagerMongo
const router = Router()

router.get('/', async (req, res) =>{
    try {
        let users = await messageManager.getMessages
        
        res.status('succes').send(users)
    } catch (error) {
        console.log(error)
    }
})

router.post('/', async(req, res) => {
    try {

        let user = req.body
        let newUser = {
            user: user.email,
            message: user.message
        }
        let result = await messageManager.addMessage(newUser)
        
        res.status(200).send({result})
    } catch (error) {
        console.log(error)
    }
})


module.exports = router