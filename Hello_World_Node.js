// Simple Hello World Node.js Application

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // Route requests based on URL path
  if (req.url === '/health') {
    // Health check endpoint - returns JSON with server status information
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
    // Build health check response with status, uptime, and timestamp
    const healthData = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };
    
    res.end(JSON.stringify(healthData));
  } else {
    // Default response for all other paths (including root /)
    // Preserves original "Hello World!" behavior for backward compatibility
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
