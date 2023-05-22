const express=require('express');
const mongoose=require('mongoose');
const Product = require('./models/productModel');
const app=express();


//code below allows our app specify the json files
app.use(express.json());
//code below allows our app specify the request from forms
app.use(express.urlencoded({extended: false}));

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


// update a product
app.put('/products/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        // if id is invalid
        if(!product){
            return res.status(404).json({message: `We can not find product with ID: ${id}`});
        }
        // if the data is updated successfully
        const updatedProduct=await Product.findById(id);
        return res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

// delete data
app.delete('/products/:id', async(req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        // if id is invalid
        if(!product){
            return res.status(404).json({message: `We can not find product with ID: ${id}`});
        }
        return res.status(200).json(product);
    } catch (error) {
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