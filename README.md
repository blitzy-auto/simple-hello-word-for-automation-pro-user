# Hello World Node.js Application

A simple Node.js HTTP server that displays "Hello World!" in the browser.

## Prerequisites

- Node.js installed on your system (Download from [nodejs.org](https://nodejs.org))

## Installation

No additional packages are required. This application uses only Node.js built-in modules.

## Usage

1. Save the application code to a file named `server.js`

2. Open your terminal and navigate to the directory containing `server.js`

3. Run the application:
   ```bash
   node server.js
   ```

4. You should see the message:
   ```
   Server running at http://127.0.0.1:3000/
   ```

5. Open your web browser and visit:
   ```
   http://127.0.0.1:3000
   ```

6. You will see "Hello World!" displayed in your browser

## Health Check Endpoint

The application provides a health check endpoint for monitoring and verification:

```
http://127.0.0.1:3000/health
```

Example using curl:
```bash
curl http://127.0.0.1:3000/health
```

Response format:
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "service": "hello-world-nodejs"
}
```

Both `/health` and `/health_check` paths are supported for maximum compatibility with different monitoring systems.

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module with URL-based routing logic. When a request is received:

- If the request path is `/health` or `/health_check`, the server responds with a JSON health status containing the service status, timestamp, and service identifier
- For all other paths (including the root `/`), the server responds with "Hello World!" as plain text

This routing approach enables monitoring systems to verify service availability while maintaining the original Hello World functionality.

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `server.js` file if needed.

## License

This is a simple example application for learning purposes.
