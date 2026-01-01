// Simple Hello World Node.js Application

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    // Health check endpoint
    const healthStatus = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(healthStatus));
  } else {
    // Default Hello World response
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
