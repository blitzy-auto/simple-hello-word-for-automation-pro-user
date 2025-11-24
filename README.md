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

7. Test the health check endpoint by visiting:
   ```
   http://127.0.0.1:3000/health
   ```
   You will see a JSON response with the server's status, uptime, and timestamp.

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. When a request is received, the server responds with a status code of 200 and sends "Hello World!" as plain text.

## Health Check Endpoint

The server includes a health check endpoint for monitoring and verifying operational status.

**Endpoint:** `/health` (or `/health_check`)

**Response Format:**

| Field | Type | Description |
|-------|------|-------------|
| status | string | Server status ("ok" when healthy) |
| uptime | number | Seconds since server started |
| timestamp | number | Current Unix timestamp (milliseconds) |

**Example Response:**

```json
{
  "status": "ok",
  "uptime": 125.384,
  "timestamp": 1701234567890
}
```

**Testing:**

```bash
curl http://127.0.0.1:3000/health
```

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `server.js` file if needed.

## License

This is a simple example application for learning purposes.
