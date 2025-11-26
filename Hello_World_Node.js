// Simple Hello World Node.js Application

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// Create HTTP server with URL-based routing
const server = http.createServer((req, res) => {
  // Check if the request is for the health check endpoint
  if (req.url === '/health') {
    // Health check endpoint - returns JSON status information
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
    // Build health check response object
    const healthResponse = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'hello-world-nodejs'
    };
    
    // Send JSON response
    res.end(JSON.stringify(healthResponse));
  } else {
    // Default handler - returns Hello World for all other paths (including root '/')
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
