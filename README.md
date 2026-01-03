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

## Health Check Endpoint

The server includes a health check endpoint for service verification, useful for monitoring systems and load balancers.

### Endpoint Details

- **URL**: `/health`
- **Method**: GET (all HTTP methods accepted)
- **Content-Type**: `application/json`

### Usage

To check if the server is running and healthy:

```bash
curl http://127.0.0.1:3000/health
```

### Response Format

The health endpoint returns a JSON response with the following structure:

```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

**Response Fields:**
- `status`: String indicating the server health status ("healthy")
- `timestamp`: ISO 8601 formatted timestamp of when the health check was performed

### Example Response

```bash
$ curl http://127.0.0.1:3000/health
{"status":"healthy","timestamp":"2024-01-15T10:30:00.123Z"}
```

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000

You can modify these values in the `Hello_World_Node.js` file if needed.

## License

This is a simple example application for learning purposes.
