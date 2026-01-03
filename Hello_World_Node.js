// Simple Hello World Node.js Application

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // Health check endpoint for service verification
  if (req.url === '/health') {
    // Return JSON health status with current timestamp
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString()
    };
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(healthStatus));
  } else {
    // Default response for all other paths - preserves backward compatibility
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
