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

## Health Check Endpoint

The server includes a health check endpoint to verify service availability and operational status.

### Accessing the Health Check

Visit the `/health` endpoint to receive service status information:

```bash
curl http://127.0.0.1:3000/health
```

### Health Check Response

The endpoint returns a JSON response with the following structure:

```json
{
  "status": "ok",
  "uptime": 45.123,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Response Fields:**
- `status`: Service health status (always "ok" when server is responsive)
- `uptime`: Number of seconds the server has been running
- `timestamp`: Current server time in ISO 8601 UTC format

### Use Cases

The health check endpoint is useful for:
- Verifying the server is running and responsive
- Monitoring server uptime
- Integration with load balancers and orchestration systems
- Automated health monitoring and alerting

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. When a request is received, the server inspects the URL path:
- Requests to `/health` receive a JSON response with service status information
- All other requests receive "Hello World!" as plain text

Both endpoints respond with a status code of 200 (OK).

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `server.js` file if needed.

## License

This is a simple example application for learning purposes.
