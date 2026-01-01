# Hello World Node.js Application

A Hello World Node.js HTTP server with health check endpoint. This simple application demonstrates URL-based routing and returns both plain text and JSON responses.

## Prerequisites

- Node.js installed on your system (Download from [nodejs.org](https://nodejs.org))

## Installation

No additional packages are required. This application uses only Node.js built-in modules.

## Usage

1. Navigate to the directory containing `Hello_World_Node.js`

2. Run the application:
   ```bash
   node Hello_World_Node.js
   ```
   Or use npm:
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

## Endpoints

| Endpoint | Method | Response Type | Description |
|----------|--------|---------------|-------------|
| `/` | GET | text/plain | Returns "Hello World!" |
| `/health` | GET | application/json | Returns health status information |
| `/health_check` | GET | application/json | Returns health status information |
| `/*` (any other) | GET | text/plain | Returns "Hello World!" |

## Health Check

To verify the service is running correctly, you can access the health check endpoint:

```bash
curl http://127.0.0.1:3000/health
```

### Health Check Response Format

The health check endpoints (`/health` and `/health_check`) return a JSON response with the following structure:

```json
{
  "status": "OK",
  "uptime": 123.456,
  "timestamp": 1704067200000,
  "service": "hello-world-nodejs"
}
```

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Service health status ("OK" when running) |
| `uptime` | number | Server uptime in seconds since start |
| `timestamp` | number | Current Unix timestamp in milliseconds |
| `service` | string | Service identifier |

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. The server implements URL-based routing:

1. **Health Check Routes** (`/health` and `/health_check`): Returns JSON response with service health status, uptime, timestamp, and service name
2. **All Other Routes** (including `/`): Returns "Hello World!" as plain text

All responses return HTTP status code 200 with appropriate Content-Type headers (`application/json` for health checks, `text/plain` for Hello World).

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `Hello_World_Node.js` file if needed.

## License

This is a simple example application for learning purposes.
