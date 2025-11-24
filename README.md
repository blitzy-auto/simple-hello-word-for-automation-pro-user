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

7. To test the health check endpoint, open your browser and visit:
   ```
   http://127.0.0.1:3000/health
   ```
   You will see a JSON response showing the server's health status.

## Health Check Endpoint

The application includes a dedicated health check endpoint for monitoring and operational verification.

### Endpoint Specification

- **URL**: `http://127.0.0.1:3000/health`
- **HTTP Method**: GET
- **Response Format**: JSON
- **Status Code**: 200 OK

### Response Fields

The health check endpoint returns a JSON object with the following fields:

- **status**: String indicating service health ("ok" when operational)
- **uptime**: Number of seconds the Node.js process has been running (floating-point number)
- **timestamp**: Unix timestamp in milliseconds (integer representing current time)

### Testing the Health Check

You can test the health check endpoint using your browser or command-line tools:

**Using a web browser:**
```
http://127.0.0.1:3000/health
```

**Using curl:**
```bash
curl http://127.0.0.1:3000/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "uptime": 42.567,
  "timestamp": 1732435200000
}
```

### Use Cases

The health check endpoint is designed for:

- **Operational Verification**: Confirming the server is running and responsive
- **Monitoring Tool Integration**: Enabling automated health check polling by monitoring systems
- **Load Balancer Health Checks**: Supporting health verification in production deployments (future use)

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. When a request is received, the server inspects the URL path to determine the appropriate response:

- **Health Check Route** (`/health`): Returns a JSON response containing service health status, including uptime information from `process.uptime()` and a timestamp from `Date.now()`.
- **Default Route** (all other paths): Responds with a status code of 200 and sends "Hello World!" as plain text.

This simple routing logic allows the server to provide both operational monitoring capabilities and the original "Hello World!" functionality.

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `server.js` file if needed.

## License

This is a simple example application for learning purposes.
