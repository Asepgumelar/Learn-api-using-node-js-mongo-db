const DetailOrder = require('../models/order_detail.js'); 
exports.create = (req, res) => { 
    if(!req.body.order_number) {
        return res.status(400).send({
            message: "Order detail content can not be empty" 
        });
    }
    const detail_order = new DetailOrder({
        order_number: req.body.order_number,
        customer_number: req.body.customer_number,
        product_number: req.body.product_number,
        quantity: req.body.quantity
    });
    detail_order.save() .then(data => {
        res.send(data); 
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error creating the order detail." 
        }); 
    }); 
};

exports.findAll = (req, res) => {
    DetailOrder.find() .then(data => {
        res.send(data); 
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving order detail." 
        }); 
    });
};

exports.findOne = (req, res) => {
    DetailOrder.findById(req.params.odId) .then(detail_order => {
        if(!detail_order) { return res.status(404).send({
            message: "Order detail not found with id " + req.params.odId 
        }); 
    }
    res.send(detail_order); 
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "order detail not found with id " + req.params.odId 
        }); 
    }
    return res.status(500).send({
            message: "Error retrieving order detail with id " + req.params.odId 
        }); 
    }); 
};

exports.update = (req, res) => {
    if(!req.body.order_number) { 
        return res.status(400).send({ 
            message: "Order content can not be empty" 
        }); 
    } 
    DetailOrder.findByIdAndUpdate(req.params.odId, {
        order_number: req.body.order_number,
        customer_number: req.body.customer_number,
        product_number: req.body.product_number,
        quantity: req.body.quantity
    }, {
        new: true
    }) .then(detail_order => {
        if(!detail_order) {
            return res.status(404).send({
                message: "Order detail not found with id " + req.params.odId 
            }); 
        } res.send(detail_order); 
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({ 
                message: "Order not found with id " + req.params.odId 
            }); 
        } return res.status(500).send({
            message: "Error updating order detail with id " + req.params.odId 
        }); 
    }); 
};

exports.delete = (req, res) => {
    DetailOrder.findByIdAndRemove(req.params.odId) .then(data => {
        if(!data) {
            return res.status(404).send({
                message: "Order detail not found with id " + req.params.odId 
            }); 
        }
        res.send({
            message: "Order detail deleted successfully!"
        }); 
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.order_number === 'NotFound') {
            return res.status(404).send({
                message: "Order detail not found with id " + req.params.odId
            });
        } return res.status(500).send({
            message: "Could not delete order detail with id " + req.params.odId
        });
    }); 
};