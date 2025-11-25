// Simple Hello World Node.js Application with Health Check Endpoint

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // Route handling based on URL path
  if (req.url === '/health') {
    // Health check endpoint - returns JSON with server status
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const healthData = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };
    res.end(JSON.stringify(healthData));
  } else if (req.url === '/') {
    // Original Hello World endpoint - returns plain text
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  } else {
    // 404 handling for undefined routes
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
