# Hello World Node.js Application

A simple Node.js HTTP server that displays "Hello World!" in the browser.

## Prerequisites

- Node.js installed on your system (Download from [nodejs.org](https://nodejs.org))

## Installation

No additional packages are required. This application uses only Node.js built-in modules.

## Usage

1. Save the application code to a file named `Hello_World_Node.js`

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

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. When a request is received, the server responds with a status code of 200 and sends "Hello World!" as plain text.

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `Hello_World_Node.js` file if needed.

## Health Check Endpoint

The server provides a health check endpoint to verify that the service is running correctly.

**Endpoint URL:** `http://127.0.0.1:3000/health`

**HTTP Method:** GET

**Response Format:** JSON

**Response Fields:**

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Service health status ("ok" when running) |
| `uptime` | number | Server uptime in seconds |
| `timestamp` | number | Current timestamp in milliseconds |

**Example Request:**

```bash
curl http://127.0.0.1:3000/health
```

**Example Response:**

```json
{
  "status": "ok",
  "uptime": 123.456,
  "timestamp": 1734567890123
}
```

## License

This is a simple example application for learning purposes.
