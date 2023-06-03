const http = require('http');
const url = require('url');

// Data eventually sould be fetched from a database
let products = [
    { id: 1, name: 'Venues', price: 4000 },
    { id: 2, name: 'Lodges', price: 2000 },
    { id: 3, name: 'Offices', price: 1500 },
];

// Create HTTP server
const server = http.createServer((req, res) => {
    const reqUrl = url.parse(req.url, true);

    // GET: /products
    if (reqUrl.pathname == '/products' && req.method === 'GET') {
        console.log('Processing GET request for /products');
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(products));
    } 

    // POST: /products
    else if (reqUrl.pathname == '/products' && req.method === 'POST') {
        console.log('Processing POST request for /products');
        let body = '';

        req.on('data', (chunk) => {
            body += chunk;
        });

        req.on('end', () => {
            const product = JSON.parse(body);
            products.push(product);

            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(products));
        });
    } 

    // GET: /products/:id
    else if (reqUrl.pathname.includes('/products/') && req.method === 'GET') {
        const id = parseInt(reqUrl.pathname.split('/')[2]);

        const product = products.find(product => product.id === id);

        if (product) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(product));
        } else {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Product not found' }));
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
});

// Server listen
server.listen(5000, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:5000/');
});
