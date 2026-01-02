# Hello World Node.js Application

A simple Node.js HTTP server that displays "Hello World!" in the browser with a health check endpoint for service monitoring.

## Prerequisites

- Node.js installed on your system (Download from [nodejs.org](https://nodejs.org))

## Installation

No additional packages are required. This application uses only Node.js built-in modules.

## Endpoints

| Endpoint | Method | Description | Response |
|----------|--------|-------------|----------|
| `/` | GET | Returns greeting message | `Hello World!` (text/plain) |
| `/health` | GET | Returns JSON health status | `{"status":"healthy","uptime":N,"timestamp":"..."}` (application/json) |

## Usage

1. Navigate to the directory containing `Hello_World_Node.js`

2. Run the application:
   ```bash
   node Hello_World_Node.js
   ```

3. You should see the messages:
   ```
   Server running at http://127.0.0.1:3000/
   Health check available at http://127.0.0.1:3000/health
   ```

4. Open your web browser and visit:
   ```
   http://127.0.0.1:3000
   ```

5. You will see "Hello World!" displayed in your browser

## Health Check Endpoint

The `/health` endpoint provides service status information in JSON format:

```bash
curl http://127.0.0.1:3000/health
```

**Response Format:**
```json
{
  "status": "healthy",
  "uptime": 123.456,
  "timestamp": "2025-01-02T12:00:00.000Z"
}
```

**Response Fields:**
- `status` - Service operational status (always "healthy" when server is running)
- `uptime` - Server uptime in seconds since process start
- `timestamp` - Current server time in ISO 8601 format

**Use Cases:**
- Service monitoring and alerting
- Kubernetes liveness/readiness probes
- Load balancer health checks
- Automated deployment verification

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. It implements URL-based routing to handle different endpoints:

- **Root path (`/`)**: Returns "Hello World!" as plain text
- **Health path (`/health`)**: Returns JSON with service status, uptime, and timestamp
- **All other paths**: Returns "Hello World!" (backward compatible behavior)

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `Hello_World_Node.js` file if needed.

## License

This is a simple example application for learning purposes.
