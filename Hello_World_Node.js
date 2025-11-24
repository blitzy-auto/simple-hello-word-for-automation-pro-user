// Simple Hello World Node.js Application

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // Health check endpoint - returns JSON status
  if (req.url === '/health' || req.url === '/health_check') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const healthStatus = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: Date.now()
    };
    res.end(JSON.stringify(healthStatus));
  } else {
    // Existing "Hello World!" response for all other paths
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
