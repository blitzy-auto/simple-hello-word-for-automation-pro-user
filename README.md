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

The server includes a health check endpoint at `/health` (or `/healthcheck`) that returns the service status in JSON format. This endpoint is useful for monitoring tools, load balancers, and DevOps verification to ensure the service is running correctly.

### Usage

You can access the health check endpoint using curl:

```bash
curl http://127.0.0.1:3000/health
```

Or open it in your browser:
```
http://127.0.0.1:3000/health
```

### Response Format

The health check endpoint returns a JSON response with the following structure:

```json
{
  "status": "ok",
  "uptime": 23.456,
  "timestamp": "2024-11-24T12:34:56.789Z"
}
```

**Response Fields:**
- **status**: Service health status (always "ok" when the server is running)
- **uptime**: Number of seconds the Node.js process has been running
- **timestamp**: Current UTC timestamp in ISO 8601 format

### Use Cases

The health check endpoint is designed for:
- **Monitoring Tools**: Services like Prometheus, Datadog, or New Relic can poll this endpoint to verify service availability
- **Load Balancers**: AWS ELB/ALB, NGINX, or HAProxy can use this endpoint for health checks before routing traffic
- **Container Orchestration**: Kubernetes liveness and readiness probes can monitor this endpoint
- **DevOps Verification**: Quick verification that the service is running and responding correctly

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. When a request is received, the server inspects the URL path to determine the appropriate response:

- **Health Check Paths** (`/health` or `/healthcheck`): The server responds with a JSON object containing service status information, including the current uptime (from `process.uptime()`) and timestamp (from `new Date().toISOString()`).

- **All Other Paths**: The server responds with a status code of 200 and sends "Hello World!" as plain text, maintaining backward compatibility with the original functionality.

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `Hello_World_Node.js` file if needed.

## License

This is a simple example application for learning purposes.
