const products = [
  {
    id: 1,
    name: "Pet Food",
    price: 29.99,
    description: "Premium pet food"
  }
  // Add more products
];

exports.getAllProducts = () => {
  return products;
};