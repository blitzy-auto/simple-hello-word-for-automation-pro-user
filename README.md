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

6. Verify the health check endpoint:
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

### Health Check Endpoint (`/health`)

- **URL**: `http://127.0.0.1:3000/health`
- **Method**: GET
- **Response Type**: `application/json`
- **Response**: JSON object with service health information

**Example Response:**
```json
{
  "status": "ok",
  "uptime": 123.456,
  "timestamp": 1704067200000
}
```

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Service health status ("ok" when healthy) |
| `uptime` | number | Server uptime in seconds |
| `timestamp` | number | Current Unix timestamp in milliseconds |

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. It implements URL-based routing to handle different endpoints:

- Requests to `/health` return a JSON response with service health information including status, uptime, and timestamp
- All other requests return "Hello World!" as plain text

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `Hello_World_Node.js` file if needed.

## License

This is a simple example application for learning purposes.
