const { cartModel } = require("../../models/cartModel");

class CartManagerMongo {
  getCart = async (cid) => {
    try {
      const cart = await cartModel.findOne({ _id: cid });
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
        // userId: 
      });
    } catch (err) {
      console.log(err);
    }
  };
  // addProduct = async (cid, pid) => {
  //   try {
  //     const cart = await cartModel.findById({ _id: cid });
  //     cart.products.push({ product: pid });
  //     await cartModel.findByIdAndUpdate({ _id: cid }, cart);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  addProduct = async (cid, pid) => {
    try {
      const cart = await cartModel.findById(cid);
  
      if (!cart) {
        // El carrito no existe
        console.log('Carrito no encontrado');
        return;
      }
  
      cart.products.push({ product: pid });
      await cart.save();
  
      console.log('Producto agregado al carrito');
    } catch (error) {
      console.log(error);
    }
  };
  updateQuantityOfProduct = async (cid, pid, quantity) => {
    try {
      const cart = await cartModel.findOneAndUpdate(
        { _id: cid, "products.product": pid },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
      );
  
      
      return cart; 
    } catch (error) {
      console.log(error);
      
    }
  }
  

  emptyCart = async (cid) => {
    try {
      await cartModel.findOneAndUpdate({ _id: cid }, {products: []});
    } catch (error) {
      console.log(error);
    }
  };
  deleteProduct = async (cid, pid) => {
    try {
        const cart = await cartModel.findById({ _id: cid });
        
       const index = cart.products.find((product) => product._id === pid);

       if ( cid !== null && pid !== null && index !== -1) {
        cart.products.splice(index, 1);
        await cartModel.findByIdAndUpdate({ _id: cid }, cart);
      }else{
        throw new Error('Se produjo un error al borrar el producto')
      }


    } catch (error) {
        console.log(error)
    }
  }
  
}

module.exports = CartManagerMongo;
