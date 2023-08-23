import { Router } from 'express';
import { CartManager } from '../controllers/cartManager.js';

const cartManager = new CartManager('./src/models/cart.txt', './src/models/productos.txt');

const routeCart = Router();

routeCart.post('/', async (req, res) => {
    const newCart = await cartManager.createcart();
    res.status(201).json(newcart.id);

});

routerCart.get('/:cid', async (req, res) => {
    const { cid } = req.params;
    const cart = await cartmanager.getCarById(cid);

if (cart) {
    res.status(200).send(cart);

} else {
    res.status(404).send("carrito no encontrado");
}
});


routerCart.delete('/:cid, async (req, res) => { 

    const cartId = req.params.cid;
    const confirmation = await cartManager.deleteCart(cartId);

    if (confirmation) {
        res.status(200).send ('carrito eliminado correctamente.');

    } else {
        res.status(404).send('Carrito no encontrado.');

    }
});

routerCart.post('/:cid/product/:pid', async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req. body;

    const sucess = await cartManager.addProductToCart(cid, pid, quantity);
    if (success) {
        res.status(201).send("Producto agregado al carrito correctamente");

    }else {
        res.status(404).send("Carrito no encontrado");
    }

});

export default routerCart;



