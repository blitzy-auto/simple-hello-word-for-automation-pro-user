// Simple Hello World Node.js Application with Health Check Endpoint

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // Health check endpoint for monitoring and verification
  if (req.url === '/health_check') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
    // Build health status response with server information
    const healthData = {
      status: 'ok',
      uptime: process.uptime(), // Seconds since Node.js process started
      timestamp: new Date().toISOString(), // Current time in ISO 8601 format
      message: 'Service is running'
    };
    
    // Send JSON response
    res.end(JSON.stringify(healthData));
  } 
  // Default root endpoint (preserves original behavior)
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
