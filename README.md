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

The application includes a `/health` endpoint for verifying the service is running correctly. This endpoint is useful for monitoring systems, container orchestration, and load balancer health checks.

### Accessing the Health Check

```bash
curl http://127.0.0.1:3000/health
```

Or visit `http://127.0.0.1:3000/health` in your browser.

### Response Format

The health check endpoint returns a JSON response:

```json
{
  "status": "ok",
  "timestamp": "2025-11-26T12:00:00.000Z",
  "service": "hello-world-nodejs"
}
```

- **status**: Indicates the service is operational (`"ok"`)
- **timestamp**: ISO 8601 formatted timestamp of the response
- **service**: Service identifier (`"hello-world-nodejs"`)

### Use Cases

- **Monitoring**: Verify the service is operational and responding to requests
- **Container Orchestration**: Configure Kubernetes liveness and readiness probes to check application health
- **Load Balancer Health Checks**: Allow load balancers to verify backend availability before routing traffic

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. The server implements URL-based routing to handle different request paths:

- **`/health`**: Returns a JSON health check response for monitoring and operational verification
- **All other paths (including `/`)**: Returns "Hello World!" as plain text

When a request is received, the server parses the URL path and routes to the appropriate handler, responding with status code 200.

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `Hello_World_Node.js` file if needed. The health check endpoint is available at the fixed path `/health`.

## License

This is a simple example application for learning purposes.
