# Hello World Node.js Application

A simple Node.js HTTP server that displays "Hello World!" in the browser and provides a health check endpoint for service verification.

## Prerequisites

- Node.js installed on your system (Download from [nodejs.org](https://nodejs.org))

## Installation

No additional packages are required. This application uses only Node.js built-in modules.

## Usage

1. Open your terminal and navigate to the directory containing `Hello_World_Node.js`

2. Run the application:
   ```bash
   node Hello_World_Node.js
   ```
   Or using npm:
   ```bash
   npm start
   ```

3. You should see the message:
   ```
   Server running at http://127.0.0.1:3000/
   ```

4. Open your web browser and visit:
   ```
   http://127.0.0.1:3000
   ```

5. You will see "Hello World!" displayed in your browser

6. To verify the service health, visit:
   ```
   http://127.0.0.1:3000/health
   ```
   Or use curl:
   ```bash
   curl http://127.0.0.1:3000/health
   ```

## Endpoints

| Method | Path | Response Type | Description |
|--------|------|---------------|-------------|
| GET | `/` | text/plain | Returns "Hello World!" message |
| GET | `/health` | application/json | Returns service health status |
| GET | `/*` | text/plain | Any other path returns "Hello World!" |

### Health Check Endpoint

The `/health` endpoint returns a JSON response with the following structure:

```json
{
  "status": "ok",
  "uptime": 123.456,
  "timestamp": 1704067200000
}
```

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Service status indicator ("ok" when running) |
| `uptime` | number | Server uptime in seconds since process start |
| `timestamp` | number | Current Unix timestamp in milliseconds |

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. When a request is received, the server uses URL path routing to determine the appropriate response:

1. **Health Check Route (`/health`)**: Returns a JSON object containing service health information including status, uptime, and current timestamp. This is checked first for fast response times.

2. **Default Route (all other paths)**: Returns "Hello World!" as plain text with HTTP 200 status.

This routing approach follows the "first and final" pattern, where the health check is evaluated first to ensure quick responses for monitoring systems.

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `Hello_World_Node.js` file if needed.

## License

This is a simple example application for learning purposes.
