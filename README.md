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

The application provides a health check endpoint for monitoring and verification purposes.

### Endpoint Details

- **Path**: `/health` or `/health_check`
- **Method**: GET
- **Response Format**: JSON
- **Status Code**: 200 (when healthy)

### Testing the Health Check

You can test the health check endpoint using curl:

```bash
curl http://127.0.0.1:3000/health
```

### Response Format

The health check returns a JSON object with the following fields:

```json
{
  "status": "ok",
  "timestamp": "2024-01-15T10:30:45.123Z",
  "uptime": 123.456
}
```

- `status`: Service health status (always "ok" when responding)
- `timestamp`: Current server time in ISO 8601 format
- `uptime`: Number of seconds the Node.js process has been running

### Use Cases

- **Monitoring Tools**: Services like Pingdom, New Relic, or Datadog can monitor this endpoint
- **Container Orchestration**: Kubernetes liveness/readiness probes can use this endpoint
- **Load Balancers**: Health checks for traffic routing decisions
- **Deployment Verification**: Confirm service is running after deployment

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. When a request is received, the server responds with a status code of 200 and sends "Hello World!" as plain text.

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `server.js` file if needed.

## License

This is a simple example application for learning purposes.
