// Simple Hello World Node.js Application

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  const path = req.url;
  
  // Health check endpoint for monitoring and service verification
  if (path === '/health' || path === '/healthcheck') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
    const healthData = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };
    
    res.end(JSON.stringify(healthData));
  } else {
    // Default Hello World response for all other paths
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
