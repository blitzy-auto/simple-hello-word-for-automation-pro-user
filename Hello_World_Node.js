// Simple Hello World Node.js Application

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // Extract the URL path from the incoming request for routing
  const path = req.url;

  // Check if the request is for health check endpoints
  if (path === '/health' || path === '/health_check') {
    // Build health status response object with diagnostic information
    const healthStatus = {
      status: 'OK',
      uptime: process.uptime(),
      timestamp: Date.now(),
      service: 'hello-world-nodejs'
    };

    // Set response headers and status for JSON health check response
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(healthStatus) + '\n');
  } else {
    // Default response: Hello World for all other routes (including root /)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
