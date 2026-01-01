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

The server includes a health check endpoint for monitoring:

- **URL:** http://127.0.0.1:3000/health
- **Method:** GET
- **Response:** JSON

### Example Response

```json
{
  "status": "ok",
  "uptime": 123.456,
  "timestamp": "2024-01-01T12:00:00.000Z"
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| status | string | Service health status ("ok") |
| uptime | number | Server uptime in seconds |
| timestamp | string | Current server time (ISO 8601) |

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. When a request is received:

1. If the URL path is `/health`, the server responds with a JSON health status
2. For all other paths, the server responds with "Hello World!" as plain text

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `server.js` file if needed.

## License

This is a simple example application for learning purposes.
