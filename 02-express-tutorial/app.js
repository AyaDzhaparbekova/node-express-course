const express = require('express');
const app = express();

const { products, people } = require('./data');

//middleware
const logger = (req, res, next) => {
  console.log(req.method, req.url, new Date().toLocaleTimeString());
  next();
};

app.use(logger);
app.use(express.static('./methods-public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const peopleRouter = require('./routes/people');


// app.get('/', (req, res) => res.send('Home'));
// app.get('/api/v1/people', (req, res) => {
//   res.json(people);
// });

// app.post('/api/v1/people', (req, res) => {
//   if (!req.body.name) {
//     return res
//       .status(400)
//       .json({ success: false, message: 'Please provide a name' });
//   }

//   people.push({ id: people.length + 1, name: req.body.name });

//   res.status(201).json({ success: true, name: req.body.name });
// });


app.get('/api/v1/test', (req, res) => {
  res.json({ message: 'This is a test API', status: 'success' });
});
// home route
app.get('/', (req, res) => {
  res.send('Home');
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

  // filter by maxPrice
  if (maxPrice) {
    filtered = filtered.filter(p => p.price < Number(maxPrice));
  }

  // limit number of results
  if (limit) {
    filtered = filtered.slice(0, Number(limit));
  }

  res.json(filtered);
});

app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(3001, () => {
  console.log('Server is running on port 3001...');
});
