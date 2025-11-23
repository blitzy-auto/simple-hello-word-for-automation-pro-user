# Hello World Node.js Application

A simple Node.js HTTP server that displays "Hello World!" in the browser.

## Prerequisites

- Node.js installed on your system (Download from [nodejs.org](https://nodejs.org))

## Installation

No additional packages are required. This application uses only Node.js built-in modules.

## Usage

1. Open your terminal and navigate to the directory containing `Hello_World_Node.js`

2. Run the application using npm:
   ```bash
   npm start
   ```

   Or run directly with Node.js:
   ```bash
   node Hello_World_Node.js
   ```

3. You should see the message:
   ```
   Server running at http://127.0.0.1:3000/
   ```

4. Open your web browser and visit:
   ```
   http://127.0.0.1:3000
   ```

5. You will see "Hello World!" displayed in your browser

## Health Check Endpoint

The application provides a health check endpoint for monitoring and operational purposes.

### Accessing the Health Check

Send a GET request to the `/health` endpoint:

```bash
curl http://127.0.0.1:3000/health
```

### Expected Response

The health check returns a JSON response with HTTP status 200:

```json
{
  "status": "healthy",
  "timestamp": "2024-11-23T12:34:56.789Z"
}
```

The `timestamp` field indicates when the health check was performed in ISO 8601 format.

### Use Cases

- Verifying the service is running and accepting requests
- Load balancer health checks
- Container orchestration readiness probes
- Monitoring system integration

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. The server implements basic routing based on the request URL path:

- Requests to `/` (root path) respond with "Hello World!" as plain text
- Requests to `/health` respond with a JSON health status object
- All other requests respond with a 404 Not Found status

When a request is received, the server checks the URL path and responds accordingly with the appropriate status code, headers, and content.

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `Hello_World_Node.js` file if needed.

## License

This is a simple example application for learning purposes.
