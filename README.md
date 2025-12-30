# Hello World Node.js Application

A simple Node.js HTTP server that displays "Hello World!" in the browser and includes a health check endpoint for service verification.

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

   Or using npm:
   ```bash
   npm start
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

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. The server uses URL-based routing to handle different endpoints:

- **`/health_check`**: Returns a JSON response with service health status
- **All other paths**: Returns "Hello World!" as plain text

When a request is received, the server checks the URL path and responds with a status code of 200 along with the appropriate content.

## Health Check Endpoint

The `/health_check` endpoint allows you to easily verify that the service is running correctly. This is useful for monitoring systems, load balancers, and operational verification.

### Endpoint Details

- **URL**: `/health_check`
- **Method**: GET
- **Content-Type**: application/json

### Response Format

```json
{
  "status": "healthy",
  "uptime": 123.456,
  "timestamp": 1703961600000,
  "message": "Service is running correctly"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | String | Service operational status ("healthy") |
| `uptime` | Number | Server process uptime in seconds |
| `timestamp` | Number | Current Unix timestamp in milliseconds |
| `message` | String | Human-readable status description |

### Testing the Health Check

Using curl:
```bash
# Basic request
curl http://127.0.0.1:3000/health_check

# With headers displayed
curl -i http://127.0.0.1:3000/health_check

# Pretty-printed JSON (requires jq)
curl -s http://127.0.0.1:3000/health_check | jq .
```

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

Both the main application and the health check endpoint use the same hostname and port configuration. You can modify these values in the `Hello_World_Node.js` file if needed.

## License

This is a simple example application for learning purposes.
