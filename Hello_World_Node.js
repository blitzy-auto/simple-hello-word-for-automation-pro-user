// Simple Hello World Node.js Application

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // Route requests based on URL path
  if (req.url === '/health') {
    // Health check endpoint - returns JSON status information
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const healthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      service: 'hello-world-nodejs'
    };
    res.end(JSON.stringify(healthCheck));
  } else {
    // Default endpoint - returns Hello World message for all other paths
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
