// Simple Hello World Node.js Application

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // Check if the request is for the health check endpoint
  // This allows monitoring systems to verify the service is running
  if (req.url === '/health') {
    // Health check endpoint - returns JSON with service status metrics
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
    // Create health data object with status, uptime, and timestamp
    // - status: indicates the service is operational
    // - uptime: seconds since the Node.js process started (from process.uptime())
    // - timestamp: current Unix timestamp in milliseconds (from Date.now())
    const healthData = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: Date.now()
    };
    
    res.end(JSON.stringify(healthData));
  } else {
    // Default response for all other paths (including root "/")
    // Returns the classic "Hello World!" message
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
