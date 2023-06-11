const { userModel } = require("../../models/userModel");

class UserManagerMongo {
  addUser = async (newUser) => {
    try {
      const { username, first_name, last_name, email, password } = newUser;
      return await userModel.create({
        username,
        first_name,
        last_name,
        email,
        password,
      });
    } catch (error) {
      return new Error(error);
    }
  };

  findUser = async (email) => {
    try {
      return await userModel.findOne({email});
    } catch (error) {
      console.log(error);
    }
  };
  findUserRegistered = async (email, password) => {
    try {
      return await userModel.findOne({email, password});
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = UserManagerMongo;
