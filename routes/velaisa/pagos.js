const stripe = require('stripe')('sk_test_51LIh1WHf1nz2QrLlZXOnHGnS6LPg28JGwSWX90PhDCPWY8Hj8Fj8W3KSdFoyJNXI604WSqIYIZWrHZKZvycgNmBR00L4sArrvK');
const express = require('express');

module.exports = {
    pagos: async (req, res) => {
        let response = {
            replyCode: 200,
            replyText: "Pago realizado con exito",
            data: []
        }

        const customer = await stripe.customers.create({
            email: 'guilleaua@gmail.com',
            source: req.body.stripeToken
        })

        const charge = await stripe.charges.create({
            amount: '3000',
            currency: 'mxn',
            customer: customer.id, 
            description: "Pago prueba"
        })

        response.replyCode = 200;
        response.replyText = 'Pago realizado con exito';
        response.data = [charge.id];
        res.status(200).send(response);
        
    }
}
