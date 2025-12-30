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

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. When a request is received, the server responds with a status code of 200 and sends "Hello World!" as plain text.

## Health Check

The application includes a health check endpoint for monitoring service status. This endpoint allows operators, monitoring systems, and load balancers to programmatically verify that the service is running correctly.

### Endpoint Details

| Property | Value |
|----------|-------|
| **URL** | `/health` |
| **Method** | GET (or any HTTP method) |
| **Response** | JSON |
| **Content-Type** | `application/json` |

### Example Usage

```bash
curl http://127.0.0.1:3000/health
```

### Example Response

```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "uptime": 3600.5,
  "service": "hello-world-nodejs"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Current health status of the service. Returns `"healthy"` when the service is operational. |
| `timestamp` | string | Current server time in ISO 8601 format (e.g., `"2024-01-15T10:30:00.000Z"`). |
| `uptime` | number | Number of seconds the server has been running since it started. |
| `service` | string | Service identifier, always `"hello-world-nodejs"` for this application. |

### Backward Compatibility

The health check endpoint is additive and does not affect existing functionality. The root path (`/`) and all other paths continue to return the "Hello World!" response as before:

```bash
# Root path still returns Hello World!
curl http://127.0.0.1:3000/
# Output: Hello World!

# Any other path also returns Hello World!
curl http://127.0.0.1:3000/anything
# Output: Hello World!
```

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `server.js` file if needed.

## License

This is a simple example application for learning purposes.
