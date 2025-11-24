# Technical Specification

# 0. Agent Action Plan

## 0.1 Intent Clarification

### 0.1.1 Core Feature Objective

Based on the prompt, the Blitzy platform understands that the new feature requirement is to add a health check endpoint to the existing Node.js HTTP server application. Specifically:

- **Primary Requirement**: Implement a `/health` endpoint that allows external monitoring systems, load balancers, and development teams to verify that the Node.js HTTP server is running correctly and capable of handling requests

- **Implicit Requirements Detected**:
  - The health check endpoint must be distinct from the existing "Hello World" endpoint to avoid interfering with the educational purpose of the application
  - The endpoint should follow established Kubernetes and cloud-native conventions for health checking (liveness/readiness probes)
  - The implementation must maintain the project's zero-dependency philosophy and educational simplicity
  - The endpoint should respond quickly (<10ms) to avoid timeout issues with monitoring systems
  - The response should include actionable information such as server status, uptime, and timestamp

- **Feature Dependencies and Prerequisites**:
  - No external dependencies required - implementation will use only Node.js built-in modules (`http`, `process`)
  - Requires modification to existing request handler logic to implement routing (distinguishing between `/health` and other paths)
  - Documentation updates needed in README.md to explain the new endpoint and its usage
  - Package.json updates may be needed to reflect new capabilities in the description

### 0.1.2 Special Instructions and Constraints

**Architectural Requirements**:
- Maintain **zero-dependency architecture**: The health check implementation must not introduce any npm packages, preserving the project's educational simplicity as documented in Technical Specification Section 3.4
- Follow **minimal code philosophy**: Keep additional code under 10 lines to maintain comprehensibility, aligning with the <20 line success criteria in Technical Specification Section 1.2.3
- Preserve **localhost-only binding**: Continue binding exclusively to 127.0.0.1:3000 as specified in Technical Specification Section 5.1.1
- Maintain **CommonJS module system**: Use `require()` syntax rather than ES modules to ensure compatibility with Node.js >=14.0.0

**Integration Requirements**:
- Implement **path-based routing** to differentiate between `/health` endpoint and the existing catch-all "Hello World" response
- Ensure the health check endpoint does **not break existing functionality** - all non-health paths should continue returning "Hello World!"
- The health check must execute **synchronously** without async/await to maintain the educational simplicity demonstrated in the current codebase

**Response Format Requirements**:
- Return HTTP **200 OK status** when server is healthy
- Set **Content-Type to application/json** for structured monitoring tool consumption
- Include in response body:
  - `status`: String indicating health ("ok" or "healthy")
  - `uptime`: Number of seconds the server has been running (using `process.uptime()`)
  - `timestamp`: ISO 8601 formatted current timestamp
  - `message`: Human-readable status description

**Best Practice Alignment**:
Based on web search research, the implementation should follow Node.js Reference Architecture recommendations that emphasize minimal implementations without external dependencies, as documented in research findings that state "It's best to stick with a minimal implementation for most cases."

### 0.1.3 Technical Interpretation

These feature requirements translate to the following technical implementation strategy:

- **To implement path-based routing**, we will **modify** the existing request handler in `Hello_World_Node.js` (lines 8-12) to inspect `req.url` and conditionally generate different responses based on the requested path

- **To create the /health endpoint**, we will **add** conditional logic that checks if `req.url === '/health'` and when true, returns a JSON response containing server health metrics using `process.uptime()` and `new Date().toISOString()`

- **To preserve the existing "Hello World" behavior**, we will **wrap** the current response generation (lines 9-11) in an else block that executes for all non-health paths, ensuring backward compatibility

- **To maintain zero dependencies**, we will **utilize** only Node.js built-in APIs: `req.url` for path inspection, `process.uptime()` for uptime calculation, `JSON.stringify()` for response serialization, and standard `res` methods for HTTP response generation

- **To provide comprehensive documentation**, we will **update** `README.md` to include a new section describing the health check endpoint, its response format, example usage with curl, and integration guidance for monitoring tools

- **To reflect new capabilities**, we will **modify** `package.json` description field to mention health check functionality, and potentially add a "keywords" entry for "health-check" to improve discoverability

The implementation will transform the current single-response server into a path-aware server with two distinct endpoints while maintaining the project's educational focus and zero-complexity mandate.

## 0.2 Repository Scope Discovery

### 0.2.1 Comprehensive File Analysis

**Existing Files Requiring Modification**:

| File Path | Current State | Modification Required | Purpose |
|-----------|---------------|----------------------|---------|
| `Hello_World_Node.js` | 17 lines, single request handler returning "Hello World!" | Add URL path inspection and conditional response logic (lines 8-12) | Implement health check endpoint while preserving existing functionality |
| `README.md` | Documents single endpoint behavior, manual verification workflow | Add health check endpoint documentation section after line 34 | Explain new endpoint usage, response format, and monitoring integration |
| `package.json` | Description: "A simple Hello World Node.js HTTP server application" | Update description field to mention health check capability | Reflect expanded functionality in package metadata |

**Integration Point Discovery**:

The current architecture has a single integration point that requires modification:

- **Request Handler (Hello_World_Node.js, line 8)**: Currently processes all HTTP requests identically with `(req, res) => { ... }` callback
  - **Modification Needed**: Add conditional logic based on `req.url` property to route requests
  - **Affected Logic**: Lines 8-12 must be restructured from sequential response generation to conditional branching
  - **Integration Pattern**: Implement if-else structure: `if (req.url === '/health') { /* health response */ } else { /* existing Hello World response */ }`

**Files NOT Requiring Modification**:

- **server.listen() block (lines 14-16)**: No changes needed - server initialization and port binding remain unchanged
- **Module imports (line 3)**: No additional modules required - `http` module sufficient for implementation
- **Configuration constants (lines 5-6)**: hostname and port values remain static

### 0.2.2 Web Search Research Conducted

Based on comprehensive web search, the following best practices were identified for Node.js health check endpoint implementation:

**Key Research Findings**:

1. <cite index="1-1">**Uptime Metric Using process.uptime()**: "The process.uptime() method is an built in API of the process module which is used to get the number of seconds the Node.js process has been running."</cite>

2. <cite index="2-18">**Common Health Check Metrics**: Research indicates health checks should verify "the response time of the server, the uptime of the server, the status code of the server (as long as it is 200, we are going to get an 'OK' message), and the timestamp of the server."</cite>

3. <cite index="4-1,4-2">**Endpoint Naming Conventions**: "We recommend that you use consistent naming for your endpoints across micro-services. /readyz and /livez are common choices for the endpoints for the readiness and liveness probes, respectively."</cite>

4. <cite index="4-11,4-12,4-13">**Minimal Implementation Recommendation**: "We don't recommend the use of a module to add health checks to your application. It's best to stick with a minimal implementation for most cases. The tradeoff between the amount of code you need to add to your application for a minimal implementation versus the costs of adding a new dependency leads us to recommend adding the code directly."</cite>

5. **Simple Health Check Pattern for Educational Projects**: Given this is an educational project with zero dependencies, research confirms a basic endpoint returning status 200 with uptime information is industry-standard and sufficient for monitoring purposes

**Implementation Approach Selection**:

Based on research and project constraints, the implementation will use:
- Simple `/health` endpoint (rather than separate `/livez` and `/readyz`) appropriate for single-process educational application
- JSON response format with `status`, `uptime`, and `timestamp` fields
- Direct implementation without external packages (following Node.js Reference Architecture guidance)
- HTTP 200 status code for successful health checks

### 0.2.3 New File Requirements

**No New Files Required**:

This feature addition does **not** require creating any new files. All implementation will be contained within existing files:

- **Source Files**: Modifications to `Hello_World_Node.js` only (no new JavaScript files)
- **Test Files**: Per Technical Specification Section 6.6.1.1, automated testing is explicitly out-of-scope; manual verification via browser and curl will be documented in README.md
- **Configuration Files**: No new configuration needed; existing `package.json` structure sufficient with minor description update
- **Documentation Files**: Updates to existing `README.md` only

**Rationale for No New Files**:

The project's architecture principle of "minimal single-component pattern" (Technical Specification Section 5.1.1) and educational simplicity mandate dictates keeping all functionality in a single file. Creating separate modules for health check logic would contradict the zero-complexity philosophy and the <20 line of code success criterion.

## 0.3 Dependency Inventory

### 0.3.1 Private and Public Packages

**Current Dependency Status**: Zero external dependencies

| Registry | Package Name | Version | Purpose | Change Type |
|----------|-------------|---------|---------|-------------|
| N/A | None | N/A | Project uses only Node.js built-in modules | No changes |

**Node.js Built-in Modules Utilized**:

| Module | Current Usage | Health Check Usage | Version |
|--------|---------------|-------------------|---------|
| `http` | Creating HTTP server, handling requests/responses | Continue using for request URL inspection and JSON response generation | Built-in to Node.js >=14.0.0 |
| `process` | Not currently used | NEW: `process.uptime()` for server uptime metrics | Built-in to Node.js >=14.0.0 |

**Validation of Node.js Version Compatibility**:

The health check implementation requires only APIs available in Node.js 14.0.0+:
- `process.uptime()`: Available since Node.js 0.5.0 (stable across all supported versions)
- `req.url`: Standard IncomingMessage property (stable since Node.js 0.1.90)
- `JSON.stringify()`: JavaScript built-in (ECMAScript 5.1+, universally supported)
- `Date.prototype.toISOString()`: JavaScript built-in (ECMAScript 5.1+, universally supported)

**Zero Dependency Philosophy Maintained**:

Per Technical Specification Section 3.4 "Open Source Dependencies" and Section 1.2.3 success criteria emphasizing simplicity, this implementation intentionally avoids packages such as:
- ❌ `express`: Popular web framework, but adds ~50 dependencies and contradicts zero-dependency mandate
- ❌ `express-healthcheck`: Dedicated health check middleware, but introduces external dependency
- ❌ `@hmcts/nodejs-healthcheck`: Comprehensive health check library with advanced features, but violates simplicity principle
- ❌ `lightship`: Kubernetes-native health check solution, but requires installation and adds complexity

The decision to use only built-in Node.js modules aligns with project philosophy and research findings that recommend direct implementation for simple use cases.

### 0.3.2 Dependency Updates

**Import Statement Changes**:

No import modifications required in `Hello_World_Node.js`:
- **Line 3** (`const http = require('http');`): Remains unchanged
- **No new require() statements**: `process` module is a global object, automatically available without explicit import

**Configuration File Updates**:

**package.json Modifications**:
- **Description field (line 4)**: Update from "A simple Hello World Node.js HTTP server application" to "A simple Hello World Node.js HTTP server application with health check endpoint"
- **Keywords field (lines 10-14)**: Add "health-check" to existing keywords array for improved npm discoverability
- **No dependency additions**: `dependencies` and `devDependencies` remain absent
- **No script changes**: `start` and `dev` scripts continue executing `node server.js` (note: filename mismatch with `Hello_World_Node.js` persists as documented in Technical Specification Section summary)

**External Reference Updates**:

- **README.md**: Major content addition to document new `/health` endpoint (detailed in Section 0.5.2)
- **No CI/CD configuration**: Per Technical Specification Section 3.7.4.1, no GitHub Actions, GitLab CI, or other automation configured
- **No environment variables**: Health check requires no configuration; operates with zero external settings

**Version Control Considerations**:

No `.gitignore`, `package-lock.json`, or `node_modules/` changes required since no dependencies are being added.

## 0.4 Integration Analysis

### 0.4.1 Existing Code Touchpoints

**Direct Modifications Required**:

**Hello_World_Node.js - Request Handler Logic (Lines 8-12)**:

Current implementation (monolithic response):
```javascript
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});
```

Required transformation (conditional routing):
- **Line 8**: Request handler callback signature remains `(req, res) => { ... }` but body must implement conditional logic
- **Lines 9-11**: Wrap existing response generation in else block to preserve backward compatibility
- **New conditional branch**: Add if statement checking `req.url === '/health'` before existing logic
- **Estimated lines**: 8-10 additional lines of code (total file size ~25-27 lines, within educational simplicity tolerance)

Transformation approach:
- Preserve exact existing behavior for all non-`/health` paths (GET /, POST /api, PUT /data all continue returning "Hello World!")
- Add minimal routing logic without introducing framework abstractions
- Maintain synchronous execution model for educational clarity

**package.json - Metadata Update (Line 4)**:

Current state:
```json
"description": "A simple Hello World Node.js HTTP server application",
```

Required modification:
```json
"description": "A simple Hello World Node.js HTTP server application with health check endpoint",
```

- **Location**: Line 4 of package.json
- **Change Type**: String value extension
- **Impact**: Improves package discoverability and accurately describes capabilities

**package.json - Keywords Update (Lines 10-14)**:

Current keywords array:
```json
"keywords": [
  "hello-world",
  "nodejs",
  "http-server",
  "example"
],
```

Required modification:
```json
"keywords": [
  "hello-world",
  "nodejs",
  "http-server",
  "example",
  "health-check"
],
```

- **Addition**: "health-check" keyword for npm search optimization
- **Impact**: Enables discovery by developers searching for Node.js health check examples

### 0.4.2 Dependency Injection Points

**No Dependency Injection Required**:

The current architecture does not use dependency injection patterns. All functionality is self-contained within the single-file implementation:

- **No service containers**: Application does not implement inversion of control or service registration
- **No configuration injection**: Server configuration (hostname, port) uses hardcoded constants (lines 5-6)
- **No external service integration**: Per Technical Specification Section 5.1.4, system operates in "complete isolation with zero external integrations"

The health check feature follows the same self-contained pattern, requiring no infrastructure for dependency management.

### 0.4.3 Database/Schema Updates

**No Database Modifications Required**:

Per Technical Specification Section 1.3.2.1 "Out-of-Scope" and Section 6.6.3.2.3, this project explicitly excludes database connectivity:

- **No database**: Application maintains completely stateless operation with no databases, caches, or persistent storage
- **No migrations**: No database schema changes, no migration files, no ORM models
- **No data persistence**: Health check endpoint reports ephemeral runtime metrics only (uptime resets on process restart)

The health check implementation queries only in-memory process state via `process.uptime()`, requiring no persistent storage layer.

### 0.4.4 API Endpoint Integration

**New Endpoint Definition**:

| Property | Value |
|----------|-------|
| **Path** | `/health` |
| **HTTP Methods** | All (GET, POST, PUT, DELETE, etc.) - endpoint responds identically to all methods |
| **Request Parameters** | None - endpoint accepts no query parameters, request body, or headers |
| **Response Status** | 200 OK (when server is healthy) |
| **Response Content-Type** | `application/json` |
| **Response Body Schema** | `{ "status": "ok", "uptime": <seconds>, "timestamp": "<ISO8601>", "message": "Server is running" }` |
| **Authentication** | None - endpoint is unauthenticated (acceptable for localhost-only deployment) |
| **Rate Limiting** | None - monitoring tools may poll frequently without restrictions |

**Existing Endpoint Preservation**:

| Property | Value |
|----------|-------|
| **Path** | All paths except `/health` (/, /api, /foo, etc.) |
| **Behavior** | **UNCHANGED** - continues returning "Hello World!\n" with Content-Type: text/plain |
| **HTTP Methods** | All methods continue working identically |
| **Backward Compatibility** | 100% preserved - no breaking changes to existing behavior |

**Integration with Monitoring Systems**:

The `/health` endpoint is designed for integration with:
- **Manual verification**: curl, wget, browser testing during development
- **Uptime monitoring services**: Hyperping, UptimeRobot, Pingdom, StatusCake
- **Container orchestration**: Kubernetes liveness/readiness probes (if deployment evolves)
- **Load balancers**: AWS ALB, AWS ELB, NGINX health checks
- **Internal monitoring**: Custom monitoring scripts, Prometheus exporters

**No Breaking Changes**:

Critical consideration: The addition of the `/health` endpoint is **non-breaking** for existing users:
- Existing applications calling the server at http://localhost:3000/ receive identical "Hello World!" response
- No changes to default behavior, status codes, or response format for non-health paths
- Server initialization, port binding, and shutdown behavior remain unchanged

## 0.5 Technical Implementation

### 0.5.1 File-by-File Execution Plan

**Group 1 - Core Feature Implementation**:

**MODIFY: Hello_World_Node.js (Lines 8-12)**

**Current Implementation**:
```javascript
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});
```

**New Implementation** (add URL routing logic):
```javascript
const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const healthCheck = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
      message: 'Server is running'
    };
    res.end(JSON.stringify(healthCheck));
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});
```

**Modification Details**:
- Add conditional `if (req.url === '/health')` to inspect request path
- Health check branch sets `Content-Type: application/json` and returns structured response
- Else branch preserves original "Hello World!" functionality
- Health check response includes `process.uptime()` for runtime metrics
- Response uses `JSON.stringify()` for automatic serialization
- Code addition: approximately 10 lines (final file size ~27 lines)

**Group 2 - Documentation Updates**:

**MODIFY: README.md**

Add new section after "Configuration" section (after line 49), before "License" section (before line 51):

```
## Health Check Endpoint

The server includes a `/health` endpoint for monitoring and verification purposes.

#### Accessing the Health Check

While the server is running, you can check its health status:

**Using a web browser:**
```
http://127.0.0.1:3000/health
```

**Using curl:**
```bash
curl http://localhost:3000/health
```

#### Response Format

The health check endpoint returns a JSON response with the following structure:

```json
{
  "status": "ok",
  "uptime": 123.456,
  "timestamp": "2024-11-24T12:34:56.789Z",
  "message": "Server is running"
}
```

**Response Fields:**
- `status`: Health status indicator (always "ok" when server is responding)
- `uptime`: Number of seconds the server has been running
- `timestamp`: Current server time in ISO 8601 format
- `message`: Human-readable status message

#### Use Cases

- **Development verification**: Quickly confirm the server started successfully
- **Monitoring integration**: Connect to uptime monitoring services
- **Load balancer health checks**: Configure AWS ALB, ELB, or other load balancers
- **Container orchestration**: Use with Kubernetes liveness/readiness probes
```

**Modification Details**:
- Insert approximately 40 lines of documentation
- Provide clear usage examples for both browser and command-line testing
- Document JSON response structure with field descriptions
- Include common use cases for health check endpoint
- Maintain consistent markdown formatting with existing README structure

**Group 3 - Metadata Updates**:

**MODIFY: package.json (Line 4)**

**Current**:
```json
"description": "A simple Hello World Node.js HTTP server application",
```

**New**:
```json
"description": "A simple Hello World Node.js HTTP server application with health check endpoint",
```

**MODIFY: package.json (Lines 10-15)**

**Current**:
```json
"keywords": [
  "hello-world",
  "nodejs",
  "http-server",
  "example"
],
```

**New**:
```json
"keywords": [
  "hello-world",
  "nodejs",
  "http-server",
  "example",
  "health-check",
  "monitoring"
],
```

**Modification Details**:
- Update description to reflect new health check capability
- Add "health-check" and "monitoring" keywords for improved npm discoverability
- Changes preserve existing JSON structure and formatting

### 0.5.2 Implementation Approach per File

**Hello_World_Node.js Implementation Strategy**:

1. **Preserve Existing Behavior**:
   - Wrap original response logic (lines 9-11) in else block
   - Ensure all non-`/health` paths continue returning "Hello World!"
   - Maintain identical status codes, headers, and response format for backward compatibility

2. **Add Health Check Logic**:
   - Implement if condition checking `req.url === '/health'` as first branch
   - Generate health check object with four required fields: status, uptime, timestamp, message
   - Use `process.uptime()` to calculate seconds since server started
   - Use `new Date().toISOString()` for timestamp in ISO 8601 format
   - Serialize response with `JSON.stringify()` for valid JSON output

3. **Maintain Educational Clarity**:
   - Keep code readable with clear variable names (`healthCheck` object)
   - Avoid complex routing logic or regular expressions
   - Maintain synchronous execution without async/await or promises
   - No error handling complexity - rely on Node.js default error behavior

4. **Technical Considerations**:
   - URL comparison uses exact string match (`===`) for simplicity
   - No query parameter parsing - endpoint responds to `/health` regardless of query string
   - No HTTP method discrimination - GET, POST, PUT, DELETE all work identically
   - No authentication or rate limiting - appropriate for localhost educational use

**README.md Documentation Strategy**:

1. **Integrate Seamlessly**:
   - Insert new section in logical location after "Configuration", before "License"
   - Use consistent markdown heading levels (## for main section)
   - Match existing code block formatting with triple backticks

2. **Provide Complete Information**:
   - Include both browser and curl access examples for different user preferences
   - Document complete JSON response structure with field-by-field explanations
   - List practical use cases to illustrate value beyond educational context

3. **Maintain Beginner-Friendly Tone**:
   - Use clear, concise language appropriate for Node.js learners
   - Provide copy-paste ready examples
   - Explain technical terms (ISO 8601, JSON format)

**package.json Metadata Strategy**:

1. **Update Description Accurately**:
   - Append "with health check endpoint" to existing description
   - Keep description concise and searchable
   - Maintain sentence case formatting

2. **Enhance Discoverability**:
   - Add relevant keywords: "health-check" and "monitoring"
   - Preserve existing keywords to maintain current searchability
   - Align keywords with common npm search terms

**Validation and Testing Strategy**:

Per Technical Specification Section 6.6.2.1, manual verification workflow:

1. **Server Startup Verification**:
   - Execute `node Hello_World_Node.js`
   - Confirm console output: "Server running at http://127.0.0.1:3000/"

2. **Health Check Verification**:
   - Navigate browser to http://localhost:3000/health
   - Verify JSON response with status, uptime, timestamp, message fields
   - Confirm Content-Type header is `application/json`
   - Test with curl: `curl http://localhost:3000/health`

3. **Backward Compatibility Verification**:
   - Navigate browser to http://localhost:3000/
   - Verify "Hello World!" text response unchanged
   - Test various paths: http://localhost:3000/api, http://localhost:3000/test
   - Confirm all non-health paths return "Hello World!"

4. **Uptime Metric Verification**:
   - Check health endpoint immediately after startup (uptime near 0)
   - Wait 10 seconds, check again (uptime should be approximately 10)
   - Restart server, verify uptime resets to near 0

**No Build or Compilation Steps**:

Implementation requires no build process:
- No transpilation (JavaScript runs directly in Node.js)
- No bundling (single file application)
- No minification (educational code prioritizes readability)
- No type checking (no TypeScript)
- Direct execution: `node Hello_World_Node.js`

## 0.6 Scope Boundaries

### 0.6.1 Exhaustively In Scope

**Source Code Modifications**:
- `Hello_World_Node.js` - Complete file modification with URL routing logic (lines 8-12 restructured to lines 8-22 approximately)
  - Add conditional if-else statement for path-based routing
  - Implement `/health` endpoint response generation
  - Preserve existing "Hello World!" response for all other paths
  - Utilize `process.uptime()` for runtime metrics
  - Utilize `new Date().toISOString()` for timestamp generation

**Documentation Updates**:
- `README.md` - Add comprehensive health check section
  - New "Health Check Endpoint" section (insert after line 49)
  - Usage examples for browser and curl access
  - Complete JSON response schema documentation
  - Field-by-field response explanation
  - Common use cases and integration examples
  - Maintain consistent markdown formatting

**Metadata Updates**:
- `package.json` - Description field update (line 4)
  - Change from: "A simple Hello World Node.js HTTP server application"
  - Change to: "A simple Hello World Node.js HTTP server application with health check endpoint"
- `package.json` - Keywords array extension (lines 10-15)
  - Add "health-check" keyword
  - Add "monitoring" keyword (optional but recommended)
  - Preserve existing keywords: "hello-world", "nodejs", "http-server", "example"

**API Endpoint Definition**:
- `/health` endpoint implementation
  - HTTP Methods: All (GET, POST, PUT, DELETE respond identically)
  - Response Status: 200 OK
  - Response Content-Type: application/json
  - Response Body: `{"status": "ok", "uptime": <number>, "timestamp": "<ISO8601>", "message": "Server is running"}`
  - No authentication required
  - No request parameters
  - No rate limiting

**Manual Verification Procedures**:
- Browser testing at http://localhost:3000/health
- Curl command testing: `curl http://localhost:3000/health`
- Backward compatibility testing for all non-health paths
- Uptime metric validation (verify increments over time)
- JSON response format validation
- HTTP status code verification (200 OK)

**Backward Compatibility Guarantees**:
- All existing paths (/, /api, /foo, /bar, etc.) continue returning "Hello World!\n"
- Original response Content-Type (text/plain) preserved for non-health paths
- Server initialization behavior unchanged (lines 3-6 remain identical)
- Server listening behavior unchanged (lines 14-16 remain identical)
- Console logging behavior unchanged (line 15)

### 0.6.2 Explicitly Out of Scope

**External Dependencies**:
- ❌ Installing npm packages (express, koa, fastify)
- ❌ Adding health check libraries (@hmcts/nodejs-healthcheck, lightship)
- ❌ Adding monitoring agents (New Relic, Datadog, AppDynamics)
- ❌ Adding logging libraries (winston, pino, bunyan)

**Advanced Routing Features**:
- ❌ Regular expression-based URL matching
- ❌ Query parameter parsing for `/health?detailed=true`
- ❌ Path parameter extraction for `/health/:id`
- ❌ HTTP method discrimination (different responses for GET vs POST)
- ❌ Multi-endpoint routing framework or middleware system

**Health Check Enhancements**:
- ❌ Database connectivity verification (no database exists in project)
- ❌ External API dependency checks (project has zero external integrations)
- ❌ Memory usage reporting beyond process uptime
- ❌ CPU usage metrics
- ❌ Disk space monitoring
- ❌ Custom health check failure scenarios or 503 responses
- ❌ Separate liveness and readiness endpoints (/livez, /readyz)
- ❌ Health check response caching

**Advanced Monitoring Integration**:
- ❌ Prometheus metrics endpoint (/metrics with OpenMetrics format)
- ❌ StatsD integration for metric collection
- ❌ CloudWatch custom metrics emission
- ❌ Structured logging with correlation IDs
- ❌ Distributed tracing (OpenTelemetry, Jaeger)

**Authentication and Security**:
- ❌ Health check endpoint authentication
- ❌ API key validation
- ❌ Rate limiting or throttling
- ❌ CORS configuration for health check endpoint
- ❌ HTTPS/TLS encryption (project uses HTTP only)

**Testing Infrastructure**:
- ❌ Automated unit tests for health check endpoint
- ❌ Integration tests with Supertest
- ❌ Performance tests with Artillery or k6
- ❌ CI/CD pipeline configuration (GitHub Actions, GitLab CI)
- ❌ Test coverage reporting
- ❌ Automated health check validation on commit

**Configuration Management**:
- ❌ Environment variable configuration for health check path
- ❌ External configuration files (config.json, .env)
- ❌ Dynamic port configuration for health checks
- ❌ Configurable health check response format

**Documentation Expansions**:
- ❌ JSDoc comments in source code
- ❌ OpenAPI/Swagger specification for health endpoint
- ❌ Postman collection for API testing
- ❌ Architecture diagrams for health check flow
- ❌ Separate API documentation site

**Deployment and Operations**:
- ❌ Docker health check configuration (HEALTHCHECK instruction in Dockerfile - no Dockerfile exists)
- ❌ Kubernetes probe configuration YAML
- ❌ AWS ALB target group health check configuration
- ❌ Nginx reverse proxy health check configuration
- ❌ Service mesh integration (Istio, Linkerd)

**Error Handling**:
- ❌ Custom error responses for malformed requests
- ❌ Try-catch blocks around health check logic
- ❌ Graceful degradation on health check failures
- ❌ Health check timeout handling
- ❌ Circuit breaker patterns

**Performance Optimizations**:
- ❌ Health check response caching
- ❌ Connection pooling for health checks
- ❌ Load balancing awareness
- ❌ Health check response time optimization beyond default behavior

**Rationale for Scope Limitations**:

These exclusions maintain alignment with project principles documented in Technical Specification Section 1.2.3 (simplicity, zero dependencies, <20 lines of code target) and Section 1.3.2.1 (explicit out-of-scope items including automated testing, advanced routing, and production deployment features). The implementation focuses on providing a functional, educational health check endpoint without introducing complexity that would contradict the project's learning objectives.

## 0.7 Special Instructions

### 0.7.1 Feature-Specific Requirements

**Educational Simplicity Mandate**:

The health check implementation must preserve the project's core educational mission as documented in Technical Specification Section 1.1.2:

- **Code Readability First**: Every line of code must be immediately comprehensible to Node.js beginners
- **No Magic**: Avoid clever techniques, terse syntax, or implicit behaviors that obscure understanding
- **Linear Execution**: Maintain synchronous, top-to-bottom execution flow without callbacks, promises, or async patterns
- **Self-Documenting Code**: Use descriptive variable names (`healthCheck` instead of `hc`, `timestamp` instead of `ts`)

**Filename Mismatch Handling**:

Critical consideration: Technical Specification Section summary documents that `package.json` references "server.js" as the entry point (lines 5, 7, 8), but the actual file is named "Hello_World_Node.js". This health check implementation:

- **MUST NOT** rename files to resolve the mismatch (preserve existing filename)
- **MUST NOT** create additional server.js file (avoid duplication)
- **SHOULD** note the mismatch persists as a known limitation
- **RATIONALE**: Filename consistency is out-of-scope; focus on health check functionality only

**JSON Response Formatting**:

The health check JSON response must adhere to specific formatting requirements:

- **No Pretty Printing**: Use `JSON.stringify(healthCheck)` without spacing parameters for compact output
- **Field Order**: Maintain consistent order: `status`, `uptime`, `timestamp`, `message`
- **String Values**: Use double quotes for all string values (standard JSON)
- **Number Precision**: Accept default JavaScript number precision for uptime (no rounding or formatting)
- **Timestamp Format**: Use ISO 8601 format via `toISOString()` without modifications

**Example Expected Response**:
```json
{"status":"ok","uptime":42.156,"timestamp":"2024-11-24T12:34:56.789Z","message":"Server is running"}
```

**Path Matching Exactness**:

URL path comparison must follow strict matching rules:

- **Exact Match Only**: Use `req.url === '/health'` (strict equality)
- **Case Sensitive**: `/health` matches, `/Health` and `/HEALTH` do not match (return "Hello World!")
- **No Trailing Slash**: `/health` matches, `/health/` does not match
- **No Query String Handling**: `/health?verbose=true` matches (Node.js includes query in req.url)
- **No Fragment Handling**: `/health#details` matches (`#details` not sent to server)

**Critical Implementation Note**: If query string stripping is desired, implementation would require `req.url.split('?')[0] === '/health'`, but simple use case recommends exact match for educational clarity.

**Backward Compatibility Strictness**:

Non-breaking change requirement is **absolute**:

- **Zero Regression Tolerance**: Any existing path behavior change is a critical defect
- **Test All Paths**: Manually verify /, /api, /test, /random/path/here all return "Hello World!"
- **Test All Methods**: Verify GET, POST, PUT, DELETE, PATCH all continue working identically
- **Test Edge Cases**: Verify empty path, extremely long paths, paths with special characters all behave consistently

**Console Output Preservation**:

The server startup message (line 15) must remain unchanged:

- **Keep Exact Format**: "Server running at http://127.0.0.1:3000/" without modifications
- **No Health Check Mention**: Do not add "with health check at /health" or similar
- **Single Log Line**: Do not add additional console.log statements for health check feature
- **RATIONALE**: Startup message is part of educational demo; additional logging contradicts simplicity

**Documentation Tone and Style**:

README.md updates must match the existing documentation voice:

- **Beginner-Friendly**: Assume reader has basic command-line knowledge but minimal Node.js experience
- **Clear Instructions**: Provide step-by-step guidance with explicit commands
- **Consistent Formatting**: Match existing code block style (triple backticks with language specification)
- **No Jargon**: Explain technical terms like "ISO 8601" and "JSON format" in context
- **Practical Examples**: Show concrete usage with `curl` commands and browser URLs

**Version Control Commit Strategy**:

When committing the health check implementation:

- **Atomic Commit**: All changes (Hello_World_Node.js, README.md, package.json) in single commit
- **Clear Commit Message**: "Add /health endpoint for server status monitoring"
- **Detailed Commit Body**: List all files modified and rationale for changes
- **No Breaking Changes Tag**: Do not include BREAKING CHANGE footer (this is backward compatible)

**Future Enhancement Considerations**:

Document these potential future improvements in README.md or GitHub issues, but do NOT implement:

- Separate liveness (`/livez`) and readiness (`/readyz`) endpoints for Kubernetes
- Detailed health checks including memory usage and event loop lag
- Configuration via environment variables for health check path
- Health check response caching for high-frequency polling scenarios

**Monitoring Tool Integration Guidance**:

For users integrating with external monitoring services, recommend:

- **Polling Interval**: 30-60 seconds (avoid aggressive polling that could impact educational demo)
- **Timeout Setting**: 5 seconds (health check responds in <10ms but allow network overhead)
- **Success Criteria**: HTTP 200 status code and valid JSON response
- **Alert Threshold**: Trigger alert after 3 consecutive failures (avoid false positives from network issues)

**Localhost-Only Deployment Constraint**:

Explicitly document that the health check endpoint:

- **Is NOT production-ready**: Binds to 127.0.0.1 only, inaccessible from external networks
- **Requires modification for production**: Change hostname to '0.0.0.0' or specific interface
- **Lacks security features**: No authentication, rate limiting, or HTTPS encryption
- **Educational purpose only**: Suitable for learning and local development, not deployment

This constraint aligns with Technical Specification Section 5.1.1 which confirms "localhost-only binding ensures maximum security for development environments."

