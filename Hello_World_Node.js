// Simple Hello World Node.js Application

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  
  // Health check endpoint for service verification
  if (req.url === '/health_check') {
    const healthData = {
      status: 'healthy',
      uptime: process.uptime(),
      timestamp: Date.now(),
      message: 'Service is running correctly'
    };
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(healthData));
  } else {
    // Original Hello World response for all other paths
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
