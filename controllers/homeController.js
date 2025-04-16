const productModel = require('../models/productModel');

exports.getHomePage = (req, res) => {
    const productSections = {
        jewelry: {
            title: "Jewelry",
            products: [
                { title: 'Gold Necklace', price: '299.00', image: 'gold-necklace', isNew: true },
                { title: 'Silver Earrings', price: '89.00', image: 'silver-earrings' },
                { title: 'Diamond Ring', price: '499.00', image: 'diamond-ring' },
                { title: 'Pearl Bracelet', price: '159.00', image: 'pearl-bracelet' }
            ]
        },
        gifts: {
            title: "Gifts",
            products: [
                { title: 'Gift Box', price: '30.00', image: 'gift-box', isNew: true },
                { title: 'Greeting Card', price: '5.00', image: 'greeting-card' },
                { title: 'Photo Frame', price: '25.00', image: 'photo-frame' },
                { title: 'Candle Set', price: '20.00', image: 'candle-set' }
            ]
        },
        toys: {
            title: "Toys",
            products: [
                { title: 'Teddy Bear', price: '24.99', image: 'teddy-bear', isNew: true },
                { title: 'Wooden Train', price: '34.99', image: 'wooden-train' },
                { title: 'Building Blocks', price: '29.99', image: 'blocks' },
                { title: 'Art Set', price: '19.99', image: 'art-set' }
            ]
        }
    };
    
    res.render('user/index', { productSections });
};


