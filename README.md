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

7. To access the health check endpoint, visit:
   ```
   http://127.0.0.1:3000/health
   ```
   Or use curl:
   ```bash
   curl http://127.0.0.1:3000/health
   ```

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. The server implements URL-based routing to handle multiple endpoints. When a request is received, the server parses the request URL and routes to the appropriate handler - returning "Hello World!" as plain text for the root path, or JSON health information for the `/health` endpoint.

## Health Check Endpoint

The server includes a health check endpoint at `/health` for operational monitoring and service verification.

### Endpoint Details

- **Path**: `/health`
- **Method**: GET
- **Response Status**: 200 OK
- **Content-Type**: application/json

### Response Format

```json
{
  "status": "ok",
  "uptime": 42.123
}
```

- **status**: Always returns "ok" when the service is running
- **uptime**: Server uptime in seconds (floating-point number from `process.uptime()`)

### Usage Examples

Using curl:
```bash
curl http://127.0.0.1:3000/health
```

Expected output:
```json
{"status":"ok","uptime":42.123456789}
```

### Use Cases

- Load balancer health checks
- Kubernetes liveness/readiness probes
- Monitoring tool integrations
- Manual service verification

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `Hello_World_Node.js` file if needed.

## License

This is a simple example application for learning purposes.
