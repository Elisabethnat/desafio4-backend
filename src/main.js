import express from 'express'
import multer from 'multer'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'
import routerProd from './routes/products.routes.js'
import routerCart from './routes/cart.routes.js'
import { __dirname } from './path.js'

import path from 'path'

import { ProductManager } from './controllers/productManager.js'

const productManager = new ProductManager('./src/models/productos.txt')

const PORT = 8080
const app = express()


const server = app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
    console.log(`http://localhost:${PORT}`)
})

const io = new Server(server)



//const storage = multer.diskStorage({
    destination: (req, file, cb) => { 
        //cb(null, 'src/public/img') 
    ////},
    filename: (req, file, cb) => {
        //cb(null, `${Date.now()}${file.originalname}`) 
        
    //}
//})


app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.engine('handlebars', engine()) 
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

//const upload = multer({ storage: storage })


io.on("connection", socket => {
    console.log("Conexion con Socket.io")

    socket.on('load', async () => {
        const products = await productManager.getProducts()
        socket.emit('products', products)
    })

    socket.on('newProduct', async product => {
        await productManager.addProduct(product)
        const products = await productManager.getProducts()
        socket.emit('products', products)
    })

})

app.use('/static', express.static(path.join(__dirname, '/public'))) 

app.get('/static', (req, res) => {
    res.render('index', {
        rutaCSS:'index',
        rutaJS:'index',
    })

})
 
app.get('/static/realTimeProducts', (req, res) => {
    res.render('realTimeProducts', {
        rutaCSS: 'realTimeProducts',
        rutaJS:'realTimeProducts',
    })
})

app.use('/api/products', routerProd)
app.use('/api/carts', routerCart)

app.use('/static', express.static(path.join(__dirname, '/public')))
app.get('*', (req, res) => {
    res.status(404).send('Error 404')
})

const mensajes = [];