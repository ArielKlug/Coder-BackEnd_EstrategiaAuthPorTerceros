const { messageModel } = require("../../models/messagesModel");

class MessagesManagerMongo {
    
    addMessage = async (user, message) => {
      try {
        await messageModel.create({
          user,
          message
        });
      } catch (err) {
        console.log(err);
      }


    };
    getMessages = async () => {
        try {
             let messages = await messageModel.find();
        return messages;
        } catch (error) {
            console.log(error)
        }
       
      };}

    module.exports = MessagesManagerMongo