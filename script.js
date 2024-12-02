const express = require('express');
const app = express();


app.use(express.json());


let products = [
  { id: 1, name: 'Rice Mask', price: 10 },
  { id: 2, name: 'Banana Leaf Plate', price: 5 }
];

app.get('/products', (req, res) => {
  res.status(200).json(products);
});

app.get('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.status(200).json(product);
});

app.post('/products', (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.put('/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  product.name = req.body.name;
  product.price = req.body.price;
  res.status(200).json(product);
});

app.delete('/products/:id', (req, res) => {
  const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
  if (productIndex === -1) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const deletedProduct = products.splice(productIndex, 1);
  res.status(200).json(deletedProduct);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
