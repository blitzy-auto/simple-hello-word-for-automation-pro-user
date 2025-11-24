# Technical Specification

# 0. Agent Action Plan

## 0.1 Intent Clarification

### 0.1.1 Core Feature Objective

Based on the prompt, the Blitzy platform understands that the new feature requirement is to **add a health_check endpoint to the existing Hello World Node.js HTTP server** to enable monitoring and verification that the service is running correctly.

This requirement translates to the following specific objectives:

- **Primary Objective:** Implement a dedicated health check endpoint that can be queried to verify server availability and operational status
- **Secondary Objective:** Provide meaningful health status information including server uptime and current timestamp
- **Tertiary Objective:** Maintain the project's educational simplicity while adding production-ready monitoring capability
- **Integration Objective:** Ensure the health check endpoint coexists with the existing "Hello World!" response without disrupting current functionality

**Implicit Requirements Detected:**

- The health check endpoint should follow Node.js and industry best practices
- The endpoint should return appropriate HTTP status codes (200 for healthy, 503 for unhealthy)
- The response should be in a machine-readable format (JSON) suitable for monitoring tools
- The implementation should remain dependency-free, using only Node.js built-in modules
- The endpoint should respond quickly (<10ms) to enable frequent health checks
- The solution should maintain backward compatibility with the existing single-endpoint behavior

### 0.1.2 Special Instructions and Constraints

**User-Provided Directives:**

The user's request is concise and focused: *"Could you please add a health_check endpoint to the project so that we can easily verify that the service is running correctly?"*

**Critical Constraints Identified:**

- **Zero External Dependencies:** The project's core principle is to use only Node.js built-in modules. The health check implementation must honor this constraint by avoiding npm packages like `express-healthcheck` or `@hmcts/nodejs-healthcheck`.

- **Educational Simplicity:** The project serves as a learning tool for Node.js fundamentals. The health check endpoint should be implemented in a straightforward manner that enhances educational value rather than introducing complexity.

- **Localhost-Only Deployment:** The server binds exclusively to 127.0.0.1:3000. The health check endpoint should follow this same security-conscious pattern.

- **CommonJS Module System:** The project uses `require()` syntax. The health check implementation must maintain this pattern for consistency.

- **Minimal Code Footprint:** The existing implementation is 17 lines of code. While the health check will add lines, the implementation should remain concise and comprehensible.

**Architectural Requirements:**

- **Use Existing Service Pattern:** Integrate the health check into the existing `http.createServer()` callback without introducing routing libraries
- **Follow Repository Conventions:** Maintain the same code style, formatting, and naming conventions present in `Hello_World_Node.js`
- **Maintain Backward Compatibility:** The existing root endpoint behavior (returning "Hello World!") must remain unchanged for all non-health-check paths

**No Examples Provided by User:** The user did not provide specific examples of desired health check response format or endpoint naming, allowing implementation flexibility within best practices.

### 0.1.3 Technical Interpretation

These feature requirements translate to the following technical implementation strategy:

**To implement the health check endpoint**, we will **modify** the existing request handler in `Hello_World_Node.js` to add URL path-based routing logic that distinguishes between health check requests and standard requests.

**To provide health status information**, we will **utilize** Node.js built-in `process.uptime()` method to calculate server uptime and `Date.now()` to provide timestamp information.

**To maintain educational simplicity**, we will **implement** URL path checking using basic string comparison (e.g., `req.url === '/health'`) rather than introducing Express.js or other routing frameworks.

**To ensure JSON responses**, we will **create** a health status object containing relevant metrics and serialize it using `JSON.stringify()`, setting the appropriate `Content-Type: application/json` header.

**To preserve existing behavior**, we will **structure** the request handler with conditional logic: if the request URL matches `/health` or `/health_check`, return health status; otherwise, return the original "Hello World!" response.

**To update documentation**, we will **modify** `README.md` to document the new health check endpoint, including its purpose, URL path, response format, and usage examples.

**To update project metadata**, we will **increment** the version number in `package.json` from 1.0.0 to 1.1.0 to reflect the addition of a new feature (following semantic versioning conventions).

## 0.2 Repository Scope Discovery

### 0.2.1 Comprehensive File Analysis

**Existing Files Requiring Modification:**

| File Path | Modification Type | Specific Changes Required |
|-----------|-------------------|---------------------------|
| `Hello_World_Node.js` | **MODIFY** | Add URL path routing logic; implement health check response handler; maintain existing "Hello World!" response for non-health paths |
| `README.md` | **MODIFY** | Add Health Check Endpoint section documenting `/health` endpoint; include response format examples; update Usage section with health check testing instructions |
| `package.json` | **MODIFY** | Increment version from 1.0.0 to 1.1.0; optionally update description to mention health check capability |

**Integration Point Discovery:**

- **Primary Integration Point:** `Hello_World_Node.js` lines 8-12 (request handler callback) - This is where URL path-based routing logic will be inserted
- **Request Processing Flow:** The existing universal request handler must be enhanced to check `req.url` property and route to appropriate response generator
- **Response Generation:** Two response code paths will exist: (1) health check response with JSON payload, (2) existing "Hello World!" text response
- **No Database Models:** Project has no database layer; health check will report process-level metrics only
- **No Service Classes:** Project has no service layer; health check logic will be inline in request handler
- **No Controllers/Handlers:** Project has no MVC structure; all logic resides in single file
- **No Middleware/Interceptors:** Project has no middleware layer; health check will be handled directly in primary request callback

**Affected Code Sections:**

```
Lines 8-12 in Hello_World_Node.js (Current Implementation):
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});
```

This section will be transformed to include conditional routing logic based on `req.url`.

### 0.2.2 Web Search Research Conducted

Based on research into Node.js health check endpoint best practices, the following insights were gathered:

**Common Endpoint Naming Patterns:**

<cite index="5-1,5-2">`/readyz` and `/livez` are common choices for readiness and liveness probes in Kubernetes environments</cite>. However, for this simple educational project, `/health` or `/health_check` provides clearer intent for learning purposes.

**Recommended Response Content:**

<cite index="2-3">Health checks typically include response time, uptime, status code (200 for OK), and timestamp</cite>. <cite index="1-1">The `process.uptime()` method is a built-in API for getting the number of seconds the Node.js process has been running</cite>.

**Minimal Implementation Philosophy:**

<cite index="8-12,8-13">Recommendations discourage using modules for health checks, favoring minimal implementations directly in code</cite>. This aligns perfectly with the project's zero-dependency architecture.

**Security Considerations:**

The health check endpoint will bind to the same localhost-only interface (127.0.0.1) as the main server, inheriting the existing security posture. No authentication is required for localhost-only educational deployments.

**Kubernetes-Ready Patterns:**

While not immediately necessary, implementing a simple `/health` endpoint prepares the codebase for potential future Kubernetes deployment scenarios without requiring refactoring.

### 0.2.3 New File Requirements

**No New Source Files Required:**

The health check feature will be implemented entirely within the existing `Hello_World_Node.js` file. This decision maintains the project's single-file simplicity and educational clarity.

**No New Test Files Required:**

Per Technical Specification Section 6.6.1.2, automated testing remains explicitly out-of-scope. Manual verification of the health check endpoint will follow the same browser-based and curl-based testing approach documented for the existing endpoint.

**No New Configuration Files Required:**

The health check endpoint requires no configuration files. All behavior will be determined by inline constants and logic within `Hello_World_Node.js`.

**Documentation Updates:**

- `README.md` will be enhanced with a new "Health Check Endpoint" section
- No separate documentation files will be created, preserving the three-file project structure

## 0.3 Dependency Inventory

### 0.3.1 Private and Public Packages

**Current Dependency Status:**

| Registry | Package Name | Version | Purpose |
|----------|--------------|---------|---------|
| N/A | **No external dependencies** | N/A | Project uses only Node.js built-in modules |

**Node.js Built-in Modules (No Installation Required):**

| Module | Current Usage | Health Check Usage |
|--------|---------------|-------------------|
| `http` | Server creation and request handling | Will continue to be used for health check responses |
| `process` (global) | Not currently used | Will use `process.uptime()` for uptime reporting |

**Critical Note on Zero-Dependency Architecture:**

The health check implementation will maintain the project's zero-dependency philosophy. No npm packages will be added to `dependencies` or `devDependencies` in `package.json`. This decision preserves the educational value of demonstrating pure Node.js capabilities without external abstractions.

**Packages Explicitly NOT Added:**

- `express` - Not needed; built-in `http` module provides sufficient routing capability via `req.url` inspection
- `express-healthcheck` - Not needed; simple inline implementation preferred
- `@hmcts/nodejs-healthcheck` - Not needed; overly complex for this use case
- `http-status-codes` - Not needed; status codes will be specified as numeric literals (200, 503)

### 0.3.2 Dependency Updates

**Import Updates:**

**No import changes required.** The existing `const http = require('http');` statement at line 3 of `Hello_World_Node.js` remains sufficient. The health check feature will utilize the existing `http` module and Node.js global objects (`process`, `Date`) which require no explicit imports.

**Code Structure (No New Imports):**

```javascript
// Existing import remains unchanged
const http = require('http');

// process and Date are globals - no require() needed
// process.uptime() will be accessed directly
// Date.now() will be accessed directly
```

**Files Requiring Import Updates:**

**None.** No files in the repository require import statement modifications.

**External Reference Updates:**

| File | Section | Update Required |
|------|---------|-----------------|
| `package.json` | `version` field | Change from `"1.0.0"` to `"1.1.0"` (semantic versioning - minor version bump for new feature) |
| `package.json` | `description` field (optional) | Could be updated to mention health check capability, but not required |
| `README.md` | Multiple sections | Add documentation for health check endpoint; update usage examples |

**Configuration File Updates:**

**None required.** No `.env` files, configuration JSON files, or YAML files exist in the repository. All configuration is hardcoded in `Hello_World_Node.js` (hostname = '127.0.0.1', port = 3000), and these values remain unchanged for the health check feature.

## 0.4 Integration Analysis

### 0.4.1 Existing Code Touchpoints

**Direct Modifications Required:**

- **`Hello_World_Node.js` (lines 8-12):** Replace the universal request handler with conditional routing logic
  
  **Current Implementation:**
  ```javascript
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  });
  ```
  
  **New Implementation Strategy:**
  - Add URL path inspection at the beginning of the request handler
  - Create conditional branches for `/health` and default paths
  - Implement health check response generation with JSON payload
  - Preserve existing "Hello World!" response for all other paths
  - Approximate new line count: 8-10 additional lines

- **`README.md` (multiple locations):** Add comprehensive health check documentation
  
  **Section 1 - After line 35 (after "How It Works"):** Insert new "Health Check Endpoint" section with:
  - Purpose and usage explanation
  - Endpoint URL path (`/health`)
  - Response format example (JSON structure)
  - Sample curl command for testing
  
  **Section 2 - Within "Usage" section (lines 13-35):** Add step demonstrating health check verification
  - New step: "Test the health check endpoint by visiting http://127.0.0.1:3000/health"
  - Expected response format documentation

- **`package.json` (line 2):** Version increment
  
  **Current:** `"version": "1.0.0"`
  
  **New:** `"version": "1.1.0"`
  
  **Rationale:** Semantic versioning dictates minor version increment (X.Y.Z → X.Y+1.Z) when adding backward-compatible functionality

**Dependency Injection Points:**

**Not Applicable.** This project has no dependency injection container, service registry, or inversion of control framework. All functionality is implemented inline within the single request handler callback.

**Database/Schema Updates:**

**Not Applicable.** This project has no database connectivity, no schema definitions, and no migration system. The health check endpoint reports process-level metrics only (uptime, timestamp) without persisting or querying any data.

**Event Handler Registrations:**

**Not Required.** The health check functionality will be implemented within the existing `http.createServer()` callback. No new event listeners (e.g., `server.on('request', ...)`) need to be registered.

**Integration Touch Points Summary:**

| Component | Integration Type | Modification Scope |
|-----------|------------------|-------------------|
| HTTP Request Handler | Inline Logic Enhancement | Add URL routing conditional; implement health check response path |
| Documentation System | Content Addition | Add health check section to README.md |
| Version Management | Metadata Update | Increment package.json version field |

## 0.5 Technical Implementation

### 0.5.1 File-by-File Execution Plan

**Group 1 - Core Feature Implementation:**

**MODIFY: `Hello_World_Node.js`**

**Purpose:** Implement health check endpoint with URL-based routing

**Specific Changes:**

1. **Add URL path inspection logic** within the `http.createServer()` callback (after line 8)
   - Check if `req.url === '/health'` or `req.url === '/health_check'`
   - Branch execution based on URL path

2. **Implement health check response handler** for health check paths
   - Set `res.statusCode = 200`
   - Set `res.setHeader('Content-Type', 'application/json')`
   - Create health status object with properties:
     * `status: 'ok'`
     * `uptime: process.uptime()` (seconds since process start)
     * `timestamp: Date.now()` (current Unix timestamp in milliseconds)
   - Serialize object with `JSON.stringify()`
   - Send response with `res.end()`

3. **Preserve existing response handler** for all other paths
   - Maintain exact current behavior: 200 status, text/plain content-type, "Hello World!\n" body
   - Ensure backward compatibility for root path `/` and any other URLs

**Expected Code Structure:**

```javascript
const server = http.createServer((req, res) => {
  if (req.url === '/health' || req.url === '/health_check') {
    // Health check response path
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const healthStatus = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: Date.now()
    };
    res.end(JSON.stringify(healthStatus));
  } else {
    // Existing "Hello World!" response path
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});
```

**Lines Modified:** 8-12 (current) → 8-22 (new, approximately)

**Group 2 - Documentation Updates:**

**MODIFY: `README.md`**

**Purpose:** Document new health check endpoint for users

**Specific Changes:**

1. **Add new section "Health Check Endpoint"** (insert after line 35, after "How It Works" section)
   
   Content to include:
   - Section heading: `## Health Check Endpoint`
   - Purpose explanation: Monitoring server availability
   - Endpoint path: `/health`
   - Response format table showing JSON structure
   - Example response with sample values
   - Testing instructions with curl command

2. **Update "Usage" section** (lines 13-35)
   
   Add new step (between current step 5 and step 6):
   - Step number: "6. Test the health check endpoint"
   - Instructions: Visit `http://127.0.0.1:3000/health` in browser or use curl
   - Expected response: JSON object with status, uptime, timestamp
   - Renumber subsequent steps accordingly

**Example Documentation Addition:**

```
## Health Check Endpoint

The server includes a health check endpoint for monitoring and verifying operational status.

**Endpoint:** `/health`

**Response Format:**

| Field | Type | Description |
|-------|------|-------------|
| status | string | Server status ("ok" when healthy) |
| uptime | number | Seconds since server started |
| timestamp | number | Current Unix timestamp (milliseconds) |

**Example Response:**

\```json
{
  "status": "ok",
  "uptime": 125.384,
  "timestamp": 1701234567890
}
\```

**Testing:**

\```bash
curl http://127.0.0.1:3000/health
\```
```

**Group 3 - Metadata Updates:**

**MODIFY: `package.json`**

**Purpose:** Update project version to reflect new feature

**Specific Changes:**

1. **Line 2: Increment version number**
   - Change: `"version": "1.0.0"` → `"version": "1.1.0"`
   - Rationale: Minor version bump per semantic versioning (new backward-compatible feature)

2. **Optional: Line 4: Update description** (if desired for clarity)
   - Current: `"description": "A simple Hello World Node.js HTTP server application"`
   - Potential: `"description": "A simple Hello World Node.js HTTP server application with health check endpoint"`
   - Note: Description update is optional; version increment is mandatory

### 0.5.2 Implementation Approach per File

**Phase 1 - Core Functionality (Priority: Critical)**

**File:** `Hello_World_Node.js`

**Approach:**

1. **Preserve existing behavior first:** Ensure the else branch of the conditional maintains exact current functionality to guarantee backward compatibility

2. **Implement health check path:** Add conditional logic checking for `/health` endpoint using simple string comparison on `req.url`

3. **Utilize built-in APIs:** Use `process.uptime()` and `Date.now()` without additional imports, demonstrating Node.js global object capabilities

4. **Maintain code style:** Follow existing indentation (2 spaces), line length, and formatting conventions from current file

5. **Test incrementally:** After implementation, verify both paths work correctly (health check returns JSON, other paths return "Hello World!")

**Phase 2 - Documentation (Priority: High)**

**File:** `README.md`

**Approach:**

1. **Add dedicated section:** Create clear, self-contained "Health Check Endpoint" section with complete information

2. **Provide concrete examples:** Include actual JSON response example and curl command for immediate user testing

3. **Maintain documentation style:** Match existing README formatting, heading structure, and tone (educational, friendly)

4. **Update usage workflow:** Integrate health check testing into existing usage instructions as a natural verification step

**Phase 3 - Version Management (Priority: Medium)**

**File:** `package.json`

**Approach:**

1. **Apply semantic versioning:** Increment minor version (1.0.0 → 1.1.0) following SemVer conventions for new features

2. **Preserve JSON structure:** Maintain exact formatting and field order in package.json

## 0.6 Scope Boundaries

### 0.6.1 Exhaustively In Scope

**Source Code Files:**

- `Hello_World_Node.js` - Complete file modification including:
  - Lines 8-12: Request handler with URL routing logic
  - Health check response implementation
  - Preserved "Hello World!" response for non-health paths
  - Maintained server initialization (lines 1-7, 14-16)

**Documentation Files:**

- `README.md` - Comprehensive documentation updates including:
  - New "Health Check Endpoint" section (after line 35)
  - Updated "Usage" section with health check testing step
  - Example JSON response format
  - Curl command examples
  - Table documenting response fields

**Configuration Files:**

- `package.json` - Metadata updates including:
  - Line 2: Version field update (1.0.0 → 1.1.0)
  - Optional: Line 4: Description field enhancement

**Endpoint Functionality:**

- `/health` endpoint implementation with:
  - HTTP 200 OK status code response
  - Content-Type: application/json header
  - JSON response body with status, uptime, timestamp fields
  - Response time <10ms performance requirement
  - Localhost-only binding (127.0.0.1:3000)

- `/health_check` endpoint alias:
  - Alternative URL path supporting common naming convention
  - Identical response format and behavior as `/health`

**Backward Compatibility:**

- Root path `/` functionality:
  - Exact preservation of current "Hello World!\n" response
  - HTTP 200 status code
  - Content-Type: text/plain header
  - No behavioral changes to existing endpoint

- All other paths:
  - Continue returning "Hello World!\n" response
  - Maintain universal acceptance pattern
  - No routing changes except health check paths

**Testing and Verification:**

- Manual browser-based verification:
  - Navigate to http://127.0.0.1:3000/health
  - Verify JSON response displays correctly
  - Confirm status, uptime, and timestamp fields present

- Manual curl-based verification:
  - Execute `curl http://127.0.0.1:3000/health`
  - Verify JSON response structure
  - Validate Content-Type header
  - Test both `/health` and `/health_check` paths

- Backward compatibility verification:
  - Confirm http://127.0.0.1:3000/ still returns "Hello World!"
  - Test arbitrary paths (e.g., /test, /api) return "Hello World!"

**Zero External Dependencies:**

- No npm package installations
- No updates to `dependencies` or `devDependencies` in package.json
- Only built-in Node.js modules (`http`, `process` global, `Date` global)

### 0.6.2 Explicitly Out of Scope

**Advanced Routing Features:**

- Express.js or other routing framework integration
- Route parameter parsing (e.g., `/health/:id`)
- Query string parameter handling (e.g., `/health?format=xml`)
- HTTP method-specific routing (GET vs POST differentiation)
- Wildcard or regex-based path matching

**Complex Health Checks:**

- Database connectivity verification (no database exists)
- External API dependency checks (no external services)
- Memory usage threshold monitoring
- CPU usage percentage reporting
- Disk space availability checks
- Network connectivity tests
- Custom health check plugins or extensions

**Enhanced Response Formats:**

- XML response format support
- HTML status page generation
- Prometheus metrics format
- Response format negotiation (Accept header handling)
- Multiple health check endpoints (/readyz, /livez, /healthz)
- Versioned health check APIs (/v1/health, /v2/health)

**Authentication and Security:**

- API key authentication for health check endpoint
- IP address whitelisting
- Rate limiting on health check requests
- HTTPS/TLS encryption (project uses HTTP only)
- CORS header configuration
- Security header additions (X-Frame-Options, CSP)

**Monitoring and Logging:**

- Health check request logging to files
- Structured logging integration (Winston, Bunyan, Pino)
- Metrics collection and export
- Integration with monitoring services (Datadog, New Relic, Prometheus)
- Alerting system integration
- Health check response time tracking

**Configuration Management:**

- Environment variable-based configuration
- External configuration file support (.env, config.json)
- Configurable health check endpoint path
- Configurable response format
- Feature flags for enabling/disabling health check

**Testing Infrastructure:**

- Automated unit tests for health check endpoint
- Integration tests with Supertest
- Performance/load testing with Artillery or k6
- End-to-end tests with Playwright
- CI/CD pipeline configuration (GitHub Actions, GitLab CI)
- Test coverage reporting

**Advanced Features:**

- Graceful shutdown handling
- Readiness vs liveness probe differentiation
- Deep health checks with dependency status
- Health check result caching
- Aggregated health status from multiple services
- Historical health check data storage
- Health check dashboard UI

**Documentation Beyond Scope:**

- OpenAPI/Swagger specification for health endpoint
- Architecture Decision Records (ADRs) for health check design
- Separate API documentation website
- Video tutorials for health check usage
- Health check best practices guide

## 0.7 Special Instructions for Feature Addition

### 0.7.1 Educational Simplicity Preservation

**Critical Requirement:** The health check implementation must maintain the project's educational mission. Every line of code added should be immediately comprehensible to developers learning Node.js fundamentals.

**Implementation Guidelines:**

- Use simple conditional logic (`if/else`) rather than complex routing patterns
- Avoid abstract programming patterns (factories, dependency injection, middleware chains)
- Include inline comments explaining health check concepts for learners
- Keep total file length under 30 lines to maintain "single-glance comprehension"

**Code Clarity Standards:**

- Variable names should be descriptive (e.g., `healthStatus` not `hs`)
- No code golf or clever tricks—prioritize readability over brevity
- Use consistent indentation and formatting matching existing code
- Each logical block should have clear purpose visible from structure

### 0.7.2 Zero-Dependency Architecture Mandate

**Non-Negotiable Constraint:** The project MUST NOT introduce any npm package dependencies. This is a foundational principle that distinguishes this educational example from production frameworks.

**Verification Checklist:**

- After implementation, confirm `package.json` shows:
  ```json
  "dependencies": {}  // or field absent entirely
  "devDependencies": {}  // or field absent entirely
  ```
- No `node_modules/` directory should exist
- No `package-lock.json` or `yarn.lock` files should be created
- `npm install` command should complete instantly with "up to date" message

**Temptation Avoidance:**

- Do NOT use `express` even though it would simplify routing
- Do NOT use `express-healthcheck` even though it provides standard format
- Do NOT use `http-status-codes` even though it provides named constants
- Do NOT use `lodash` or `underscore` for object manipulation

### 0.7.3 Backward Compatibility Guarantee

**Absolute Requirement:** Existing functionality must remain 100% unchanged for all non-health-check requests.

**Compatibility Test Cases:**

1. **Root Path Behavior:** `curl http://127.0.0.1:3000/` must return exactly `Hello World!\n` with `Content-Type: text/plain`
2. **Arbitrary Path Behavior:** `curl http://127.0.0.1:3000/foobar` must return `Hello World!\n` (not 404)
3. **HTTP Method Agnostic:** POST, PUT, DELETE requests should still return `Hello World!\n`
4. **Response Timing:** Non-health requests should maintain <10ms response time
5. **Console Logging:** Server startup message must remain unchanged: `Server running at http://127.0.0.1:3000/`

**Regression Prevention:**

- Test existing behavior before implementing health check
- Test existing behavior after implementing health check
- Compare response headers, body, and status code for equivalence

### 0.7.4 JSON Response Format Specification

**Required Health Check Response Structure:**

```json
{
  "status": "ok",
  "uptime": <number_of_seconds_as_float>,
  "timestamp": <unix_timestamp_in_milliseconds>
}
```

**Field Specifications:**

| Field | Type | Format | Example | Description |
|-------|------|--------|---------|-------------|
| `status` | string | Literal "ok" | `"ok"` | Server health indicator; always "ok" for running server |
| `uptime` | number | Float with millisecond precision | `123.456` | Seconds since process started via `process.uptime()` |
| `timestamp` | number | Integer milliseconds | `1701234567890` | Current Unix epoch time via `Date.now()` |

**Response Header Requirements:**

- `Content-Type: application/json` (exactly this string, no charset parameter needed)
- `HTTP/1.1 200 OK` status line
- No custom headers (X-Powered-By, X-Health-Check-Version, etc.)

### 0.7.5 Performance Requirements

**Latency Target:** Health check endpoint must respond in <10ms (matching existing endpoint performance).

**Implementation Considerations:**

- `process.uptime()` is O(1) operation—no performance concern
- `Date.now()` is O(1) operation—no performance concern
- `JSON.stringify()` with 3-field object is negligible overhead
- URL string comparison (`===`) is O(n) but with short strings—negligible

**Performance Anti-Patterns to Avoid:**

- Do NOT read from filesystem on each health check request
- Do NOT perform network calls or DNS lookups
- Do NOT execute shell commands
- Do NOT calculate complex metrics (CPU usage, memory stats beyond `process.uptime()`)

### 0.7.6 Security Posture Maintenance

**Localhost-Only Binding Preservation:** The health check endpoint must honor the existing `hostname = '127.0.0.1'` binding, preventing external network access.

**No Authentication Required:** For localhost-only educational deployment, the health check endpoint requires no authentication, API keys, or access tokens.

**Information Disclosure Minimization:**

- Do NOT expose Node.js version number in response
- Do NOT expose operating system details
- Do NOT expose environment variables
- Do NOT expose process ID or parent process details
- Do NOT expose file system paths

**Acceptable Information Disclosure:**

- Process uptime (generic operational metric)
- Current timestamp (publicly available information)
- Status string "ok" (confirms server responsiveness)

### 0.7.7 Code Style and Formatting Standards

**Match Existing Conventions:**

- **Indentation:** 2 spaces (no tabs)
- **Line Length:** Aim for <80 characters where possible
- **Quote Style:** Single quotes for strings (matching line 3: `require('http')`)
- **Semicolons:** Required at end of statements (matching existing code)
- **Const vs Let:** Use `const` for all immutable bindings (matching lines 3, 5-6, 8)

**Comment Style:**

- Use `//` for inline comments
- Add brief explanatory comments for health check logic block
- Example: `// Health check endpoint - returns JSON status`

### 0.7.8 Testing and Verification Requirements

**Manual Verification Steps (Required Before Completion):**

1. **Start server:** Execute `node Hello_World_Node.js`
2. **Verify startup message:** Confirm console shows `Server running at http://127.0.0.1:3000/`
3. **Test health endpoint (browser):** Visit http://127.0.0.1:3000/health
4. **Test health endpoint (curl):** Execute `curl http://127.0.0.1:3000/health -v`
5. **Verify JSON response:** Confirm response contains status, uptime, timestamp fields
6. **Verify JSON Content-Type:** Check response header includes `Content-Type: application/json`
7. **Test root path:** Visit http://127.0.0.1:3000/ and confirm "Hello World!" displays
8. **Test arbitrary path:** Visit http://127.0.0.1:3000/test and confirm "Hello World!" displays
9. **Test alternate health path:** Execute `curl http://127.0.0.1:3000/health_check`
10. **Stop server:** Press Ctrl+C and confirm clean shutdown

**Expected Test Results Documentation:**

Document in README.md the expected response for health check endpoint with concrete example showing actual uptime and timestamp values observed during testing.

### 0.7.9 Version Control and Commit Strategy

**Semantic Versioning Application:**

- Current version: 1.0.0 (initial release with "Hello World!" only)
- New version: 1.1.0 (minor version bump for new backward-compatible feature)
- Rationale: Health check is new functionality that doesn't break existing API

**Recommended Commit Structure:**

```
Commit 1: Implement health check endpoint in Hello_World_Node.js
Commit 2: Update README.md with health check documentation
Commit 3: Bump version to 1.1.0 in package.json
```

Or single commit with clear message:
```
feat: Add health check endpoint at /health

- Implement URL routing to distinguish health check from standard requests
- Return JSON response with status, uptime, and timestamp
- Maintain backward compatibility for all existing paths
- Update README.md with health check documentation
- Bump version from 1.0.0 to 1.1.0

Resolves: User request for service verification endpoint
```

### 0.7.10 CommonJS Module System Adherence

**Maintain Existing Module Pattern:**

- Continue using `require()` syntax (line 3: `const http = require('http');`)
- Do NOT introduce ES6 `import/export` syntax
- Do NOT add `"type": "module"` to package.json
- Do NOT use `.mjs` file extensions

**Rationale:**

The project uses CommonJS as the default Node.js module system, ensuring compatibility across Node.js 14.x through 20.x without requiring additional configuration or file extensions.

### 0.7.11 Documentation Quality Standards

**README.md Enhancement Requirements:**

- Clear section heading ("Health Check Endpoint")
- Purpose statement explaining use case for health checks
- Endpoint URL prominently displayed
- Response format documented with field-level descriptions
- Multiple testing examples (browser URL, curl command)
- Example response with realistic values (not placeholders)

**Documentation Tone:**

- Maintain friendly, educational tone matching existing README
- Use second-person "you" addressing (e.g., "You can test the health check by...")
- Provide step-by-step instructions for learners
- Include context explaining why health checks are useful

**Formatting Consistency:**

- Use same markdown heading levels as existing sections
- Use code blocks with bash syntax highlighting for commands
- Use code blocks with json syntax highlighting for responses
- Use tables for structured field documentation

