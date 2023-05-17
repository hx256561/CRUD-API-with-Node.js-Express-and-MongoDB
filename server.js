const express=require('express');
const mongoose=require('mongoose');
const app=express();


//route
app.get('/',(req,res)=>{
    res.send('Hello Node API');
});

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