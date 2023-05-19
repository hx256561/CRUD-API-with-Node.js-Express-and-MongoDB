const express=require('express');
const mongoose=require('mongoose');
const Product = require('./models/productModel');
const app=express();


//code below allows our app specify the json files
app.use(express.json());

//route
app.get('/',(req,res)=>{
    res.send('Hello Node API');
});

//fetch data from database
app.get('/products', async(req, res)=>{
    try {
        // find({}) means find all the items
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: error.message}); 
    }
})
//fetch a single item
app.get('/products/:id', async(req, res)=>{
    try {
        //get the id
        const {id}=req.params;
        const product = await Product.findById(id)
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

//save data to database
app.post('/products', async(req, res)=>{
    try {
        const product= await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
})

// mongoose connection. Replaced the <password> with real password. Replaced ? with collection name
// connect to the MongoDB first and then listen
mongoose.connect('mongodb+srv://herman256561:d4fe0e88@angeloapi.zmxyy67.mongodb.net/Node-APIretryWrites=true&w=majority')
.then(()=>{
    console.log("connected to MongoDB");
    app.listen(3000, ()=>{
        console.log('Node API is running on port 3000');
    });
}).catch((error)=>{
    console.log(error);
})