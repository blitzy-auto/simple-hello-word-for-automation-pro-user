# Hello World Node.js Application

A simple Node.js HTTP server that displays "Hello World!" in the browser with a built-in health check endpoint.

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

The application creates an HTTP server using Node.js's built-in `http` module. When a request is received, the server checks the URL path:

- **`/health`**: Returns a JSON health status with server information
- **All other paths**: Responds with a status code of 200 and sends "Hello World!" as plain text

## Health Check Endpoint

The server provides a health check endpoint for monitoring server status.

### Endpoint

- **Path**: `/health`
- **Method**: GET (or any HTTP method)
- **Response Format**: JSON
- **Content-Type**: `application/json`

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Server status, always "ok" when responding |
| `uptime` | number | Seconds since the server process started |
| `timestamp` | number | Unix timestamp in milliseconds |

### Example Request

```bash
curl http://127.0.0.1:3000/health
```

### Example Response

```json
{
  "status": "ok",
  "uptime": 123.456,
  "timestamp": 1702345678901
}
```

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `Hello_World_Node.js` file if needed.

## License

This is a simple example application for learning purposes.
