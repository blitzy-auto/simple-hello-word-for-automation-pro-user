// Simple Hello World Node.js Application
// With health check endpoint for service verification

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

/**
 * HTTP Server Request Handler
 * Routes requests based on URL path:
 * - /health: Returns JSON health status for service verification
 * - All other paths: Returns "Hello World!" message
 */
const server = http.createServer((req, res) => {
  // Extract the URL path from the incoming request
  const urlPath = req.url;

  // Route based on the URL path
  if (urlPath === '/health') {
    // Health check endpoint - returns JSON with service status information
    const healthStatus = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: Date.now()
    };

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(healthStatus));
  } else {
    // Default route - returns Hello World message (preserves original behavior)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
