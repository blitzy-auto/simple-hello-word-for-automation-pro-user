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

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `server.js` file if needed.

## Health Check Endpoint

The server includes a `/health` endpoint for monitoring and verification purposes.

#### Accessing the Health Check

While the server is running, you can check its health status:

**Using a web browser:**
```
http://127.0.0.1:3000/health
```

**Using curl:**
```bash
curl http://localhost:3000/health
```

#### Response Format

The health check endpoint returns a JSON response with the following structure:

```json
{
  "status": "ok",
  "uptime": 123.456,
  "timestamp": "2024-11-24T12:34:56.789Z",
  "message": "Server is running"
}
```

**Response Fields:**
- `status`: Health status indicator (always "ok" when server is responding)
- `uptime`: Number of seconds the server has been running
- `timestamp`: Current server time in ISO 8601 format
- `message`: Human-readable status message

#### Use Cases

- **Development verification**: Quickly confirm the server started successfully
- **Monitoring integration**: Connect to uptime monitoring services
- **Load balancer health checks**: Configure AWS ALB, ELB, or other load balancers
- **Container orchestration**: Use with Kubernetes liveness/readiness probes

## License

This is a simple example application for learning purposes.
