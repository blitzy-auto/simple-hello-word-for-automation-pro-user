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

## Health Check Endpoint

The server includes a health check endpoint for monitoring service availability. This endpoint is useful for load balancers, container orchestration systems, and monitoring tools to verify that the service is running correctly.

### Endpoint URL

```
http://127.0.0.1:3000/health
```

### Testing the Health Check

Use the following command to test the health check endpoint:

```bash
curl http://127.0.0.1:3000/health
```

### Sample Response

The health check returns a JSON response with the following structure:

```json
{
  "status": "ok",
  "uptime": 123.456,
  "timestamp": 1700000000000
}
```

### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `status` | string | Service health status. Returns "ok" when the service is healthy. |
| `uptime` | number | Number of seconds the Node.js process has been running. |
| `timestamp` | number | Current Unix timestamp in milliseconds when the response was generated. |

## Stopping the Server

To stop the server, press `Ctrl+C` in the terminal where the application is running.

## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. When a request is received, the server inspects the URL path to determine how to respond:

- **Root path (`/`)**: Returns "Hello World!" as plain text with a 200 status code
- **Health check path (`/health`)**: Returns a JSON object containing service health metrics
- **Any other path**: Returns "Hello World!" as the default response

The health check response includes:
- **uptime**: Retrieved using `process.uptime()`, which returns the number of seconds the Node.js process has been running
- **timestamp**: Generated using `Date.now()`, which returns the current Unix timestamp in milliseconds

This URL-based routing allows the server to handle multiple types of requests while maintaining the simplicity of a single-file application.

## Configuration

- **Hostname**: 127.0.0.1 (localhost)
- **Port**: 3000
- **Health Check Path**: /health

The health check endpoint uses the same hostname and port as the main service. You can modify the hostname and port values in the `Hello_World_Node.js` file if needed.

## Monitoring Integration

The health check endpoint can be integrated with various monitoring and deployment tools. Below are examples for common use cases.

### Docker Health Check

Add a health check to your Dockerfile:

```dockerfile
FROM node:20-alpine

WORKDIR /app
COPY Hello_World_Node.js .

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3000/health || exit 1

CMD ["node", "Hello_World_Node.js"]
```

### Kubernetes Probes

Configure liveness and readiness probes in your Kubernetes deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello-world-node
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hello-world-node
  template:
    metadata:
      labels:
        app: hello-world-node
    spec:
      containers:
      - name: hello-world-node
        image: your-image:tag
        ports:
        - containerPort: 3000
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
```

### Load Balancer Configuration

**AWS Application Load Balancer (ALB)**:
- Health check path: `/health`
- Healthy threshold: 2
- Unhealthy threshold: 3
- Timeout: 5 seconds
- Interval: 30 seconds

**nginx upstream health check**:
```nginx
upstream backend {
    server 127.0.0.1:3000;
    health_check uri=/health interval=10s;
}
```

**HAProxy backend configuration**:
```haproxy
backend hello_world
    option httpchk GET /health
    server node1 127.0.0.1:3000 check
```

### Manual Monitoring

You can manually check the service health using curl:

```bash
# Check health status
curl http://127.0.0.1:3000/health

# Check with verbose output
curl -v http://127.0.0.1:3000/health

# Check and format JSON output (requires jq)
curl -s http://127.0.0.1:3000/health | jq
```

For automated monitoring, you can use monitoring services like:
- **Uptime Robot**: Configure HTTP(s) monitor pointing to the health endpoint
- **Pingdom**: Set up HTTP check with expected status code 200
- **Datadog**: Create HTTP check monitor for the health endpoint

### Security Considerations

This health check endpoint is designed for simplicity and is suitable for:
- Development and testing environments
- Internal network monitoring
- Trusted infrastructure monitoring

For production deployments with public-facing services, consider:
- Restricting health check endpoint access to internal networks only
- Using a reverse proxy to limit external access to the health endpoint
- Implementing rate limiting to prevent abuse
- Using HTTPS for encrypted communication
- Adding authentication headers for sensitive deployments

## License

This is a simple example application for learning purposes.
