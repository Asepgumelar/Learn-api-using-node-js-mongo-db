const Product = require('../models/product.js'); 
exports.create = (req, res) => { 
    if(!req.body.code) {
        return res.status(400).send({
            message: "Data Untitled" 
        });
    }
    const products = new Product({
        code: req.body.code || "Code Untitled ",
        name: req.body.name || "Name Untitled",
        price: req.body.price || "Price Untitled ",
        stock: req.body.stock || "Stock Untitled ",
        description: req.body.description || "Description Untitled "
    });
    products.save() .then(data => {
        res.send(data); 
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error creating the product." 
        }); 
    }); 
};

exports.findAll = (req, res) => {
    Product.find() .then(products => {
        res.send(products); 
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving prodct." 
        }); 
    });
};

exports.findOne = (req, res) => {
    Product.findById(req.params.productId) .then(products => {
        if(!products) { return res.status(404).send({
            message: "Product not found with id " + req.params.productId 
        }); 
    }
    res.send(products); 
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Product not found with id " + req.params.productId 
        }); 
    }
    return res.status(500).send({
            message: "Error retrieving product with id " + req.params.productId 
        }); 
    }); 
};

exports.update = (req, res) => {
    if(!req.body.code) { 
        return res.status(400).send({ 
            message: "Product content can not be empty" 
        }); 
    } 
    Product.findByIdAndUpdate(req.params.productId, {
        code: req.body.code || "Code Untitled ",
        name: req.body.name || "Name Untitled",
        price: req.body.price || "Price Untitled ",
        stock: req.body.stock || "Stock Untitled ",
        description: req.body.description || "Description Untitled "
    }, {
        new: true
    }) .then(products => {
        if(!products) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId 
            }); 
        } res.send(products); 
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({ 
                message: "Product not found with id " + req.params.productId 
            }); 
        } return res.status(500).send({
            message: "Error updating product with id " + req.params.productId 
        }); 
    }); 
};

exports.delete = (req, res) => {
    Product.findByIdAndRemove(req.params.productId) .then(products => {
        if(!products) {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId 
            }); 
        }
        res.send({
            message: "Product deleted successfully!"
        }); 
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.code === 'NotFound') {
            return res.status(404).send({
                message: "Product not found with id " + req.params.productId
            });
        } return res.status(500).send({
            message: "Could not delete product with id " + req.params.productId
        });
    }); 
};