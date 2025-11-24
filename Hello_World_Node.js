// Simple Hello World Node.js Application

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    // Health check endpoint for monitoring and verification
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const healthCheck = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      message: 'Server is running'
    };
    res.end(JSON.stringify(healthCheck));
  } else {
    // Default response for all other paths
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
