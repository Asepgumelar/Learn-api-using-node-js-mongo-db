const Customer = require('../models/customer.js'); 
exports.create = (req, res) => { 
    if(!req.body.customer_number) {
        return res.status(400).send({
            message: "Data Untitled" 
        });
    }
    const customer = new Customer({
        customer_number: req.body.customer_number || "Customer Number Untitled ",
        nama: req.body.nama || "Nama Untitled",
        jenis_kelamin: req.body.jenis_kelamin || "Jenis Kelamin Untitled ",
        telepon: req.body.telepon || "Telepon Untitled ",
        alamat: req.body.alamat || "Alamat Untitled ", 
        kec: req.body.kec || "Kecamatan Untitled ",
        kota: req.body.kota || "Kota Untitled ",
        provinsi: req.body.provinsi || "Provinsi Untitled ",
        kode_pos: req.body.kode_pos || "Kode PosUntitled "
    });
    customer.save() .then(data => {
        res.send(data); 
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error creating the customer." 
        }); 
    }); 
};

exports.findAll = (req, res) => {
    Customer.find() .then(customers => {
        res.send(customers); 
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving customer." 
        }); 
    });
};

exports.findOne = (req, res) => {
    Customer.findById(req.params.custId) .then(customer => {
        if(!customer) { return res.status(404).send({
            message: "Customer not found with id " + req.params.custId 
        }); 
    }
    res.send(customer); 
}).catch(err => {
    if(err.kind === 'ObjectId') {
        return res.status(404).send({
            message: "customer not found with id " + req.params.custId 
        }); 
    }
    return res.status(500).send({
            message: "Error retrieving customer with id " + req.params.custId 
        }); 
    }); 
};

exports.update = (req, res) => {
    if(!req.body.customer_number) { 
        return res.status(400).send({ 
            message: "Customer content can not be empty" 
        }); 
    } 
    Customer.findByIdAndUpdate(req.params.custId, {
        customer_number: req.body.customer_number || "Customer Number Untitled ",
        nama: req.body.nama || "Nama Untitled",
        jenis_kelamin: req.body.jenis_kelamin || "Jenis Kelamin Untitled ",
        telepon: req.body.telepon || "Telepon Untitled ",
        alamat: req.body.alamat || "Alamat Untitled ", 
        kec: req.body.kec || "Kecamatan Untitled ",
        kota: req.body.kota || "Kota Untitled ",
        provinsi: req.body.provinsi || "Provinsi Untitled ",
        kode_pos: req.body.kode_pos || "Kode PosUntitled "
    }, {
        new: true
    }) .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.custId 
            }); 
        } res.send(customer); 
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({ 
                message: "Customer not found with id " + req.params.custId 
            }); 
        } return res.status(500).send({
            message: "Error updating customer with id " + req.params.custId 
        }); 
    }); 
};

exports.delete = (req, res) => {
    Customer.findByIdAndRemove(req.params.custId) .then(customer => {
        if(!customer) {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.custId 
            }); 
        }
        res.send({
            message: "Customer deleted successfully!"
        }); 
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.customer_number === 'NotFound') {
            return res.status(404).send({
                message: "Customer not found with id " + req.params.custId
            });
        } return res.status(500).send({
            message: "Could not delete customer with id " + req.params.custId
        });
    }); 
};