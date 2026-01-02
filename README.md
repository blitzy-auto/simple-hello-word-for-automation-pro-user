# Hello World Node.js Application

A simple Node.js HTTP server that displays "Hello World!" in the browser, with a built-in health check endpoint for service monitoring.

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
   Health check available at http://127.0.0.1:3000/health
   ```

5. Open your web browser and visit:
   ```
   http://127.0.0.1:3000
   ```

6. You will see "Hello World!" displayed in your browser

7. To verify the service is running correctly, access the health check endpoint:
   ```bash
   curl http://127.0.0.1:3000/health
   ```

## Endpoints

| Endpoint | Method | Description | Response Type |
|----------|--------|-------------|---------------|
| `/` | GET | Returns a friendly greeting | text/plain |
| `/health` | GET | Returns service health status | application/json |

## Health Check Endpoint

The `/health` endpoint provides a simple way to verify that the service is running correctly and responsive.

### Request

```bash
curl http://127.0.0.1:3000/health
```

### Response

The health check endpoint returns a JSON response with the following structure:

```json
{
  "status": "healthy",
  "uptime": 123.456,
  "timestamp": "2025-01-02T12:00:00.000Z"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Service status indicator. Returns `"healthy"` when the service is operational |
| `uptime` | number | Server uptime in seconds since the process started |
| `timestamp` | string | Current server time in ISO 8601 format |

### HTTP Response

- **Status Code**: `200 OK`
- **Content-Type**: `application/json`

### Use Cases

The health check endpoint is useful for:

- **Service Monitoring**: Integrate with monitoring tools to track service availability
- **Kubernetes Probes**: Use as a liveness probe to verify the container is running
- **Load Balancer Health Checks**: Configure load balancers to route traffic only to healthy instances
- **Deployment Verification**: Quickly verify that a deployment was successful
- **Debugging**: Confirm the server is responsive when troubleshooting issues

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. The server implements URL-based routing to handle different endpoints:

- When a request is received at `/health`, the server responds with a JSON object containing the service status, uptime, and current timestamp
- For all other requests (including the root path `/`), the server responds with a status code of 200 and sends "Hello World!" as plain text

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `Hello_World_Node.js` file if needed.

## License

This is a simple example application for learning purposes.
