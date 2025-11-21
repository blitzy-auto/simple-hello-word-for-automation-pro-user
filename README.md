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

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. When a request is received, the server responds with a status code of 200 and sends "Hello World!" as plain text.

## Health Check Endpoint

The application provides a health check endpoint for monitoring and operational verification.

### Accessing the Health Check

Visit the `/health` endpoint:
```
http://127.0.0.1:3000/health
```

Or use curl:
```bash
curl http://127.0.0.1:3000/health
```

### Health Check Response

The endpoint returns a JSON object with the following structure:

```json
{
  "status": "healthy",
  "timestamp": "2025-11-21T21:53:00.000Z",
  "uptime": 123.456,
  "service": "hello-world-nodejs"
}
```

**Response Fields:**

- `status`: Always "healthy" when the server is running and responding
- `timestamp`: Current UTC time in ISO 8601 format
- `uptime`: Number of seconds the Node.js process has been running
- `service`: Identifier for this application

### Use Cases

The health check endpoint can be used for:

- Verifying the service is running and responsive
- Monitoring tools and uptime trackers
- Load balancer health probes
- Container orchestration liveness checks
- Operational dashboards and alerts

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `Hello_World_Node.js` file if needed.

## License

This is a simple example application for learning purposes.
