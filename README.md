# Hello World Node.js Application

A simple Node.js HTTP server that displays "Hello World!" in the browser.

## Prerequisites

- Node.js installed on your system (Download from [nodejs.org](https://nodejs.org))

## Installation

No additional packages are required. This application uses only Node.js built-in modules.

## Usage

1. Save the application code to a file named `Hello_World_Node.js`

2. Open your terminal and navigate to the directory containing `Hello_World_Node.js`

3. Run the application:
   ```bash
   node Hello_World_Node.js
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

The application includes a health check endpoint for monitoring and status verification:

**Endpoint:** `GET /health_check`

**Response:** JSON object with server status information
```json
{
  "status": "ok",
  "uptime": 45.678,
  "timestamp": 1701234567890
}
```

**Usage Examples:**

Using curl:
```bash
curl http://127.0.0.1:3000/health_check
```

Or open in your browser:
```
http://127.0.0.1:3000/health_check
```

This endpoint is useful for automated monitoring systems, container orchestrators, and DevOps tooling to verify the service is operational.

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` and `url` modules. When a request is received, the server parses the URL to determine the requested path and routes the request accordingly:

- **`/health_check` path**: Returns a JSON response with server status, process uptime, and current timestamp
- **All other paths** (including `/`): Returns "Hello World!" as plain text

This demonstrates basic URL-based routing using only Node.js built-in capabilities.

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000
- **Available Endpoints**: 
  - `/` - Main "Hello World!" endpoint
  - `/health_check` - Health check status endpoint

You can modify these values in the `Hello_World_Node.js` file if needed.

## License

This is a simple example application for learning purposes.
