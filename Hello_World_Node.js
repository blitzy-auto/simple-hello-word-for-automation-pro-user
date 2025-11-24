// Simple Hello World Node.js Application

const http = require('http');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  // Parse the incoming request URL to extract the pathname
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Route 1: Root path - return Hello World (preserve backward compatibility)
  if (pathname === '/' || pathname === '') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
  // Route 2: Health check endpoints - return JSON health status
  else if (pathname === '/health' || pathname === '/health_check') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      service: 'hello-world-nodejs'
    }));
  }
  // Route 3: Unknown paths - return 404 error
  else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      error: 'Not Found',
      path: pathname
    }));
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
