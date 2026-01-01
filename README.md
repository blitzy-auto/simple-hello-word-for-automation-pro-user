# Hello World Node.js Application

A simple Node.js HTTP server that displays "Hello World!" in the browser and provides a health check endpoint for service monitoring.

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

The application creates an HTTP server using Node.js's built-in `http` module. The server implements URL routing to handle different request paths:

- **Health Check Route (`/health_check`)**: Returns a JSON response containing service health information including status, uptime, and timestamp.
- **Default Route (all other paths)**: Responds with a status code of 200 and sends "Hello World!" as plain text.

## Health Check Endpoint

The application includes a health check endpoint for easy verification that the service is running correctly.

### Endpoint Details

- **Path**: `/health_check`
- **Method**: GET (responds to all HTTP methods)
- **Content-Type**: `application/json`
- **Status Code**: `200 OK`

### Usage

To check the health of the service, make a request to the health check endpoint:

```bash
curl http://127.0.0.1:3000/health_check
```

### Response Format

The health check endpoint returns a JSON object with the following fields:

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Health status indicator (always `"healthy"` when service is running) |
| `uptime` | number | Server uptime in seconds since the Node.js process started |
| `timestamp` | string | Current server time in ISO 8601 format |

### Sample Response

```json
{
  "status": "healthy",
  "uptime": 123.456,
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `Hello_World_Node.js` file if needed.

## License

This is a simple example application for learning purposes.
