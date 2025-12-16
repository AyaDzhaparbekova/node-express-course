const { products } = require('./data');

const express = require('express');
const app = express();

app.use(express.static('./public'));

app.get('/api/v1/test', (req, res) => {
  res.json({ message: 'This is a test API', status: 'success' });
});

app.get('/api/v1/products', (req, res) => {
  res.json(products);
});

app.get('/api/v1/products/:productID', (req, res) => {
  const idToFind = parseInt(req.params.productID);
  const product = products.find(p => p.id === idToFind);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

app.get('/api/v1/query', (req, res) => {
  const { search, limit, maxPrice } = req.query;

  let filtered = [...products];

  // search for starting letters
  if (search) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().startsWith(search.toLowerCase())
    );
  }

  // limit number of results
  if (limit) {
    filtered = filtered.slice(0, Number(limit));
  }

  res.json(filtered);
});

if (maxPrice) {
  filtered = filtered.filter(p => p.price < Number(maxPrice));
}

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(3000, () => {
  console.log('Server is running on port 3000...');
});
