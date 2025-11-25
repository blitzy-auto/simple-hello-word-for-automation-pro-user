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

7. The server also provides a health check endpoint at:
   ```
   http://127.0.0.1:3000/health
   ```

### Health Check Endpoint

The application includes a health check endpoint for monitoring and verification:

**Access the health check:**
```bash
curl http://127.0.0.1:3000/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "uptime": 123.45,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

**Response Fields:**
- `status`: Always "ok" when server is running
- `uptime`: Number of seconds the server has been running
- `timestamp`: Current server time in ISO 8601 format

This endpoint can be used by monitoring tools, load balancers, or manual verification.

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. The server implements basic routing to handle different endpoints:

- **/** (root): Responds with "Hello World!" as plain text
- **/health**: Returns server health information in JSON format including status, uptime, and timestamp
- **Other paths**: Returns 404 Not Found

This demonstrates fundamental HTTP server concepts including request routing, multiple content types (text/plain and application/json), and proper HTTP status codes.

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `server.js` file if needed.

**Available Endpoints:**
- Main endpoint: `http://127.0.0.1:3000/`
- Health check: `http://127.0.0.1:3000/health`

## License

This is a simple example application for learning purposes.
