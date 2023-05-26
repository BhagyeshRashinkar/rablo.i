const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const mongoURL = process.env.MONGOURI;
mongoose.connect(mongoURL).then(() => {
    console.log("Connection established");
}).catch((err) => {
    console.log("Error establishing connection");
})

const productSchema = new mongoose.Schema({
    productID: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    featured: { type: Boolean, default: false },
    rating: { type: Number, min: 0, max: 5, default: null },
    createdAt: { type: Date, default: Date.now, required: true },
    company: { type: String, required: true }
});

const Product = new mongoose.model("Product", productSchema);


app.get('/', (req, res) => {
    Product.find().then((products)=>{
        res.render('index', {products});
    });
    
})

app.get('/success', (req, res) => {
    res.render('success');
})

app.get('/error', (req, res) => {
    res.render('failure');
})


app.post("/", (req, res) => {
    const { productID, name, price, rating, company } = req.body;

    const featured = req.body.featured === 'on';

    const product = new Product({
        productID,
        name,
        price,
        featured,
        rating,
        company,
    });

    product.save().then((savedProduct) => {
        res.redirect('/success');
    }).catch((err) => {
        res.redirect('/error');
    })

})

app.get("/update/:_id", (req, res)=>{
    const { _id } = req.params;
    Product.findOne({_id}).then((product)=>{
        res.render('update', {product});
    })
})

app.post('/update/:_id', (req, res) => {
    const { _id } = req.params;
    const { productID, name, price, rating, company } = req.body;
    
    const featured = req.body.featured === 'on';

    Product.findOneAndUpdate(
        { _id },
        {productID, name, price, featured, rating, company},
        { new: true }
    ).then((updatedProduct) => {
        res.redirect('/')
    }).catch((err) => {
        res.send(err);
    })
})

app.post('/delete/:_id', (req, res) => {
    const { _id } = req.params;

    Product.deleteOne({ _id }).then((deletedProduct) => {
        res.redirect('/');
    }).catch((err) => {
        res.send(err);
    })
})

app.get('/filter', (req, res)=>{
    const filter = {};

    if(req.query.featured==='on'){
        filter.featured = true;
    }

    if(req.query.maxPrice){
        filter.price = {$lt: req.query.maxPrice};
    }

    if(req.query.minRating){
        filter.rating ={$gt: req.query.minRating};
    }

    if(Object.keys(filter).length===0){
        res.redirect('/')
    }else{
        Product.find(filter).then((products)=>{
            res.render('index', {products})
        })
    }
})

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running on port http://localhost:${port}/`);
})