const mongoose = require('mongoose');


// in schema, we will determine each field
const productSchema=mongoose.Schema(
    {
        name:{
            type: String,
            required:[true, "Please enter a product name"]
        },
        quantity:{
            type: Number,
            required: true,
            default: 0
        },
        price:{
            type: Number,
            required: true,
        },
        image:{
            type: String,
            required: false,
        }
    },
    {
        // to track the time when each change is made
        timestamps: true
    }
)

// create product model
const Product = mongoose.model('Product', productSchema);

module.exports = Product;