# Hello World Node.js Application

A simple Node.js HTTP server that displays "Hello World!" in the browser.

## Prerequisites

- Node.js installed on your system (Download from [nodejs.org](https://nodejs.org))

## Installation

No additional packages are required. This application uses only Node.js built-in modules.

## Usage

1. The application code is saved in `Hello_World_Node.js`

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

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. When a request is received, the server examines the requested path and responds accordingly: the `/health` endpoint returns a JSON status response, while all other paths return "Hello World!" as plain text.

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `Hello_World_Node.js` file if needed.

## Health Check Endpoint

The server includes a health check endpoint for monitoring and verification purposes.

### Health Check URL

```
http://127.0.0.1:3000/health
```

### Response Format

The health check endpoint returns a JSON response with the following structure:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "service": "hello-world-nodejs"
}
```

### Testing the Health Check

**Using a Web Browser:**
1. Start the server
2. Navigate to: `http://127.0.0.1:3000/health`
3. You should see the JSON health status response

**Using curl:**
```bash
curl http://127.0.0.1:3000/health
```

**Expected Output:**
```json
{"status":"healthy","timestamp":"2024-11-20T15:30:00.000Z","service":"hello-world-nodejs"}
```

### Use Cases

The health check endpoint is useful for:
- **Monitoring**: Automated monitoring tools can verify service availability
- **Container Orchestration**: Kubernetes and Docker Swarm can use this for readiness/liveness probes
- **Load Balancers**: Health checks to route traffic only to healthy instances
- **CI/CD Pipelines**: Smoke testing after deployment to verify service is running

## License

This is a simple example application for learning purposes.
