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

7. Test the health check endpoint (optional):
   ```bash
   curl http://127.0.0.1:3000/health
   ```

   or visit in your browser:
   ```
   http://127.0.0.1:3000/health
   ```

8. You will see a JSON response with server health information:
   ```json
   {
     "status": "ok",
     "uptime": 123.456,
     "timestamp": "2024-01-01T12:00:00.000Z"
   }
   ```

   - `status`: Always returns "ok" when server is running
   - `uptime`: Number of seconds the server has been running
   - `timestamp`: Current server time in ISO 8601 format

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. When a request is received, the server inspects the request URL:

- **Health Check Path (`/health`)**: Returns a JSON response containing server status, uptime (seconds since startup), and current timestamp. This endpoint enables monitoring systems to verify the server is operational.

- **All Other Paths**: Returns "Hello World!" as plain text with a 200 status code, maintaining the simple "Hello World" behavior.

The server uses `process.uptime()` to track how long it has been running and `JSON.stringify()` to format health check responses.

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `server.js` file if needed.

## License

This is a simple example application for learning purposes.
