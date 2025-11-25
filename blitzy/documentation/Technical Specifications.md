# Technical Specification

# 0. Agent Action Plan

## 0.1 Core Feature Objective

Based on the prompt, the Blitzy platform understands that the new feature requirement is to implement a health check endpoint that enables automated and manual verification of service availability.

#### Enhanced Feature Requirements

**Primary Requirement:**
- Add a health check endpoint to the existing Node.js HTTP server that returns service status information

**Implicit Requirements Detected:**
- The endpoint must be accessible via HTTP GET request
- Response should indicate server health status with appropriate HTTP status codes
- The implementation should follow Node.js best practices for health check endpoints
- The endpoint must be lightweight and not impact server performance
- Response format should be machine-readable (JSON format preferred)
- The endpoint should provide basic operational metrics such as server uptime

**Feature Dependencies and Prerequisites:**
- Existing HTTP server infrastructure (http module already in use)
- No external dependencies required (implementation using Node.js built-in modules)
- Compatibility with Node.js >=14.0.0 as specified in package.json
- Must integrate with current request handling architecture

**Success Criteria:**
- Health check endpoint responds with HTTP 200 status when service is operational
- Response includes relevant service health metadata (status, uptime, timestamp)
- Implementation maintains the simplicity and minimal dependency footprint of the existing application
- Endpoint can be used by monitoring tools, load balancers, and orchestration platforms

## 0.2 Special Instructions and Constraints

#### Architectural Requirements

**Integration with Existing Architecture:**
- Maintain compatibility with the current minimal HTTP server implementation using Node.js built-in http module
- Preserve the existing request-response pattern without introducing middleware frameworks
- Ensure zero external dependencies to maintain the project's simplicity philosophy
- Follow the existing CommonJS module pattern (require syntax)

**Code Quality and Style Constraints:**
- Maintain consistency with existing code style and formatting
- Use same constant declaration pattern (const for all variables)
- Preserve inline comments style for documentation
- Keep implementation straightforward and educational, matching project's learning-focused nature

**Backward Compatibility:**
- Preserve existing "/" root endpoint behavior (must continue returning "Hello World!")
- Do not modify current server configuration (hostname: 127.0.0.1, port: 3000)
- Maintain existing startup message format
- Ensure existing npm scripts (start, dev) continue to function

**File Naming Convention:**
- Address the existing mismatch where package.json references "server.js" but actual file is "Hello_World_Node.js"
- Resolve this discrepancy as part of the implementation to ensure npm scripts work correctly

#### Research Requirements

**Technical Standards Research:**
- Health check endpoint naming conventions (industry standard: /health, /healthcheck, /livez, /readyz)
- HTTP status codes for health check responses (200 for healthy, 503 for unhealthy)
- Response payload structure best practices (JSON format with status, uptime, timestamp fields)
- Node.js process.uptime() API for accurate uptime reporting

**Security and Performance Research:**
- Lightweight implementation patterns to minimize performance impact
- Appropriate response caching strategies for health check endpoints
- Security considerations for publicly accessible health endpoints

## 0.3 Technical Interpretation

These feature requirements translate to the following technical implementation strategy:

#### Implementation Mapping

**To implement the health check endpoint, we will:**

1. **Modify Request Handler Logic:**
   - Transform the current single-response server into a route-aware server
   - Add URL path inspection to differentiate between root ("/") and health check ("/health") endpoints
   - Implement conditional response logic based on requested path

2. **Create Health Check Response Function:**
   - Develop a dedicated response handler for the /health endpoint
   - Utilize `process.uptime()` to calculate server operational duration
   - Generate JSON-formatted response containing:
     - status: "ok" indicator
     - uptime: server uptime in seconds
     - timestamp: current ISO 8601 formatted timestamp
   - Set appropriate HTTP headers (Content-Type: application/json)
   - Return HTTP 200 status code for successful health checks

3. **Resolve File Naming Inconsistency:**
   - Rename "Hello_World_Node.js" to "server.js" to align with package.json manifest
   - Ensure npm start and npm dev commands execute correctly
   - Update any references in documentation

4. **Update Documentation:**
   - Document the new /health endpoint in README.md
   - Provide usage examples for accessing the health check endpoint
   - Include sample response payload
   - Add monitoring tool integration guidance

#### Technical Approach Summary

| Requirement | Technical Action | Affected Components |
|------------|------------------|-------------------|
| Add health check endpoint | Implement URL path routing in request handler | Hello_World_Node.js (to be renamed server.js) |
| Return service status | Create JSON response with status, uptime, timestamp | Request handler function |
| Maintain backward compatibility | Preserve root "/" endpoint behavior | Request handler conditional logic |
| Enable monitoring | Ensure 200 status code and machine-readable format | Response headers and body |
| Fix naming mismatch | Rename Hello_World_Node.js to server.js | File system, git history |
| Document feature | Add health endpoint section to README | README.md |

#### Key Technical Decisions

**Route Handling Implementation:**
- Use req.url property inspection instead of introducing Express.js or other routing frameworks
- Maintain zero-dependency approach by implementing simple if-else routing logic
- Pattern: `if (req.url === '/health') { ... } else { ... }`

**Response Format:**
- JSON structure for machine readability and industry standard compliance
- Include uptime for operational metrics
- Include timestamp for request timing verification
- Example response: `{"status":"ok","uptime":123.45,"timestamp":"2024-01-01T12:00:00.000Z"}`

**Error Handling:**
- Health check should always return 200 if server is running (no dependency checks required for this minimal application)
- No try-catch needed as health check has no external dependencies that could fail

## 0.4 Comprehensive File Analysis

#### Existing Repository Structure

**Current File Inventory:**
```
/ (root)
├── Hello_World_Node.js    (17 lines - main server implementation)
├── package.json           (21 lines - npm manifest)
└── README.md             (54 lines - documentation)
```

#### Files Requiring Modification

**1. Hello_World_Node.js → server.js (RENAME + MODIFY)**

*Current State Analysis:*
- Lines 1-6: Header comment, http module import, configuration constants
- Lines 8-12: Request handler (responds to ALL requests identically)
- Lines 14-16: Server initialization and startup logging

*Required Changes:*
- **Line 8-12 Modification:** Replace single-response handler with URL-aware routing logic
  - Add conditional check for req.url === '/health'
  - Implement health check response branch
  - Preserve existing behavior for root "/" path
  - Add fallback for undefined routes (404 handling)

*Integration Points:*
- Request handler callback function: Add routing logic
- Response handling: Differentiate between plain text and JSON responses
- Header management: Set Content-Type based on endpoint

**2. package.json (MODIFY)**

*Current State Analysis:*
- Line 5: "main": "server.js" (points to non-existent file)
- Lines 6-9: npm scripts reference "server.js"

*Required Changes:*
- **Verification Only:** After renaming Hello_World_Node.js to server.js, verify all references are correct
- **Potential Addition (Line 10):** Consider adding a "test" script for health check validation

*Current Manifest Status:*
```json
{
  "name": "hello-world-nodejs",
  "version": "1.0.0",
  "main": "server.js",           // Will become valid after rename
  "scripts": {
    "start": "node server.js",    // Will work after rename
    "dev": "node server.js"       // Will work after rename
  }
}
```

**3. README.md (MODIFY)**

*Current State Analysis:*
- Lines 1-13: Project overview and prerequisites
- Lines 14-38: Usage instructions and examples
- Lines 40-49: Technical explanation and configuration
- Lines 51-54: License information

*Required Changes:*
- **After Line 35 (Usage Section):** Add new subsection for health check endpoint
  - Document /health endpoint URL
  - Show example curl command
  - Display sample JSON response
- **Lines 44-49 (Configuration Section):** Add health check endpoint to feature list
- **Lines 15-22 (Usage Instructions):** Confirm references to server.js are now correct

#### Discovery of Configuration Files

**Searched Patterns (Results):**
- **/*.config.***: No configuration files found
- **/*.json**: Only package.json exists
- **/*.yaml, /*.yml**: No YAML configuration files
- **/*.toml**: No TOML files
- **/docker-compose***, **/Dockerfile**: No containerization files
- **.github/workflows/***: No CI/CD workflows
- **test/**, **tests/**, ***test***: No test files or directories

**Build and Deployment Files:**
- No build tools configured (no webpack, rollup, esbuild)
- No deployment configurations (no PM2, no systemd services)
- No environment configuration files (.env, .env.example)

#### Integration Point Discovery

**HTTP Server Request Flow:**
```
Incoming Request → http.createServer() callback → req.url inspection
                                                ↓
                                    ┌───────────┴───────────┐
                                    ↓                       ↓
                            req.url === '/health'    req.url === '/'
                                    ↓                       ↓
                            JSON response          "Hello World!" response
                            (status, uptime)       (plain text)
```

**Current Request Handler (Line 8-12):**
```javascript
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});
```

**Required Integration Points:**
- **req.url**: URL path property to implement routing
- **res.statusCode**: Already used, maintain 200 for both endpoints
- **res.setHeader**: Modify Content-Type based on endpoint (text/plain vs application/json)
- **res.end**: Call with appropriate response body (string vs JSON)

#### File Impact Assessment

| File | Impact Level | Change Type | Lines Affected | Risk Level |
|------|-------------|-------------|----------------|------------|
| Hello_World_Node.js → server.js | HIGH | Rename + Modify | 8-12 (expand to ~25) | LOW |
| package.json | NONE | Validation Only | 0 (already correct) | NONE |
| README.md | MEDIUM | Documentation Add | Insert ~15 lines | LOW |

**Total Estimated Line Changes:**
- Lines Added: ~23 (13 in server logic, 10 in documentation)
- Lines Modified: ~5 (request handler restructure)
- Lines Deleted: ~0
- Files Renamed: 1
- New Files: 0

## 0.5 Web Search Research Conducted

#### Research Query: "Node.js health check endpoint best practices"

**Research Objective:** Identify industry-standard approaches for implementing health check endpoints in Node.js applications to ensure the implementation aligns with established patterns and monitoring tool expectations.

#### Key Findings

**1. Endpoint Naming Conventions**

<cite index="4-2,8-2">Common endpoint names include /readyz and /livez for readiness and liveness probes respectively</cite>, with /health and /healthcheck also widely adopted. For this minimal application without Kubernetes requirements, `/health` provides the clearest semantic meaning.

**2. Response Metrics and Structure**

<cite index="2-3">Health checks commonly include response time of the server, uptime of the server, status code (200 for OK), and timestamp</cite>. <cite index="1-1">The process.uptime() method gets the number of seconds the Node.js process has been running</cite>.

**3. Implementation Philosophy**

<cite index="4-11,4-12,4-13">Industry guidance recommends against using modules for health checks, favoring minimal implementations, as the tradeoff between code needed versus dependency costs favors adding code directly</cite>. This aligns perfectly with our zero-dependency approach.

**4. Response Status Codes**

Health checks should return:
- **HTTP 200**: Service is healthy and operational
- **HTTP 503**: Service is unavailable or unhealthy

For this simple application without external dependencies, always returning 200 when the server responds is appropriate.

**5. Performance Considerations**

Health check endpoints must be lightweight and fast-responding to avoid:
- Impacting application performance during high-frequency polling
- False negatives due to slow response times
- Resource exhaustion from monitoring overhead

#### Research-Driven Design Decisions

**Decision 1: Endpoint Path Selection**
- **Chosen:** `/health`
- **Rationale:** Clear, self-documenting, widely recognized across monitoring tools
- **Alternative Considered:** `/healthcheck` (more verbose), `/livez` (Kubernetes-specific)

**Decision 2: Response Format**
```json
{
  "status": "ok",
  "uptime": 123.45,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```
- **status**: Clear health indicator
- **uptime**: Operational metric using process.uptime()
- **timestamp**: Request timing reference using Date.now()

**Decision 3: Implementation Approach**
- **Chosen:** Direct implementation using req.url inspection
- **Rationale:** Maintains zero dependencies, minimal code addition (~8 lines)
- **Alternative Rejected:** Express.js middleware (adds unnecessary dependency)

**Decision 4: Dependency Checks**
- **Chosen:** No external dependency validation
- **Rationale:** Application has no external dependencies (no database, no Redis, no external APIs)
- **Note:** If future versions add databases, health check should verify connectivity

#### Integration with Monitoring Tools

Based on research, the implemented health check will be compatible with:
- **Kubernetes**: Liveness and readiness probes
- **Docker**: HEALTHCHECK directive
- **AWS ELB/ALB**: Target health checks
- **Monitoring Services**: Uptime monitoring tools (Pingdom, Datadog, etc.)
- **Load Balancers**: HAProxy, Nginx upstream health checks

#### Security Considerations from Research

For this educational application:
- No authentication required (local development focus)
- Public accessibility acceptable (binds to localhost only)
- No sensitive information exposed in response

**Note:** Production applications should consider:
- Rate limiting health check endpoints
- Authentication for public endpoints
- Minimal information disclosure

## 0.6 New File Requirements

#### Analysis: No New Files Required

After comprehensive analysis of the feature requirements and existing codebase structure, **no new files need to be created**. The health check endpoint will be implemented entirely through modifications to existing files.

#### Rationale for Zero New Files

**1. Architectural Simplicity**
- Current application is intentionally minimal (single-file server implementation)
- Adding new files would contradict the project's educational simplicity goal
- Health check logic is lightweight enough (~8 lines) to inline into existing request handler

**2. No Modular Separation Needed**
- Application has no module structure (no src/, lib/, or routes/ directories)
- Health check endpoint is a core server feature, not a separate module
- Routing logic is simple enough to maintain inline without separate route files

**3. No Test Infrastructure**
- Project has no existing test framework or test directory
- Adding tests would require test runner setup (jest, mocha) - out of scope
- Manual testing via curl or browser is sufficient for this educational project

**4. No Configuration Externalization**
- No configuration files exist or are needed
- Health check has no configurable parameters
- Endpoint path and response format are hardcoded by design

#### File Modification Summary (Not New Files)

**Files to be Modified:**
1. **Hello_World_Node.js** → Renamed to **server.js** (MODIFY + RENAME)
   - Purpose: Add health check routing logic
   - Change: Expand request handler from 5 lines to ~20 lines

2. **README.md** (MODIFY)
   - Purpose: Document new health check endpoint
   - Change: Add health check usage section (~10 lines)

3. **package.json** (NO CHANGES REQUIRED)
   - Purpose: Already correctly references server.js
   - Change: None - naming fix makes existing config valid

#### Considered But Rejected New Files

**1. tests/health.test.js** ❌
- **Why Rejected:** No test infrastructure exists
- **Alternative:** Manual testing with curl sufficient for this minimal project
- **Future Consideration:** If project grows, add test suite

**2. routes/health.js** ❌
- **Why Rejected:** No routing framework or module structure
- **Alternative:** Inline routing in main server file
- **Complexity:** Would require module.exports and require() patterns unnecessary for 2 routes

**3. config/health.config.js** ❌
- **Why Rejected:** Health check has no configurable parameters
- **Alternative:** Hardcoded response structure
- **Simplicity:** Configuration file overhead not justified

**4. .env / .env.example** ❌
- **Why Rejected:** No environment variables needed for health check
- **Alternative:** Use existing hostname and port constants
- **Note:** Health check uses same port as main application

#### Verification Checklist

- ✅ Health check logic fits within existing server.js file structure
- ✅ No separate routing module needed
- ✅ No configuration files required
- ✅ No test files needed (manual testing sufficient)
- ✅ No new dependencies to track in package.json
- ✅ Documentation additions fit within existing README.md
- ✅ No build or deployment files needed

## 0.7 Dependency Inventory

#### Public and Private Packages Analysis

**Current Dependency Status:** Zero external dependencies

#### Runtime Dependencies

| Registry | Package Name | Current Version | Required Version | Purpose | Change Required |
|----------|-------------|----------------|------------------|---------|-----------------|
| Node.js Built-in | http | (built-in) | N/A | HTTP server creation | NO CHANGE |
| Node.js Built-in | process | (built-in) | N/A | Access uptime via process.uptime() | NO CHANGE |

**Analysis:**
- The application currently uses only Node.js built-in modules
- Health check implementation requires no new external dependencies
- `process.uptime()` is a built-in API available in all Node.js versions >=14.0.0
- No npm packages need to be installed or added to package.json

#### Development Dependencies

| Package Name | Current Version | Purpose | Status |
|-------------|----------------|---------|---------|
| (none) | N/A | No dev dependencies | NO CHANGE |

**Analysis:**
- Project has no development dependencies
- No linting, testing, or build tools configured
- Health check implementation maintains this zero-dependency philosophy

#### Dependency Decisions

**Rejected Dependencies (With Rationale):**

1. **express** ❌
   - Purpose: Would simplify routing with app.get('/health', ...)
   - Size: ~572 KB with dependencies
   - Rejection Reason: Overkill for 2-route application; violates zero-dependency principle
   - Alternative: Manual req.url inspection

2. **express-healthcheck** ❌
   - Purpose: Pre-built health check middleware
   - Rejection Reason: Requires Express.js; adds unnecessary dependency
   - Alternative: 8-line custom implementation

3. **@hmcts/nodejs-healthcheck** ❌
   - Purpose: Comprehensive health check library
   - Rejection Reason: Designed for complex microservices with multiple dependency checks
   - Alternative: Simple status response sufficient

4. **node:diagnostics_channel** ❌
   - Purpose: Advanced health metrics
   - Rejection Reason: Overcomplicated for this use case
   - Alternative: Basic uptime and timestamp

#### Package Version Verification

**Node.js Runtime:**
- **Specified in package.json:** `"engines": { "node": ">=14.0.0" }`
- **Installed for this project:** 14.21.3 (highest version of 14.x branch)
- **APIs Used:**
  - `http.createServer()` - Available since Node.js 0.1.13 ✅
  - `process.uptime()` - Available since Node.js 0.5.0 ✅
  - `Date.now()` - Available in all Node.js versions ✅
  - `JSON.stringify()` - Available in all Node.js versions ✅

**Compatibility Verification:**
- ✅ All APIs used are available in Node.js 14.0.0+
- ✅ No new API requirements introduced
- ✅ No version upgrades needed

#### Import/Export Analysis

**Current Imports (server.js):**
```javascript
const http = require('http');  // Line 3 - No change required
```

**New Imports Required:**
- **NONE** - All health check functionality uses:
  - Global `process` object (no import needed)
  - Global `Date` object (no import needed)
  - `req` and `res` objects from http callback

**No Import Updates Required:**
- ✅ No existing imports need modification
- ✅ No new require() statements needed
- ✅ No module.exports needed (server.js is entry point, not module)

#### Lock File Status

**package-lock.json:**
- **Current Status:** Not present in repository
- **Impact of Changes:** N/A (no dependencies to lock)
- **Action Required:** None

**npm Audit:**
- **Security Vulnerabilities:** N/A (no dependencies)
- **Outdated Packages:** N/A (no dependencies)
- **Action Required:** None

#### Dependency Management Checklist

- ✅ No new dependencies to add to package.json
- ✅ No version bumps required
- ✅ No security patches needed
- ✅ No npm install required after implementation
- ✅ No package-lock.json updates needed
- ✅ Zero-dependency status maintained
- ✅ All required functionality available in Node.js built-ins

## 0.8 Existing Code Touchpoints

#### Direct Code Modifications Required

**File: Hello_World_Node.js → server.js**

**Touchpoint 1: Request Handler Function (Lines 8-12)**

*Current Implementation:*
```javascript
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});
```

*Required Modification:*
- **Location:** Lines 8-12 (expand to approximately lines 8-30)
- **Change Type:** Transform single-response handler into route-aware handler
- **Integration Point:** Add URL path inspection using `req.url` property

*Modification Strategy:*
```javascript
const server = http.createServer((req, res) => {
  // NEW: Route inspection logic
  if (req.url === '/health') {
    // NEW: Health check response branch
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const healthData = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };
    res.end(JSON.stringify(healthData));
  } else if (req.url === '/') {
    // PRESERVED: Original Hello World response
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  } else {
    // NEW: 404 handling for undefined routes
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found\n');
  }
});
```

**Touchpoint 2: File Naming (Filesystem Operation)**

*Current State:*
- **Actual Filename:** Hello_World_Node.js
- **Referenced in package.json:** server.js (lines 5, 7, 8)
- **Referenced in README.md:** server.js (lines 15, 22, 49)

*Required Modification:*
- **Action:** Rename Hello_World_Node.js to server.js
- **Impact:** Makes package.json and README.md references valid
- **Integration Points:**
  - npm start command: `node server.js` (currently fails, will succeed)
  - npm dev command: `node server.js` (currently fails, will succeed)
  - package.json main field: "server.js" (becomes valid)

#### Configuration Integration Points

**File: package.json**

**Touchpoint 3: Entry Point Validation (Line 5)**
```json
"main": "server.js"
```
- **Current Status:** Invalid (file doesn't exist)
- **After Changes:** Valid (file will exist after rename)
- **No Code Modification Required:** Configuration already correct

**Touchpoint 4: npm Scripts (Lines 7-8)**
```json
"scripts": {
  "start": "node server.js",
  "dev": "node server.js"
}
```
- **Current Status:** Fail with "Cannot find module '/path/to/server.js'"
- **After Changes:** Execute successfully
- **No Code Modification Required:** Scripts already correct

#### Documentation Integration Points

**File: README.md**

**Touchpoint 5: Usage Instructions Section (After Line 35)**

*Integration Point:* Add new subsection between existing usage content and "Stopping the Server" section

*Content to Insert:*
```
### Health Check Endpoint

The server includes a health check endpoint for monitoring:

GET http://127.0.0.1:3000/health

**Example using curl:**
```bash
curl http://127.0.0.1:3000/health
```

**Response:**
```json
{
  "status": "ok",
  "uptime": 123.45,
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```
```

**Touchpoint 6: How It Works Section (Lines 40-43)**

*Current Content:*
> "The application creates an HTTP server using Node.js's built-in `http` module. When a request is received, the server responds with a status code of 200 and sends "Hello World!" as plain text."

*Required Update:*
- **Integration Strategy:** Expand explanation to mention routing logic
- **Modification:** Add sentence explaining health check endpoint
- **Suggested Addition:**
  > "The server now includes route handling to differentiate between the root endpoint (/) which returns 'Hello World!' and the health check endpoint (/health) which returns server status information in JSON format."

#### Server Lifecycle Integration

**Touchpoint 7: Startup Sequence (Lines 14-16)**

*Current Implementation:*
```javascript
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

*Required Modification:*
- **Change:** None to existing code
- **Enhancement Option:** Could add additional startup message mentioning health endpoint
- **Decision:** Keep minimal - no change required

#### Testing Integration Points

**Manual Testing Touchpoints:**

1. **Root Endpoint Verification:**
   ```bash
   curl http://127.0.0.1:3000/
   # Expected: Hello World!
   ```

2. **Health Endpoint Verification:**
   ```bash
   curl http://127.0.0.1:3000/health
   # Expected: {"status":"ok","uptime":X.XX,"timestamp":"..."}
   ```

3. **404 Handling Verification:**
   ```bash
   curl http://127.0.0.1:3000/invalid
   # Expected: Not Found (404 status)
   ```

4. **npm Script Verification:**
   ```bash
   npm start
   # Expected: Server starts successfully (no longer fails)
   ```

#### Integration Risk Assessment

| Touchpoint | Risk Level | Mitigation |
|-----------|-----------|------------|
| Request handler modification | LOW | Preserve existing "/" behavior in else clause |
| File rename operation | LOW | Git mv preserves history; simple operation |
| package.json validation | NONE | No code changes, just becomes valid |
| README.md additions | LOW | Pure documentation; no functional impact |
| npm script execution | LOW | Scripts already correct; rename fixes them |

#### Backward Compatibility Verification

✅ **Preserved Behaviors:**
- Root "/" endpoint returns "Hello World!" exactly as before
- Server binds to 127.0.0.1:3000 unchanged
- Startup message format unchanged
- Response headers for "/" endpoint unchanged
- HTTP status codes for "/" endpoint unchanged

✅ **New Behaviors (Non-Breaking):**
- /health endpoint (new route, doesn't affect existing usage)
- 404 responses for undefined routes (improves error handling)
- JSON response capability (additive feature)

## 0.9 File-by-File Execution Plan

#### Implementation Sequence

All files listed below MUST be created or modified to complete the health check endpoint feature.

#### Group 1 - Core Server Implementation

**File 1: Hello_World_Node.js → server.js (RENAME + MODIFY)**

**Purpose:** Implement health check endpoint with route handling logic

**Action Required:** 
1. Rename Hello_World_Node.js to server.js
2. Modify request handler to add routing logic

**Specific Changes:**

*Lines 1-7: PRESERVE (No Changes)*
```javascript
// Simple Hello World Node.js Application

const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;
```

*Lines 8-12: REPLACE with Lines 8-30 (Routing Logic)*

**Remove:**
```javascript
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});
```

**Replace With:**
```javascript
const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    // Health check endpoint
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const healthData = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };
    res.end(JSON.stringify(healthData));
  } else if (req.url === '/') {
    // Original Hello World endpoint
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  } else {
    // 404 for unknown routes
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not Found\n');
  }
});
```

*Lines 14-16: PRESERVE (No Changes)*
```javascript
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
```

**Expected Outcome:**
- File renamed from Hello_World_Node.js to server.js
- Total lines: 33 (expanded from 17)
- New functionality: Health check endpoint at /health
- Preserved functionality: Original / endpoint behavior
- Enhanced functionality: 404 handling for undefined routes

#### Group 2 - Configuration Validation

**File 2: package.json (VALIDATE - NO CHANGES)**

**Purpose:** Verify entry point and script references are correct after rename

**Action Required:** None - file is already correctly configured

**Validation Checklist:**
- ✅ Line 5: "main": "server.js" - Will be valid after rename
- ✅ Line 7: "start": "node server.js" - Will execute successfully
- ✅ Line 8: "dev": "node server.js" - Will execute successfully

**Expected Outcome:**
- npm start command works correctly
- npm dev command works correctly
- package.json remains syntactically valid

#### Group 3 - Documentation Updates

**File 3: README.md (MODIFY - ADD CONTENT)**

**Purpose:** Document new health check endpoint for users

**Action Required:** Add health check endpoint documentation

**Modification 1: After Line 35 (Usage Section)**

*Insert New Subsection:*
```
6. The server also provides a health check endpoint at:
   ```
   http://127.0.0.1:3000/health
   ```

#### Health Check Endpoint

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
```

**Modification 2: Lines 40-43 (How It Works Section)**

*Current Text:*
> "The application creates an HTTP server using Node.js's built-in `http` module. When a request is received, the server responds with a status code of 200 and sends "Hello World!" as plain text."

*Expand To:*
> "The application creates an HTTP server using Node.js's built-in `http` module. The server implements basic routing to handle different endpoints:
> - **/** (root): Responds with "Hello World!" as plain text
> - **/health**: Returns server health information in JSON format including status, uptime, and timestamp
> - **Other paths**: Returns 404 Not Found
> 
> This demonstrates fundamental HTTP server concepts including request routing, multiple content types (text/plain and application/json), and proper HTTP status codes."

**Modification 3: Lines 46-49 (Configuration Section)**

*Add After Port Configuration:*
```

**Available Endpoints:**
- Main endpoint: `http://127.0.0.1:3000/`
- Health check: `http://127.0.0.1:3000/health`
```

**Expected Outcome:**
- Users understand health check endpoint exists
- Clear usage examples provided
- Response format documented
- Total README lines: ~70 (expanded from 54)

#### Implementation Approach Summary

**Phase 1: Establish Core Functionality**
1. Execute file rename: `git mv Hello_World_Node.js server.js`
2. Modify server.js request handler (lines 8-30)
3. Test manually: Start server and verify both endpoints

**Phase 2: Validate Configuration**
1. Run `npm start` to verify package.json scripts work
2. Confirm server starts without errors
3. Test /health and / endpoints with curl

**Phase 3: Complete Documentation**
1. Update README.md with health check section
2. Expand "How It Works" explanation
3. Add endpoint list to Configuration section

#### Verification Commands

**After Each File Modification:**

1. **After server.js modification:**
   ```bash
   node server.js &
   curl http://127.0.0.1:3000/
   curl http://127.0.0.1:3000/health
   curl http://127.0.0.1:3000/invalid
   kill %1
   ```

2. **After package.json validation:**
   ```bash
   npm start &
   sleep 1
   curl http://127.0.0.1:3000/health
   kill %1
   ```

3. **After README.md updates:**
   ```bash
   # Visual inspection - verify markdown renders correctly
   # Verify code blocks are properly formatted
   # Check all examples are accurate
   ```

#### File Modification Checklist

- ✅ **server.js (renamed + modified)**: Health check routing implemented
- ✅ **package.json (validated)**: Entry point and scripts verified
- ✅ **README.md (modified)**: Health check endpoint documented

#### Execution Order Rationale

**Why this sequence:**
1. **Core implementation first** - Functional changes before documentation
2. **Configuration validation second** - Ensure tooling works correctly
3. **Documentation last** - Document what's been implemented and tested

This sequence ensures each phase is tested before moving forward, reducing risk of errors and enabling early problem detection.

## 0.10 Scope Boundaries

#### Exhaustively In Scope

**Core Implementation Files:**
- `server.js` (renamed from Hello_World_Node.js)
  - Lines 8-30: Request handler with routing logic
  - Health check endpoint implementation
  - Route handling for /, /health, and undefined routes
  - JSON response generation
  - 404 error handling

**Configuration Files:**
- `package.json`
  - Line 5: Entry point validation ("main": "server.js")
  - Lines 7-8: npm script validation (start, dev)
  - No modifications required, validation only

**Documentation Files:**
- `README.md`
  - After line 35: New health check endpoint section
  - Lines 40-43: Expanded "How It Works" explanation
  - Lines 46-49: Configuration section additions
  - Health check usage examples
  - Sample JSON response documentation
  - Endpoint listing (/, /health)

**Implementation Components:**
- Route inspection logic: `if (req.url === '/health')`
- Health data object creation: `{ status, uptime, timestamp }`
- `process.uptime()` API usage for uptime calculation
- `new Date().toISOString()` for timestamp generation
- `JSON.stringify()` for response serialization
- Content-Type header management (application/json vs text/plain)
- HTTP status code handling (200, 404)

**Testing Scope:**
- Manual testing of / endpoint (verify "Hello World!" response)
- Manual testing of /health endpoint (verify JSON response)
- Manual testing of undefined routes (verify 404 response)
- npm start command verification
- npm dev command verification
- Response header verification (Content-Type correctness)
- Response body format verification

**File Operations:**
- Rename Hello_World_Node.js to server.js (git mv operation)
- Modify server.js content (add routing logic)
- Modify README.md content (add documentation sections)
- No new file creation
- No file deletion (except implicit deletion during rename)

**Quality Assurance In Scope:**
- Code style consistency with existing codebase
- Inline comment quality and clarity
- README.md markdown formatting
- JSON response structure validation
- HTTP protocol compliance
- Backward compatibility verification

#### Explicitly Out of Scope

**External Dependencies:**
- ❌ Installing Express.js or any routing framework
- ❌ Adding health check libraries (@hmcts/nodejs-healthcheck, express-healthcheck)
- ❌ Introducing any npm dependencies
- ❌ Using environment variable management libraries (dotenv)

**Advanced Features:**
- ❌ Database connectivity checks (no database exists)
- ❌ External service health validation (no external services)
- ❌ Redis/cache health checks (no cache layer)
- ❌ Dependency chain health verification
- ❌ Detailed system metrics (CPU, memory, disk usage)
- ❌ Custom health check parameters or configuration
- ❌ Health check authentication or authorization
- ❌ Rate limiting for health endpoint
- ❌ Response caching mechanisms

**Testing Infrastructure:**
- ❌ Unit test creation (tests/**/*.test.js)
- ❌ Integration test setup
- ❌ Test framework installation (jest, mocha, chai)
- ❌ Test coverage reporting
- ❌ CI/CD test automation
- ❌ Performance testing
- ❌ Load testing health endpoint

**Build and Deployment:**
- ❌ Docker containerization (Dockerfile creation)
- ❌ Docker Compose configuration
- ❌ Kubernetes manifests (deployment.yaml, service.yaml)
- ❌ CI/CD pipeline configuration (.github/workflows/*, .gitlab-ci.yml)
- ❌ Build scripts or bundling
- ❌ Production deployment configurations
- ❌ Environment-specific configurations (.env files)

**Server Enhancements:**
- ❌ Additional endpoints beyond / and /health
- ❌ Request logging middleware
- ❌ Error logging to files
- ❌ Structured logging (winston, bunyan)
- ❌ Request ID generation and tracking
- ❌ CORS configuration
- ❌ Request body parsing
- ❌ Query parameter handling
- ❌ POST/PUT/DELETE method support

**Documentation Beyond Basics:**
- ❌ API documentation generation (Swagger/OpenAPI)
- ❌ Architecture diagrams
- ❌ Sequence diagrams
- ❌ Deployment guides
- ❌ Troubleshooting guides
- ❌ Performance tuning documentation
- ❌ Separate CONTRIBUTING.md or CHANGELOG.md

**Code Quality Tools:**
- ❌ ESLint configuration
- ❌ Prettier setup
- ❌ Pre-commit hooks (husky)
- ❌ Git hooks for linting
- ❌ Code coverage tools
- ❌ Static analysis tools

**Monitoring and Observability:**
- ❌ Application Performance Monitoring (APM) integration
- ❌ Metrics collection (Prometheus, StatsD)
- ❌ Distributed tracing (Jaeger, Zipkin)
- ❌ Log aggregation (ELK stack, Splunk)
- ❌ Custom alerting rules
- ❌ Dashboard creation (Grafana)

**Security Enhancements:**
- ❌ HTTPS/TLS configuration
- ❌ Security headers (helmet.js)
- ❌ Input validation and sanitization
- ❌ XSS protection
- ❌ CSRF token implementation
- ❌ Content Security Policy (CSP)
- ❌ Rate limiting
- ❌ Authentication for health endpoint

**Performance Optimizations:**
- ❌ Response compression (gzip)
- ❌ Connection pooling
- ❌ Clustering (multi-process mode)
- ❌ Worker threads
- ❌ Caching strategies
- ❌ Load balancing configuration

**Alternative Implementations:**
- ❌ Separate readiness vs liveness endpoints (/readyz, /livez)
- ❌ Multiple health check levels (shallow vs deep)
- ❌ Configurable health check responses
- ❌ Health check versioning (v1/health, v2/health)

#### Scope Validation Matrix

| Category | In Scope | Out of Scope | Justification |
|----------|----------|--------------|---------------|
| Core Implementation | ✅ Health endpoint | ❌ Advanced metrics | Requirement specifies basic health check |
| Dependencies | ✅ Built-in modules | ❌ External packages | Zero-dependency philosophy |
| Testing | ✅ Manual testing | ❌ Automated tests | No test infrastructure exists |
| Documentation | ✅ README updates | ❌ API spec generation | Maintains simplicity |
| Deployment | ❌ All deployment | ❌ All deployment | Educational local project |
| Security | ❌ All security | ❌ All security | Localhost-only binding sufficient |

#### Boundary Enforcement Rules

**Acceptance Criteria:**
- Implementation MUST use only files listed in "In Scope"
- Implementation MUST NOT create files listed in "Out of Scope"
- Implementation MUST NOT add dependencies listed in "Out of Scope"
- Any deviation from scope boundaries REQUIRES explicit user approval

**Scope Creep Prevention:**
- If implementation reveals need for out-of-scope items, document as "Future Enhancements"
- Maintain focus on minimum viable health check endpoint
- Resist temptation to "improve" beyond stated requirements
- Keep solution aligned with project's educational simplicity goal

## 0.11 Special Instructions for Feature Addition

#### Feature-Specific Requirements

**User Request Context:**
> "Could you please add a health_check endpoint to the project so that we can easily verify that the service is running correctly?"

**Key Emphasized Requirements:**

1. **Simplicity and Ease of Verification**
   - The user's phrase "easily verify" indicates the endpoint must be straightforward to use
   - No complex setup, authentication, or configuration should be required
   - Manual testing via curl or browser must be trivial
   - Response format must be immediately interpretable

2. **Service Operational Verification**
   - The endpoint must definitively confirm "service is running correctly"
   - Response should provide confidence that server is functional
   - Include metrics that indicate healthy operation (uptime)
   - Return appropriate HTTP success status (200)

#### Integration Requirements with Existing Features

**1. Preserve Existing Functionality**
- **Critical:** The original "Hello World!" endpoint at / must remain unchanged
- Users relying on existing behavior must not experience breaking changes
- Server configuration (port 3000, hostname 127.0.0.1) must not change
- Startup message format must remain consistent

**2. Maintain Project Philosophy**
- **Zero Dependencies:** Continue using only Node.js built-in modules
- **Educational Focus:** Implementation should serve as learning example for students
- **Minimal Complexity:** Avoid over-engineering the solution
- **Self-Contained:** No external services or databases to check

**3. File Structure Consistency**
- **Resolve Existing Inconsistency:** Fix Hello_World_Node.js vs server.js naming mismatch
- **Single Entry Point:** Maintain one-file server implementation
- **No Directory Restructuring:** Keep flat file structure at repository root

#### Performance and Scalability Considerations

**Performance Requirements:**

1. **Minimal Latency:**
   - Health check response time must be <10ms under normal conditions
   - Avoid any blocking operations or heavy computations
   - Use lightweight operations (process.uptime(), Date.now())

2. **No Resource Exhaustion:**
   - Health check must not consume significant memory
   - No accumulation of objects or memory leaks
   - Response size kept minimal (< 200 bytes JSON)

3. **High-Frequency Polling Tolerance:**
   - Endpoint must handle monitoring tool polls (typically every 5-30 seconds)
   - No rate limiting required for this localhost-only application
   - Stateless operation ensures no polling-related degradation

**Scalability Considerations:**
- For this single-instance educational application: Not applicable
- No clustering or horizontal scaling planned
- Localhost binding prevents external traffic load
- Single-threaded Node.js event loop sufficient

#### Security Requirements Specific to Feature

**Security Posture for Educational Project:**

1. **Localhost-Only Binding:**
   - Server binds to 127.0.0.1 (loopback only)
   - No external network accessibility
   - Security risk: Minimal (local development only)

2. **No Sensitive Information Disclosure:**
   - Health check response contains only: status, uptime, timestamp
   - No system internals, versions, or architecture details exposed
   - No stack traces or error messages in successful responses

3. **No Authentication Required:**
   - Appropriate for localhost-only educational application
   - Health endpoint publicly accessible on local network
   - No tokens, API keys, or credentials needed

**Security Out of Scope (But Noted for Future Production Use):**
- HTTPS/TLS encryption
- API key authentication
- Rate limiting and DDoS protection
- IP whitelist restrictions
- Response header hardening (X-Frame-Options, CSP, etc.)

#### Code Style and Convention Requirements

**Maintain Existing Code Style:**

1. **Variable Declaration:**
   - Use `const` for all immutable bindings (existing pattern)
   - No `let` or `var` unless mutability required
   - Clear, descriptive variable names (hostname, port, healthData)

2. **Function Style:**
   - Arrow functions for callbacks: `(req, res) => { ... }`
   - No named function declarations in this minimal codebase
   - Single expression returns where appropriate

3. **Comments:**
   - Maintain inline comments style: `// Single-line explanatory comments`
   - Add comments for each routing branch (// Health check endpoint)
   - No block comments (/* ... */) unless necessary for multi-line explanations

4. **Indentation and Formatting:**
   - 2-space indentation (existing standard in file)
   - Consistent brace style (opening brace on same line)
   - Space after keywords: `if (condition)`, not `if(condition)`

5. **String Formatting:**
   - Template literals for dynamic strings: `` `Server running at http://${hostname}:${port}/` ``
   - Single quotes for static strings in JSON (when applicable)
   - No unnecessary concatenation

#### Testing and Validation Requirements

**Manual Testing Procedure:**

1. **Functional Testing:**
   ```bash
   # Start server
   npm start
   
   # Test root endpoint
   curl http://127.0.0.1:3000/
   # Expected: Hello World!
   
   # Test health endpoint
   curl http://127.0.0.1:3000/health
   # Expected: {"status":"ok","uptime":X,"timestamp":"..."}
   
   # Test 404 handling
   curl -i http://127.0.0.1:3000/unknown
   # Expected: HTTP/1.1 404 Not Found
   
   # Stop server
   Ctrl+C
   ```

2. **Response Format Validation:**
   ```bash
   # Verify JSON is valid
   curl -s http://127.0.0.1:3000/health | jq .
   
   # Check response headers
   curl -I http://127.0.0.1:3000/health | grep Content-Type
   # Expected: Content-Type: application/json
   ```

3. **npm Script Verification:**
   ```bash
   # Verify npm start works
   npm start &
   sleep 1
   curl http://127.0.0.1:3000/health
   kill %1
   
   # Verify npm dev works
   npm run dev &
   sleep 1
   curl http://127.0.0.1:3000/health
   kill %1
   ```

#### Documentation Requirements

**README.md Enhancement Standards:**

1. **Clarity and Completeness:**
   - Explain what the health check endpoint does
   - Provide working curl examples that users can copy-paste
   - Show actual JSON response format (not pseudo-code)
   - Explain each field in the response (status, uptime, timestamp)

2. **Consistency with Existing Sections:**
   - Match heading style and formatting
   - Use same code block syntax (triple backticks with language)
   - Maintain similar example structure
   - Keep tone educational and friendly

3. **User-Centric Focus:**
   - Answer "Why would I use this?" question
   - Provide practical monitoring use case
   - Mention compatibility with monitoring tools
   - Keep explanations beginner-friendly

#### Git Workflow Requirements

**File Operations:**
```bash
# Proper rename preserving git history
git mv Hello_World_Node.js server.js

#### Stage modifications
git add server.js README.md

#### Commit with descriptive message
git commit -m "feat: add /health endpoint for service verification

- Implement health check endpoint at /health
- Return JSON with status, uptime, and timestamp
- Add routing logic to differentiate between / and /health
- Add 404 handling for undefined routes
- Rename Hello_World_Node.js to server.js for consistency
- Update README.md with health check documentation"
```

#### Acceptance Criteria Summary

**Feature is complete when:**
- ✅ GET /health returns 200 status with JSON payload
- ✅ JSON includes status, uptime, and timestamp fields
- ✅ GET / still returns "Hello World!" (backward compatible)
- ✅ Undefined routes return 404 Not Found
- ✅ npm start executes successfully
- ✅ npm dev executes successfully
- ✅ README.md documents health endpoint with examples
- ✅ File renamed from Hello_World_Node.js to server.js
- ✅ Zero new dependencies added
- ✅ Manual testing confirms all endpoints work correctly

#### Implementation Notes

**Critical Success Factors:**
1. **Simplicity First:** Resist urge to over-engineer
2. **Backward Compatibility:** Existing behavior must not break
3. **Zero Dependencies:** Use only Node.js built-ins
4. **Documentation Quality:** README examples must be copy-paste ready
5. **Testing:** Manual verification must be straightforward

**Common Pitfalls to Avoid:**
- ❌ Adding Express.js "because it's easier"
- ❌ Creating separate route files or modules
- ❌ Implementing complex health checks with DB connections
- ❌ Adding authentication or rate limiting
- ❌ Over-documenting with unnecessary details
- ❌ Breaking existing "/" endpoint behavior

