module.exports = (app) => {
    const customers = require('../controllers/customer.js');
    const orders = require('../controllers/order.js');
    const order_details = require('../controllers/order_detail.js');

    app.post('/customers', customers.create);
    app.get('/customers', customers.findAll);
    app.get('/customers/:custId', customers.findOne);
    app.put('/customers/:custId', customers.update);
    app.delete('/customers/:custId', customers.delete);

    app.post('/orders', orders.create);
    app.get('/orders', orders.findAll);
    app.get('/orders/:orderId', orders.findOne);
    app.put('/orders/:orderId', orders.update);
    app.delete('/orders/:orderId', orders.delete);

    app.post('/order_details', order_details.create);
    app.get('/order_details', order_details.findAll);
    app.get('/order_details/:odId', order_details.findOne);
    app.put('/order_details/:odId', order_details.update);
    app.delete('/order_details/:odId', order_details.delete);

}