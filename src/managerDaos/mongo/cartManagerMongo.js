const { cartModel } = require("../../models/cartModel");

class CartManagerMongo {
  getCart = async (cid) => {
    try {
      const cart = await cartModel.findById({ _id: cid });
      return cart;
    } catch (err) {
      console.log(err);
    }
  };

  getCarts = async () => {
    try {
      let carts = await cartModel.find();
    return carts;
    } catch (error) {
      console.log(error)
    }
  };
  addCart = async () => {
    try {
      await cartModel.create({
        products: [],
      });
    } catch (err) {
      console.log(err);
    }
  };
  addProduct = async (cid, pid) => {
    try {
      const cart = await cartModel.findById({ _id: cid });
      cart.products.push({ product: pid });
      await cartModel.findByIdAndUpdate({ _id: cid }, cart);
    } catch (error) {
      console.log(error);
    }
  };



  deleteCart = async (cid) => {
    try {
      await cartModel.deleteOne({ _id: cid });
    } catch (error) {
      console.log(error);
    }
  };
  deleteProduct = async (cid, pid) => {
    try {
        const cart = await cartModel.findById({ _id: cid });
       const index = cart.products.find((product) => product._id === pid);

       if ( cid !== null && pid !== null) {
        cart.products.splice(index, 1);
        await cartModel.findByIdAndUpdate({ _id: cid }, cart);
      }


    } catch (error) {
        console.log(error)
    }
  }
}

module.exports = CartManagerMongo;
