// Simple Hello World Node.js Application

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// Create HTTP server with URL-based routing to handle multiple endpoints
const server = http.createServer((req, res) => {
  // Health check endpoint: Returns JSON with service status and uptime
  // Useful for monitoring tools, load balancers, and operational verification
  if (req.url === '/health') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    // Return health status with process uptime in seconds
    const healthResponse = {
      status: 'ok',
      uptime: process.uptime()
    };
    res.end(JSON.stringify(healthResponse));
  } else {
    // Default handler: Returns "Hello World!" for root path and all other paths
    // This maintains backward compatibility with the original endpoint behavior
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
