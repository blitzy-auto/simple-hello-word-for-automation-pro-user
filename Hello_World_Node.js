// Simple Hello World Node.js Application

const http = require('http');
const url = require('url'); // URL parsing for routing logic

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // Parse request URL to extract pathname for routing
  const parsedUrl = url.parse(req.url, true);
  
  if (parsedUrl.pathname === '/health_check') {
    // Health check endpoint - returns JSON with server status
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const healthData = {
      status: 'ok',
      uptime: process.uptime(), // Process runtime in seconds
      timestamp: Date.now() // Current time in milliseconds
    };
    res.end(JSON.stringify(healthData));
  } else {
    // Default "Hello World!" response for all other paths
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
