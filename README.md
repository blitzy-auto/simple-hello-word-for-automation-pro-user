# Hello World Node.js Application

A Hello World Node.js HTTP server with health check endpoint for easy service verification.

## Prerequisites

- Node.js installed on your system (Download from [nodejs.org](https://nodejs.org))
- Node.js version 14.0.0 or higher recommended

## Installation

No additional packages are required. This application uses only Node.js built-in modules.

## Endpoints

The server provides the following HTTP endpoints:

| Endpoint | Method | Content-Type | Response |
|----------|--------|--------------|----------|
| `/` | GET | `text/plain` | "Hello World!" |
| `/health` | GET | `application/json` | JSON health status |
| `/health_check` | GET | `application/json` | JSON health status |
| `/*` (any other path) | GET | `text/plain` | "Hello World!" |

### Health Check

The health check endpoints (`/health` and `/health_check`) allow you to verify that the service is running correctly. These endpoints are useful for:

- Kubernetes liveness and readiness probes
- Load balancer health verification
- Monitoring and uptime tracking
- CI/CD deployment verification

#### Health Check Response Format

The health check endpoints return a JSON response with the following structure:

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
| `status` | String | Service health status ("OK" when healthy) |
| `uptime` | Number | Server uptime in seconds since process started |
| `timestamp` | Number | Current Unix timestamp in milliseconds |
| `service` | String | Service identifier name |

#### Example Health Check Requests

Using curl:

```bash
# Check health status
curl http://127.0.0.1:3000/health

# Alternative health check path
curl http://127.0.0.1:3000/health_check

# With headers displayed
curl -i http://127.0.0.1:3000/health
```

Expected response:

```
HTTP/1.1 200 OK
Content-Type: application/json

{"status":"OK","uptime":45.123,"timestamp":1704067200000,"service":"hello-world-nodejs"}
```

## Usage

1. Save the application code to a file named `Hello_World_Node.js`

2. Open your terminal and navigate to the directory containing `Hello_World_Node.js`

3. Run the application:
   ```bash
   node Hello_World_Node.js
   ```

   Or using npm:
   ```bash
   npm start
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

7. Verify the service is running correctly by checking the health endpoint:
   ```bash
   curl http://127.0.0.1:3000/health
   ```

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. The server implements URL-based routing to handle different endpoints:

1. **URL Path Extraction**: When a request is received, the server extracts the URL path from `req.url`

2. **Route Matching**: The server checks if the path matches `/health` or `/health_check`

3. **Health Check Response**: For health check endpoints, the server responds with:
   - HTTP status code 200
   - Content-Type: `application/json`
   - JSON body containing service health information (status, uptime, timestamp, service name)

4. **Hello World Response**: For all other paths (including `/`), the server responds with:
   - HTTP status code 200
   - Content-Type: `text/plain`
   - Body: "Hello World!"

This routing approach maintains backward compatibility while adding health check functionality for service verification.

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `Hello_World_Node.js` file if needed.

## API Reference

### GET /

Returns a plain text "Hello World!" message.

**Response:**
- Status: `200 OK`
- Content-Type: `text/plain`
- Body: `Hello World!`

### GET /health

Returns JSON health status information.

**Response:**
- Status: `200 OK`
- Content-Type: `application/json`
- Body:
  ```json
  {
    "status": "OK",
    "uptime": <number>,
    "timestamp": <number>,
    "service": "hello-world-nodejs"
  }
  ```

### GET /health_check

Alternative endpoint for health status (same response as `/health`).

**Response:**
- Status: `200 OK`
- Content-Type: `application/json`
- Body: Same as `/health`

## License

This is a simple example application for learning purposes.
