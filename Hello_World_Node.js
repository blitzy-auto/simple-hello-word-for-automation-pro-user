// Simple Hello World Node.js Application

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // Check if the request is for the health check endpoint
  if (req.url === '/health') {
    // Build health check response object with service status information
    const healthcheck = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: Date.now(),
      message: 'Server is running'
    };
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(healthcheck));
  } else {
    // Default response for all other paths - preserve original Hello World behavior
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  console.log(`Health check available at http://${hostname}:${port}/health`);
});
