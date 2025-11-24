// Simple Hello World Node.js Application

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // Route: Health Check Endpoint
  if (req.url === '/health') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    
    const healthStatus = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: Date.now()
    };
    
    res.end(JSON.stringify(healthStatus));
  } 
  // Route: Default - Hello World
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
