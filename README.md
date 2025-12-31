# Hello World Node.js Application

A simple Node.js HTTP server that displays "Hello World!" in the browser and provides a health check endpoint for service monitoring.

## Prerequisites

- Node.js installed on your system (Download from [nodejs.org](https://nodejs.org))

## Installation

No additional packages are required. This application uses only Node.js built-in modules.

## Usage

1. The application code is in the file named `Hello_World_Node.js`

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

7. To verify the health check endpoint, visit:
   ```
   http://127.0.0.1:3000/health
   ```
   
   Or use curl from the command line:
   ```bash
   curl http://127.0.0.1:3000/health
   ```

## Endpoints

The server provides the following HTTP endpoints:

### Root Endpoint (`/`)

- **URL**: `http://127.0.0.1:3000/`
- **Method**: GET
- **Response Type**: `text/plain`
- **Response**: `Hello World!`
- **Status Code**: 200

This is the default endpoint that returns the classic "Hello World!" greeting.

### Health Check Endpoint (`/health`)

- **URL**: `http://127.0.0.1:3000/health`
- **Method**: GET
- **Response Type**: `application/json`
- **Status Code**: 200

The health check endpoint returns a JSON response with information about the server's operational status:

**Response Format:**

```json
{
  "status": "ok",
  "uptime": 123.456,
  "timestamp": 1704067200000
}
```

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Service health status ("ok" when server is running) |
| `uptime` | number | Server uptime in seconds since the process started |
| `timestamp` | number | Current Unix timestamp in milliseconds |

**Example Usage:**

```bash
# Check server health using curl
curl http://127.0.0.1:3000/health

# Pretty-print the JSON response
curl http://127.0.0.1:3000/health | json_pp
```

### All Other Paths

Any request to a path other than `/health` will return the "Hello World!" response, maintaining backward compatibility.

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. When a request is received, the server parses the URL path and routes the request accordingly:

- **`/health` path**: Returns a JSON response containing the server's health status, uptime, and current timestamp. This endpoint is useful for monitoring systems and load balancers to verify the service is operational.
- **All other paths**: Returns the classic "Hello World!" plain text response.

This simple URL-based routing is implemented without any external dependencies, using only the `req.url` property to determine the requested path.

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `Hello_World_Node.js` file if needed.

## License

This is a simple example application for learning purposes.
