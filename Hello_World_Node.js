// Simple Hello World Node.js Application

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;

  // Health check endpoint - returns JSON status information
  if (req.url === '/health') {
    res.setHeader('Content-Type', 'application/json');
    const healthResponse = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'hello-world-nodejs'
    };
    res.end(JSON.stringify(healthResponse));
  } else {
    // Default Hello World response for all other paths
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
