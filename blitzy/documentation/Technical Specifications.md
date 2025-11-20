# Technical Specification

# 0. Agent Action Plan

## 0.1 Intent Clarification

### 0.1.1 Core Feature Objective

Based on the prompt, the Blitzy platform understands that the new feature requirement is to add a health check endpoint to the existing Node.js Hello World HTTP server application to enable automated service monitoring and status verification.

**Primary Requirement:**
- Create a dedicated HTTP endpoint that responds to health check requests, allowing external monitoring systems, container orchestrators, and DevOps tooling to programmatically verify that the service is operational

**Enhanced Requirement Clarity:**
- The health check endpoint must return a successful HTTP response (200 OK status code) when the server is running correctly
- The endpoint should provide basic server status information including uptime metrics
- The implementation must maintain the project's core principle of zero external dependencies using only Node.js built-in modules
- The endpoint must be accessible via HTTP GET requests to facilitate integration with standard monitoring tools

**Implicit Requirements Detected:**
- The health check endpoint should not interfere with the existing "Hello World!" functionality on the root path
- Request routing logic must be implemented to differentiate between the health check endpoint and the main application endpoint
- The endpoint should return JSON-formatted response data for machine-readable status information
- The implementation must preserve the educational simplicity mandate of the original project while demonstrating basic routing concepts
- Documentation must be updated to reflect the new endpoint and its usage

**Feature Dependencies and Prerequisites:**
- Requires parsing of incoming request URLs to implement routing logic
- Depends on Node.js built-in `http` module capabilities (already in use)
- Requires understanding of HTTP response headers for JSON content type
- Prerequisites: Node.js >=14.0.0 (already satisfied by existing requirements)

### 0.1.2 Special Instructions and Constraints

**Architectural Requirements:**
- Maintain consistency with existing single-file architecture pattern - all functionality must remain in one self-contained JavaScript file
- Preserve the zero-dependency principle - no npm packages may be added; implementation must use only Node.js built-in capabilities
- Follow existing code style: CommonJS module system, ES6+ syntax (const, arrow functions, template literals)
- Maintain localhost-only binding (127.0.0.1) for security consistency

**Integration Requirements:**
- The health check endpoint must coexist with the existing root path handler without conflicts
- Request routing must be implemented using URL parsing from the built-in `url` module
- The existing "Hello World!" functionality must remain completely unchanged at the root path
- Server initialization and startup logging behavior must be preserved

**Educational and Maintainability Constraints:**
- Keep implementation minimal and comprehensible - target audience is learning developers
- Add inline comments explaining routing logic for educational clarity
- Ensure the complete file remains under 30 lines of code to maintain simplicity mandate
- Code additions must be self-documenting and follow existing naming conventions

**Performance and Scalability Considerations:**
- Health check responses must be synchronous (no async/await) to match existing pattern
- No database or external service connectivity checks required - this is a minimal educational example
- Response time should be instantaneous (sub-millisecond) as no I/O operations are performed

**Security Requirements:**
- Maintain localhost-only binding (127.0.0.1) - no public network exposure
- Health check endpoint should return generic status information without exposing sensitive system details
- No authentication required given localhost-only access and educational context

### 0.1.3 Technical Interpretation

These feature requirements translate to the following technical implementation strategy:

**To implement the health check endpoint functionality, we will modify the existing request handler to include URL-based routing logic:**

1. **Introduce Request URL Parsing:** Import and utilize Node.js built-in `url` module to parse incoming request URLs and extract the pathname for routing decisions

2. **Implement Routing Logic:** Add conditional branching within the request handler callback to distinguish between different URL paths:
   - `/health` or `/health_check` path → execute health check response logic
   - All other paths (including `/`) → execute existing "Hello World!" response logic

3. **Create Health Check Response Handler:** Implement a dedicated code path that:
   - Sets HTTP status code to 200 OK
   - Sets Content-Type header to 'application/json' for structured data
   - Constructs a JSON response object containing server status indicators
   - Includes `process.uptime()` to report how long the Node.js process has been running
   - Serializes the response object using `JSON.stringify()`
   - Sends the JSON response and closes the connection

4. **Preserve Existing Functionality:** Ensure the original "Hello World!" plain text response remains the default for all non-health-check paths, maintaining backward compatibility

5. **Update Documentation:** Modify README.md to document the new health check endpoint, including:
   - Endpoint path and HTTP method
   - Expected response format and status code
   - Example curl command or browser usage
   - Use cases for monitoring and verification

**Technical Implementation Mapping:**

| Requirement Component | Technical Action | Target Location |
|----------------------|------------------|-----------------|
| Health check endpoint | Add URL parsing and routing logic | Hello_World_Node.js request handler (line 8) |
| Status response data | Implement JSON response with uptime | Hello_World_Node.js request handler |
| Route differentiation | Use url.parse() to extract pathname | Hello_World_Node.js (add import at top) |
| Backward compatibility | Preserve default handler for root path | Hello_World_Node.js (else condition) |
| Usage documentation | Add health check section with examples | README.md (new section) |
| Entry point correction | Fix package.json reference mismatch | package.json (update "main" and "scripts") |

## 0.2 Repository Scope Discovery

### 0.2.1 Comprehensive File Analysis

**Complete Repository Structure:**
The repository consists of exactly three first-order files with no subdirectories:
- `Hello_World_Node.js` - Main server implementation (17 lines)
- `package.json` - NPM package manifest
- `README.md` - User-facing documentation

**Existing Files Requiring Modification:**

| File Path | Current Purpose | Modification Required | Specific Changes |
|-----------|----------------|----------------------|------------------|
| `Hello_World_Node.js` | HTTP server implementation with single "Hello World!" endpoint | **MODIFY** - Add routing logic and health check handler | Add `url` module import; Implement pathname-based routing; Add health check response logic with JSON formatting |
| `README.md` | User documentation with usage instructions | **MODIFY** - Document new health check endpoint | Add new section describing `/health_check` endpoint, response format, and example usage |
| `package.json` | NPM package metadata and scripts | **MODIFY** - Fix entry point mismatch | Update `"main"` field from `"server.js"` to `"Hello_World_Node.js"`; Update `scripts.start` and `scripts.dev` to use `Hello_World_Node.js` |

**Critical Discovery - Entry Point Mismatch:**
Analysis reveals a configuration inconsistency that must be corrected:
- **package.json** references `server.js` as the entry point (line 5: `"main": "server.js"`)
- **package.json scripts** attempt to execute `node server.js` (lines 7-8)
- **Actual implementation file** is named `Hello_World_Node.js`
- **Impact:** `npm start` command fails because `server.js` does not exist

This mismatch must be resolved as part of the health check feature implementation to ensure proper project functionality.

**Integration Point Discovery:**

**Server Request Handler (Primary Integration Point):**
- **Location:** `Hello_World_Node.js` lines 8-12
- **Current Implementation:** Single callback function handling all requests identically
- **Required Change:** Introduce URL parsing and conditional routing logic
- **Integration Pattern:** Wrap existing response logic in conditional block; Add new conditional branch for health check path

**Module Import Section:**
- **Location:** `Hello_World_Node.js` line 3
- **Current State:** Single import of `http` module
- **Required Addition:** Import `url` module for pathname parsing

**Server Configuration Constants:**
- **Location:** `Hello_World_Node.js` lines 5-6
- **Current State:** hostname and port constants
- **Assessment:** No changes required - existing configuration is appropriate

**Console Logging:**
- **Location:** `Hello_World_Node.js` line 15
- **Assessment:** No changes required - startup logging behavior should be preserved

**Documentation Structure:**
- **Location:** `README.md` sections
- **Current Sections:** Prerequisites, Installation, Usage, Stopping the Server, How It Works, Configuration, License
- **New Section Required:** Add "Health Check Endpoint" section after "Usage" section

### 0.2.2 Web Search Research Conducted

Research was performed to identify industry best practices for implementing health check endpoints in Node.js applications:

**Best Practices Identified:**

1. <cite index="6-1,6-2">Common endpoint naming conventions include /health, /healthcheck, /livez (liveness), and /readyz (readiness)</cite>

2. <cite index="1-1">The process.uptime() method provides the number of seconds the Node.js process has been running</cite>, which is standard practice for health check responses

3. <cite index="6-11,6-12,6-13">For minimal implementations, it's recommended to avoid adding external dependencies and instead implement health checks directly in application code</cite>

4. <cite index="2-3">Standard health check responses include response time, server uptime, status code (200 for healthy), and timestamp</cite>

5. <cite index="8-2,8-3">A basic health check endpoint should return a 200 status code when operational; any other status indicates the server is down</cite>

**Application to This Project:**

Given the educational nature and zero-dependency requirement of this project, the implementation will:
- Use `/health_check` as the endpoint path for clarity
- Return HTTP 200 status with JSON response body
- Include `process.uptime()` for runtime duration
- Use `Date.now()` for timestamp
- Maintain zero external dependencies by using only built-in Node.js modules
- Keep implementation minimal (5-8 additional lines of code)

### 0.2.3 New File Requirements

**Assessment: No new files required**

The health check feature will be implemented entirely within existing files to maintain the project's single-file architecture principle. All modifications will be made to:

1. **Hello_World_Node.js** - All logic changes integrated into existing server file
2. **README.md** - Documentation updates added to existing documentation file  
3. **package.json** - Configuration corrections applied to existing manifest file

This approach preserves the educational simplicity mandate by keeping the complete implementation in one comprehensible, self-contained file.

## 0.3 Dependency Inventory

### 0.3.1 Private and Public Packages

**Current Dependency Status:**

The project maintains a zero-dependency architecture, using exclusively Node.js built-in modules. No external packages from npm or private registries are utilized.

| Package Registry | Package Name | Version | Purpose | Status |
|-----------------|--------------|---------|---------|--------|
| Node.js Built-in | `http` | Node.js >=14.0.0 | HTTP server creation and request handling | **EXISTING** - Currently in use |
| Node.js Built-in | `url` | Node.js >=14.0.0 | URL parsing and pathname extraction for routing | **TO BE ADDED** - Required for health check routing |
| Node.js Built-in | `process` | Node.js >=14.0.0 | Access to process.uptime() for runtime metrics | **TO BE ADDED** - Implicit access via global process object |

**Node.js Runtime:**
- **Version Requirement:** >=14.0.0 (specified in package.json engines field)
- **Currently Installed:** v20.19.5
- **Compatibility:** Fully compatible - all required APIs (http, url, process.uptime) are stable across Node.js 14.x through 20.x
- **Verification Status:** Environment verified and operational

**NPM:**
- **Version Installed:** 10.8.2
- **Usage:** Not required for this project (no external dependencies)
- **Status:** Available but unused

**Critical Note:** This feature addition maintains the project's core architectural principle of zero external dependencies. All functionality is implemented using Node.js built-in modules that are available in any standard Node.js installation >=14.0.0.

### 0.3.2 Dependency Updates

**No External Dependency Changes Required**

The health check feature implementation requires no modifications to external dependencies, package installations, or dependency manifest updates beyond the entry point correction.

**Import Updates Required:**

**File: Hello_World_Node.js**

Current import statement (line 3):
```javascript
const http = require('http');
```

**Required Addition:**
Add url module import immediately after the http import:

```javascript
const http = require('http');
const url = require('url');
```

**Rationale:** The `url` module provides `url.parse()` functionality to extract pathname from incoming request URLs, enabling routing logic to differentiate between the root path and health check endpoint.

**File Pattern for Import Updates:**
- `Hello_World_Node.js` - Add url module import at line 4

**No Import Updates Required For:**
- `package.json` - Contains no import statements (JSON configuration file)
- `README.md` - Contains no import statements (Markdown documentation file)

**Process Global Object:**
The `process` object is a global variable in Node.js and requires no explicit import. Access to `process.uptime()` is available implicitly in all Node.js code.

**Configuration File Updates:**

**File: package.json**

**Current Configuration:**
```json
"main": "server.js",
"scripts": {
  "start": "node server.js",
  "dev": "node server.js"
}
```

**Required Updates:**
```json
"main": "Hello_World_Node.js",
"scripts": {
  "start": "node Hello_World_Node.js",
  "dev": "node Hello_World_Node.js"
}
```

**Rationale:** Corrects the entry point mismatch where package.json references non-existent `server.js` instead of the actual implementation file `Hello_World_Node.js`. This ensures `npm start` and `npm run dev` commands execute correctly.

**No Build Tool or Transpilation Changes:**
- No webpack, babel, or bundler configuration required
- No TypeScript compilation needed
- No CSS preprocessing or asset pipeline changes
- Pure JavaScript runtime execution with no build step

## 0.4 Integration Analysis

### 0.4.1 Existing Code Touchpoints

**Direct Modifications Required:**

**Primary Integration Point - Request Handler Callback:**
- **File:** `Hello_World_Node.js`
- **Current Location:** Lines 8-12
- **Current Implementation:**
  ```javascript
  const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  });
  ```

- **Required Modification:** Introduce URL parsing and conditional routing logic
- **Specific Changes:**
  - Parse incoming request URL to extract pathname
  - Implement if-else conditional to route based on pathname
  - Branch 1 (new): Handle `/health_check` path with JSON response including uptime
  - Branch 2 (existing): Handle all other paths with original "Hello World!" response
  - Maintain identical response behavior for root path to preserve backward compatibility

- **Integration Approach:**
  ```javascript
  const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    if (parsedUrl.pathname === '/health_check') {
      // New health check logic
    } else {
      // Existing "Hello World!" logic
    }
  });
  ```

**Module Import Integration Point:**
- **File:** `Hello_World_Node.js`
- **Current Location:** Line 3
- **Current State:** Single line importing http module
- **Required Addition:** Add url module import on line 4 (immediately after http import)
- **No Impact:** This addition does not affect existing http module usage or functionality

**Configuration Metadata Integration Points:**

**Entry Point Correction:**
- **File:** `package.json`
- **Current Location:** Line 5 (`"main"` field)
- **Current Value:** `"server.js"` (incorrect - file does not exist)
- **Required Change:** Update to `"Hello_World_Node.js"` (actual implementation file)
- **Impact:** Enables proper module resolution if package is imported by other code

**NPM Script Integration:**
- **File:** `package.json`
- **Current Location:** Lines 7-8 (`scripts` object)
- **Current Commands:** 
  ```json
  "start": "node server.js",
  "dev": "node server.js"
  ```
- **Required Changes:**
  ```json
  "start": "node Hello_World_Node.js",
  "dev": "node Hello_World_Node.js"
  ```
- **Impact:** Ensures `npm start` and `npm run dev` execute correctly

**Documentation Integration Points:**

**Usage Instructions:**
- **File:** `README.md`
- **Current Location:** Lines 14-34 (Usage section)
- **Required Addition:** Insert new subsection after line 34 documenting health check endpoint
- **Content:** Health check endpoint path, expected response format, example curl command, monitoring use case
- **Preservation:** All existing usage instructions for main "Hello World!" functionality remain unchanged

**Configuration Section:**
- **File:** `README.md`
- **Current Location:** Lines 44-49 (Configuration section)
- **Optional Addition:** May add note about available endpoints (root and health check)
- **Preservation:** Existing hostname and port documentation remains accurate

### 0.4.2 Dependency Injections

**Assessment: Not Applicable**

This project does not utilize dependency injection patterns, service containers, or inversion of control frameworks. The single-file architecture with direct module imports does not require dependency injection configuration.

**Relevant Observations:**
- No service registration or dependency container exists
- No constructor injection or setter injection patterns present
- All dependencies (http, url modules) are directly imported at file top
- Server instance created directly via `http.createServer()` without intermediate abstractions

### 0.4.3 Database and Schema Updates

**Assessment: Not Applicable**

This project maintains completely stateless operation with no database connectivity:
- No database connection configuration
- No ORM or database client libraries
- No data models or schema definitions
- No migration files or schema management
- No persistent storage of any kind

The health check endpoint will report runtime metrics (`process.uptime()`) without requiring any data persistence or database interactions.

### 0.4.4 API Contract Integration

**New HTTP Endpoint Contract:**

**Endpoint:** `GET /health_check`

**Request Specifications:**
- **HTTP Method:** GET
- **Path:** `/health_check`
- **Headers:** None required
- **Query Parameters:** None
- **Request Body:** None

**Response Specifications - Success Case:**
- **HTTP Status Code:** 200 OK
- **Content-Type:** `application/json`
- **Response Body Schema:**
  ```json
  {
    "status": "ok",
    "uptime": <number>,
    "timestamp": <number>
  }
  ```
  - `status`: String literal "ok" indicating service health
  - `uptime`: Number of seconds the Node.js process has been running (from `process.uptime()`)
  - `timestamp`: Current Unix timestamp in milliseconds (from `Date.now()`)

**Example Response:**
```json
{
  "status": "ok",
  "uptime": 45.678,
  "timestamp": 1701234567890
}
```

**Existing Endpoint Contract (Preserved):**

**Endpoint:** `GET /` (and all other paths)

**Response Specifications:**
- **HTTP Status Code:** 200 OK
- **Content-Type:** `text/plain`
- **Response Body:** `Hello World!\n`

**Contract Preservation:** The existing endpoint contract remains completely unchanged for all paths except `/health_check`, ensuring full backward compatibility.

## 0.5 Technical Implementation

### 0.5.1 File-by-File Execution Plan

**Implementation Group 1 - Core Feature Implementation:**

**File:** `Hello_World_Node.js`
- **Action:** MODIFY
- **Purpose:** Implement health check endpoint with routing logic
- **Priority:** CRITICAL - Primary feature implementation
- **Specific Changes:**

  **Change 1: Add URL Module Import (Line 4)**
  - Insert new line after existing http import
  - Add: `const url = require('url');`
  - Enables pathname parsing for routing decisions

  **Change 2: Implement Routing Logic in Request Handler (Lines 8-20)**
  - Replace existing single-response handler with conditional routing
  - Parse incoming request URL using `url.parse(req.url, true)`
  - Implement conditional branching:
    - **If pathname === '/health_check':** Execute health check response logic
    - **Else:** Execute existing "Hello World!" response logic
  
  **Change 3: Health Check Response Handler**
  - Set status code to 200
  - Set Content-Type header to 'application/json'
  - Create response object with status, uptime, and timestamp
  - Serialize object using `JSON.stringify()`
  - Send response with `res.end()`

  **Change 4: Preserve Default Response**
  - Wrap existing response logic in else block
  - Maintain identical behavior for all non-health-check paths
  - Ensure root path `/` continues to return "Hello World!"

**Implementation Group 2 - Configuration Corrections:**

**File:** `package.json`
- **Action:** MODIFY
- **Purpose:** Fix entry point mismatch and ensure npm commands work correctly
- **Priority:** HIGH - Resolves existing bug that breaks npm start
- **Specific Changes:**

  **Change 1: Update Main Entry Point (Line 5)**
  - Current: `"main": "server.js"`
  - Update to: `"main": "Hello_World_Node.js"`
  - Corrects module entry point to actual implementation file

  **Change 2: Update Start Script (Line 7)**
  - Current: `"start": "node server.js"`
  - Update to: `"start": "node Hello_World_Node.js"`
  - Enables `npm start` to execute correctly

  **Change 3: Update Dev Script (Line 8)**
  - Current: `"dev": "node server.js"`
  - Update to: `"dev": "node Hello_World_Node.js"`
  - Enables `npm run dev` to execute correctly

**Implementation Group 3 - Documentation Updates:**

**File:** `README.md`
- **Action:** MODIFY
- **Purpose:** Document new health check endpoint functionality
- **Priority:** MEDIUM - Essential for user awareness and proper usage
- **Specific Changes:**

  **Change 1: Add Health Check Section (After Line 34)**
  - Insert new section titled "## Health Check Endpoint"
  - Document endpoint path: `/health_check`
  - Describe response format with example JSON
  - Provide usage examples with curl and browser
  - Explain monitoring use case

  **Change 2: Update Configuration Section (Optional)**
  - Add note about available endpoints
  - Clarify that both root and health check paths are available

  **Change 3: Update "How It Works" Section**
  - Add brief explanation of routing logic
  - Mention URL parsing for path-based request handling

### 0.5.2 Implementation Approach per File

**Phase 1 - Establish Core Feature (Hello_World_Node.js):**

**Step 1:** Add url module import to enable pathname extraction
- **Technical Approach:** Insert `const url = require('url');` after line 3
- **Validation:** Verify no syntax errors; module import succeeds

**Step 2:** Modify request handler to parse incoming URLs
- **Technical Approach:** Add `const parsedUrl = url.parse(req.url, true);` as first line in request handler
- **Validation:** Confirm parsedUrl.pathname contains request path

**Step 3:** Implement conditional routing logic
- **Technical Approach:** Wrap all response logic in if-else structure based on parsedUrl.pathname
- **Validation:** Test that different paths trigger different response branches

**Step 4:** Implement health check response branch
- **Technical Approach:**
  - Create healthData object: `{ status: 'ok', uptime: process.uptime(), timestamp: Date.now() }`
  - Set Content-Type to 'application/json'
  - Serialize object: `JSON.stringify(healthData)`
  - Send response: `res.end(jsonString)`
- **Validation:** Verify `/health_check` returns valid JSON with correct structure

**Step 5:** Preserve existing behavior in else branch
- **Technical Approach:** Move original response logic (lines 9-11) into else block unchanged
- **Validation:** Confirm root path `/` still returns "Hello World!"

**Phase 2 - Fix Configuration Issues (package.json):**

**Step 1:** Update main entry point field
- **Technical Approach:** Change line 5 from `"main": "server.js"` to `"main": "Hello_World_Node.js"`
- **Validation:** Verify JSON remains syntactically valid

**Step 2:** Update npm scripts
- **Technical Approach:** Replace `server.js` with `Hello_World_Node.js` in both start and dev scripts
- **Validation:** Execute `npm start` and verify server launches successfully

**Phase 3 - Document New Functionality (README.md):**

**Step 1:** Add health check endpoint section
- **Technical Approach:** Insert new markdown section with heading, description, and examples
- **Content Structure:**
  - Section title: "## Health Check Endpoint"
  - Endpoint description and purpose
  - Response format with example
  - Usage examples (curl and browser)
  - Monitoring use case explanation
- **Validation:** Render README to confirm markdown formatting is correct

**Step 2:** Update existing sections for completeness
- **Technical Approach:** Add routing explanation to "How It Works" section
- **Validation:** Ensure documentation accurately reflects implementation

**Execution Sequence:**
1. Modify `Hello_World_Node.js` (all changes as one cohesive update)
2. Fix `package.json` configuration
3. Update `README.md` documentation
4. Test complete implementation end-to-end
5. Verify both root and health check endpoints function correctly

**Success Criteria:**
- Server starts successfully on port 3000
- GET request to `/` returns "Hello World!" with Content-Type text/plain
- GET request to `/health_check` returns JSON with status, uptime, timestamp
- `npm start` command executes without errors
- README accurately documents both endpoints
- No external dependencies added
- Complete implementation remains under 30 lines of code

## 0.6 Scope Boundaries

### 0.6.1 Exhaustively In Scope

**Source Code Files:**
- `Hello_World_Node.js` (complete file modification)
  - Line 4: Add url module import statement
  - Lines 8-20: Implement routing logic and health check handler
  - All request handler logic for both health check and default paths

**Configuration Files:**
- `package.json` (targeted field updates)
  - Line 5: `main` field value correction
  - Line 7: `scripts.start` command correction
  - Line 8: `scripts.dev` command correction

**Documentation Files:**
- `README.md` (content additions)
  - New section: "Health Check Endpoint" (insert after Usage section)
  - Update to "How It Works" section (add routing explanation)
  - Optional update to Configuration section (available endpoints)

**Functional Scope:**

**Feature Implementation:**
- Health check endpoint accessible at `/health_check` path
- URL parsing and pathname-based routing logic
- JSON response generation for health check requests
- Process uptime reporting using `process.uptime()`
- Timestamp generation using `Date.now()`
- Content-Type header management for different response types
- Backward compatibility preservation for root path behavior

**Bug Fixes:**
- Entry point mismatch correction (package.json main field)
- NPM script corrections (start and dev commands)
- Enable proper execution of `npm start` and `npm run dev`

**Documentation:**
- Health check endpoint documentation with examples
- Response format specification
- Usage instructions for monitoring scenarios
- Updated architectural explanation including routing

**Testing and Validation:**
- Manual testing of health check endpoint (`GET /health_check`)
- Verification of existing endpoint (`GET /`)
- Validation of npm scripts execution
- Confirmation of JSON response structure
- Verification of uptime and timestamp values

### 0.6.2 Explicitly Out of Scope

**Advanced Routing Features:**
- Multi-path routing beyond health check and default
- Query parameter parsing or processing
- HTTP method differentiation (POST, PUT, DELETE handling)
- Path parameter extraction (e.g., `/users/:id`)
- Regular expression-based route matching
- Route middleware or handler chaining

**External Dependencies:**
- No Express.js or other routing frameworks
- No health check npm packages (express-healthcheck, @hmcts/nodejs-healthcheck)
- No external logging libraries
- No monitoring service integrations
- No validation libraries

**Advanced Health Check Features:**
- Database connectivity checks
- External API availability verification
- Memory usage metrics
- CPU utilization monitoring
- Disk space checks
- Custom health check logic for application-specific resources
- Separate liveness vs. readiness probes
- Health check authentication or authorization
- Detailed error diagnostics in health responses

**Infrastructure and Deployment:**
- Docker container configuration or Dockerfile
- Kubernetes deployment manifests
- Health check probe configuration for container orchestrators
- Load balancer integration
- Monitoring service configuration (Pingdom, New Relic, etc.)
- CI/CD pipeline modifications
- Production deployment procedures

**Performance Optimizations:**
- Response caching mechanisms
- Connection pooling
- Request rate limiting
- Performance monitoring or APM integration
- Load testing or stress testing

**Security Enhancements:**
- Authentication for health check endpoint
- Authorization or role-based access control
- Rate limiting for health check requests
- API key validation
- HTTPS/TLS configuration
- Security headers (CORS, CSP, etc.)

**Error Handling:**
- Custom error pages or error responses
- Error logging infrastructure
- Exception monitoring services
- Graceful degradation logic
- Circuit breaker patterns

**Refactoring:**
- Multi-file architecture migration
- Module extraction or code reorganization
- Code style standardization beyond existing patterns
- Test framework integration
- Linting or code quality tool setup

**Documentation Beyond Basic Usage:**
- API reference documentation generation
- Architecture diagrams
- Sequence diagrams
- OpenAPI/Swagger specification
- Contribution guidelines
- Development setup guides beyond existing README

**Testing Infrastructure:**
- Automated unit tests
- Integration test suites
- End-to-end testing frameworks
- Test coverage reporting
- Continuous testing pipeline

**Compatibility:**
- Node.js version migration beyond existing >=14.0.0 requirement
- Cross-platform compatibility testing
- Browser compatibility considerations
- Alternative runtime support (Deno, Bun)

**Operational Concerns:**
- Log aggregation or centralized logging
- Distributed tracing
- Metrics collection and dashboards
- Alerting configuration
- Incident response procedures
- SLA definitions or commitments

This scope definition ensures clarity: the implementation adds precisely one health check endpoint using only built-in Node.js modules, fixes the existing entry point bug, and documents the new functionality—nothing more, nothing less.

## 0.7 Special Instructions

### 0.7.1 Feature-Specific Requirements

**Educational Clarity Mandate:**

This project serves as a learning tool for developers new to Node.js. All code additions must maintain educational transparency:

- **Inline Comments Required:** Add explanatory comments for routing logic to clarify decision-making process for learners
- **Variable Naming:** Use descriptive variable names that self-document purpose (e.g., `parsedUrl`, `healthData`)
- **Code Simplicity:** Avoid clever shortcuts or compact syntax that obscures logic flow
- **Pattern Consistency:** Match existing code style exactly (indentation, spacing, naming conventions)

**Single-File Architecture Preservation:**

The project's defining characteristic is its single-file implementation:

- **No File Splitting:** All functionality must remain in `Hello_World_Node.js` - do not extract health check logic to separate modules
- **No Helper Functions:** Avoid creating separate utility functions or helper modules
- **Inline Implementation:** Health check logic should be implemented directly within the request handler conditional block
- **Line Count Target:** Keep complete implementation under 30 lines to maintain simplicity mandate

**Zero-Dependency Commitment:**

The project demonstrates Node.js capabilities without external packages:

- **Built-in Modules Only:** Use exclusively Node.js core modules (http, url, process)
- **No npm install Required:** Implementation must work immediately after Node.js installation
- **No package.json Dependencies:** Do not add any entries to dependencies or devDependencies fields
- **Standard Library Preferred:** Leverage built-in APIs even if external packages offer convenience

**Backward Compatibility Guarantee:**

Existing functionality must remain completely unchanged:

- **Root Path Behavior:** GET request to `/` must return identical response as before implementation
- **Response Format Preservation:** "Hello World!\\n" text with 'text/plain' Content-Type unchanged
- **Server Configuration:** hostname (127.0.0.1) and port (3000) remain constant
- **Startup Logging:** Console message format and content unchanged
- **Breaking Changes Forbidden:** No modifications that alter existing endpoint behavior

**JSON Response Structure:**

The health check endpoint must return a consistent, machine-parseable response:

- **Content-Type Strictness:** Always set 'application/json' header for health check responses
- **Schema Consistency:** Response object must always include status, uptime, and timestamp fields
- **Field Data Types:** status (string), uptime (number/float), timestamp (number/integer)
- **Status Value:** Always return "ok" for successful health checks (no "healthy", "UP", or other variants)
- **No Optional Fields:** Do not include conditional fields that may or may not appear

**Routing Logic Specificity:**

Request routing must be implemented with precise path matching:

- **Exact Path Match:** Use `parsedUrl.pathname === '/health_check'` (exact equality, not includes or regex)
- **Case Sensitivity:** Path matching is case-sensitive - `/health_check` only, not `/Health_Check` or `/HEALTH_CHECK`
- **Default Behavior:** All paths except `/health_check` should receive the original "Hello World!" response
- **No Path Normalization:** Do not strip trailing slashes or modify incoming paths

**Entry Point Correction Priority:**

The package.json fix is mandatory and must be completed:

- **Critical Bug:** Current configuration causes `npm start` to fail - this must be resolved
- **Consistency Requirement:** Update all three references to entry point filename (main, start script, dev script)
- **Testing Validation:** Verify `npm start` successfully launches server after changes
- **Documentation Alignment:** Ensure README usage instructions match corrected npm script commands

**Documentation Standards:**

README updates must follow existing documentation style:

- **Markdown Formatting:** Use consistent heading levels, code blocks, and list formatting matching existing sections
- **Example Quality:** Provide concrete examples with expected output (curl commands, browser URLs, response JSON)
- **Placement Logic:** Insert health check section after Usage (line 34) to maintain logical documentation flow
- **Brevity:** Keep documentation concise - aim for 10-15 lines for health check section
- **No Assumptions:** Document that the endpoint returns JSON (don't assume readers know what health checks are)

**Implementation Testing Requirements:**

Before considering implementation complete, validate:

1. **Server Starts Successfully:** `node Hello_World_Node.js` launches without errors
2. **Root Path Works:** `curl http://127.0.0.1:3000/` returns "Hello World!\\n"
3. **Health Check Works:** `curl http://127.0.0.1:3000/health_check` returns valid JSON
4. **NPM Scripts Work:** `npm start` launches server successfully
5. **Response Headers Correct:** Health check returns Content-Type: application/json
6. **JSON Valid:** Health check response parses as valid JSON with expected fields

**Performance Expectations:**

Given the synchronous, in-memory nature of the implementation:

- **Response Time:** Health check should respond in <10ms (no I/O operations)
- **No Blocking:** URL parsing and JSON serialization are synchronous but non-blocking for this use case
- **Memory Footprint:** Implementation should add <1KB to memory usage
- **Startup Impact:** No measurable impact on server startup time

**Security Posture Maintenance:**

Preserve existing security characteristics:

- **Localhost Binding:** Maintain 127.0.0.1 binding - never change to 0.0.0.0
- **No Data Exposure:** Health check response contains only generic runtime metrics, no sensitive data
- **No Authentication Bypass:** If authentication were added in future, health check endpoint would require same auth
- **Input Validation:** URL parsing handles malformed paths safely via built-in url.parse() robustness

