// Simple Hello World Node.js Application with Health Check Endpoint

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

// Create HTTP server with URL-based routing for health check and default responses
const server = http.createServer((req, res) => {
  // Health check endpoint - returns JSON status for monitoring systems
  if (req.url === '/health' || req.url === '/health_check') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
    // Generate health status response with current timestamp
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'hello-world-nodejs'
    };
    
    res.end(JSON.stringify(healthStatus));
  } else {
    // Default response for all other paths - maintains backward compatibility
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});

// Start server and listen on configured hostname and port
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
