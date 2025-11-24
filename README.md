# Hello World Node.js Application

A simple Node.js HTTP server that displays "Hello World!" in the browser and provides a health check endpoint for monitoring.

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
   Or use npm:
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

## Health Check Endpoint

The server includes a health check endpoint for monitoring service availability.

### Endpoint URL

```
http://127.0.0.1:3000/health
```

### Purpose

The health check endpoint allows monitoring systems, load balancers, and DevOps teams to verify that the service is running correctly. It returns essential metrics about the server's status.

### Testing the Health Check

Use `curl` to test the health check endpoint:

```bash
curl http://127.0.0.1:3000/health
```

### Sample Response

```json
{
  "status": "ok",
  "uptime": 123.456,
  "timestamp": 1234567890123
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Service health status ("ok" indicates healthy) |
| `uptime` | number | Seconds since the Node.js process started |
| `timestamp` | number | Current Unix timestamp in milliseconds |

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. When a request is received, the server inspects the URL path:

- **`/health`**: Returns a JSON response with server status metrics (status, uptime, timestamp)
- **All other paths** (including `/`): Returns "Hello World!" as plain text

This simple URL-based routing demonstrates how to handle different endpoints in a Node.js HTTP server without external frameworks.

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000
- **Health Endpoint**: /health

You can modify the hostname and port values in the `Hello_World_Node.js` file if needed.

## Monitoring Integration

The health check endpoint can be integrated with various monitoring and deployment tools:

### Docker Health Check

Add a health check to your Dockerfile:

```dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1
```

### Kubernetes Probes

Configure liveness and readiness probes in your Kubernetes deployment:

```yaml
livenessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /health
    port: 3000
  initialDelaySeconds: 5
  periodSeconds: 10
```

### Load Balancer

Configure your load balancer (AWS ALB, nginx, HAProxy) to use `/health` as the health check path to ensure traffic is only routed to healthy instances.

### Manual Monitoring

For simple monitoring, you can use a cron job or monitoring service to periodically check the endpoint:

```bash
# Example: Check every minute using cron
* * * * * curl -sf http://127.0.0.1:3000/health > /dev/null || echo "Service unhealthy"
```

> **Note**: This health check endpoint is designed for internal monitoring and development environments. For production deployments, consider implementing additional security measures such as network restrictions, authentication, or rate limiting.

## License

This is a simple example application for learning purposes.
