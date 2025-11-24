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

6. Test the health check endpoint by visiting:
   ```
   http://127.0.0.1:3000/health
   ```
   
   Or use curl from the terminal:
   ```bash
   curl http://127.0.0.1:3000/health
   ```
   
   You will see a JSON response like:
   ```json
   {
     "status": "ok",
     "uptime": 125.384,
     "timestamp": 1701234567890
   }
   ```

7. You will see "Hello World!" displayed in your browser when visiting the root path

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. When a request is received, the server responds with a status code of 200 and sends "Hello World!" as plain text. The server also includes a health check endpoint for monitoring and verifying operational status.

## Health Check Endpoint

The server includes a health check endpoint that allows you to verify the service is running correctly. This is useful for monitoring tools, load balancers, and ensuring your application is operational.

**Endpoint:** `/health`

**Alternative Endpoint:** `/health_check` (returns the same response)

**Response Format:**

| Field | Type | Description |
|-------|------|-------------|
| status | string | Server status ("ok" when healthy) |
| uptime | number | Seconds since the server process started |
| timestamp | number | Current Unix timestamp in milliseconds |

**Example Response:**

```json
{
  "status": "ok",
  "uptime": 125.384,
  "timestamp": 1701234567890
}
```

**Testing the Health Check:**

Using curl from the terminal:
```bash
curl http://127.0.0.1:3000/health
```

Or simply visit `http://127.0.0.1:3000/health` in your web browser to see the JSON response.

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `server.js` file if needed.

## License

This is a simple example application for learning purposes.
