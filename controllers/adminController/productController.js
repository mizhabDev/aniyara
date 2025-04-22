router.put('/edit/:id', async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                price: req.body.price,
                stock: req.body.stock,
                category: req.body.category,
                description: req.body.description
            },
            { new: true }
        );
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;