const Order = require('../models/order.js'); 
exports.create = (req, res) => { 
    if(!req.body.order_number) {
        return res.status(400).send({
            message: "Order content can not be empty" 
        });
    }

    const order = new Order({
        order_number: req.body.order_number || "Order Number Untitled ",
        customer_number: req.body.customer_number || "Customer Number Untitled ",
        total_harga: req.body.total_harga || "Total Harga Untitled ",
        nama_penerima: req.body.nama_penerima || "Nama Penerima Untitled ",
        alamat_penerima: req.body.alamat_penerima || "Alamat Penerima Untitled ",
        telepon_penerima: req.body.telepon_penerima || "Telepon Penerima  Untitled "
    });
    order.save() .then(data => {
        res.send(data); 
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error creating the order." 
        }); 
    }); 
};

exports.findAll = (req, res) => {
    Order.find() .then(orders => {
        res.send(orders); 
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving order." 
        }); 
    });
};

exports.findOne = (req, res) => {
    Order.findById(req.params.orderId) .then(order => {
        if(!order) { return res.status(404).send({
            message: "Order not found with id " + req.params.orderId 
        }); 
    }
    res.send(order); 
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "order not found with id " + req.params.orderId 
        }); 
    }
    return res.status(500).send({
            message: "Error retrieving order with id " + req.params.orderId 
        }); 
    }); 
};

exports.update = (req, res) => {
    if(!req.body.order_number) { 
        return res.status(400).send({ 
            message: "Order content can not be empty" 
        }); 
    } 
    Order.findByIdAndUpdate(req.params.orderId, {
        order_number: req.body.order_number || "Order Number Untitled ",
        customer_number: req.body.customer_number || "Customer Number Untitled ",
        total_harga: req.body.total_harga || "Total Harga Untitled ",
        nama_penerima: req.body.nama_penerima || "Nama Penerima Untitled ",
        alamat_penerima: req.body.alamat_penerima || "Alamat Penerima Untitled ",
        telepon_penerima: req.body.telepon_penerima || "Telepon Penerima  Untitled "
    }, {
        new: true
    }) .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId 
            }); 
        } res.send(order); 
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({ 
                message: "Order not found with id " + req.params.orderId 
            }); 
        } return res.status(500).send({
            message: "Error updating order with id " + req.params.orderId 
        }); 
    }); 
};

exports.delete = (req, res) => {
    Order.findByIdAndRemove(req.params.orderId) .then(order => {
        if(!order) {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId 
            }); 
        }
        res.send({
            message: "Order deleted successfully!"
        }); 
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.order_number === 'NotFound') {
            return res.status(404).send({
                message: "Order not found with id " + req.params.orderId
            });
        } return res.status(500).send({
            message: "Could not delete order with id " + req.params.orderId
        });
    }); 
};