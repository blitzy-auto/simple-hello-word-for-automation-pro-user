# Technical Specification

# 0. Agent Action Plan

## 0.1 Intent Clarification

### 0.1.1 Core Feature Objective

**Based on the prompt, the Blitzy platform understands that the new feature requirement is to:**

Add a dedicated health check endpoint to the Node.js HTTP server that enables external monitoring systems, load balancers, and operational teams to programmatically verify that the service is operational and responding correctly. The health check endpoint will serve as a lightweight, standardized mechanism for service availability verification without requiring access to application-specific functionality.

**Enhanced Feature Requirements:**

- **Primary Requirement:** Create a `/health` endpoint that returns HTTP 200 status when the service is operational
- **Response Content:** Provide structured JSON response containing service status, uptime information, and timestamp
- **Non-Invasive Design:** Implement health check without disrupting existing "Hello World" functionality on root path (`/`)
- **Zero External Dependencies:** Maintain the project's zero-dependency philosophy using only Node.js built-in modules
- **Educational Value:** Demonstrate HTTP routing patterns and request URL inspection to learners

**Implicit Requirements Detected:**

- **URL Path Routing:** The current server responds identically to all requests regardless of path; health check requires path-based routing logic to distinguish `/health` requests from other requests
- **JSON Response Handling:** Current implementation only sends plain-text responses; health check endpoint requires JSON serialization and appropriate `Content-Type: application/json` header
- **Process Uptime Tracking:** Health check responses should include `process.uptime()` to provide meaningful operational metrics
- **Backward Compatibility:** Existing behavior for non-health-check paths (root `/` and all other paths) must remain unchanged, continuing to return "Hello World!" plain-text response
- **Documentation Updates:** README.md and package.json require updates to reflect new health check capability
- **Testing Verification:** Need to verify both health check endpoint functionality and preservation of existing "Hello World" behavior

**Feature Dependencies and Prerequisites:**

- **Prerequisite Feature:** F-001 (HTTP Server Initialization) - Health check requires server to be running
- **Prerequisite Feature:** F-002 (HTTP Request Acceptance) - Health check processes incoming HTTP requests through existing handler
- **Builds Upon:** F-003 (Response Generation) - Health check extends response generation with path-based routing and JSON support
- **No External Prerequisites:** Feature implementation requires no database, authentication system, or external service dependencies

### 0.1.2 Special Instructions and Constraints

**Critical Directives:**

- **Maintain Zero-Dependency Architecture:** Do not introduce npm packages such as Express, Koa, or dedicated health check libraries. Implementation must use exclusively Node.js built-in modules (`http` and `process`)
- **Preserve Educational Simplicity:** Keep implementation accessible to Node.js beginners; avoid advanced patterns like middleware chains, router frameworks, or complex abstractions
- **Maintain Localhost-Only Binding:** Continue binding to 127.0.0.1:3000 for security; do not expose health check to external networks
- **Backward Compatibility Requirement:** All existing paths, especially root `/`, must continue returning "Hello World!" plain-text response exactly as before

**Architectural Requirements:**

- **Follow Existing Patterns:** Implement health check within the existing request handler callback structure defined in `Hello_World_Node.js` lines 8-12
- **Use CommonJS Module System:** Continue using `require()` syntax for consistency with existing codebase
- **Single-File Architecture:** All health check logic must reside within `Hello_World_Node.js`; do not create separate route modules or health check files
- **Synchronous Response Pattern:** Maintain synchronous response generation pattern matching existing implementation style

**User Example:** *(No specific example provided by user)*

**Web Search Requirements:**

Research conducted on:
- <cite index="4-1,4-2">Node.js health check endpoint naming conventions: common choices include `/readyz` and `/livez` for Kubernetes environments</cite>
- <cite index="2-3">Recommended health check response data: response time, uptime, status code, and timestamp</cite>
- <cite index="4-12,4-13">Implementation approach: stick with minimal implementation without adding dependencies</cite>
- <cite index="1-1">Uptime tracking: process.uptime() method gets the number of seconds Node.js process has been running</cite>

### 0.1.3 Technical Interpretation

**These feature requirements translate to the following technical implementation strategy:**

To implement the health check endpoint, we will modify the existing request handler in `Hello_World_Node.js` to inspect the request URL path and conditionally generate responses based on the requested path. The implementation introduces path-based routing logic while maintaining the existing plain-text "Hello World!" response as the default behavior for all non-health-check requests.

**Technical Actions Mapped to Requirements:**

- **To enable URL-based routing**, we will examine `req.url` property within the request handler callback to distinguish `/health` requests from all other requests
- **To generate JSON health check responses**, we will create a JavaScript object containing `status`, `uptime`, and `timestamp` fields, serialize it using `JSON.stringify()`, set `Content-Type: application/json` header, and send via `res.end()`
- **To track process uptime**, we will invoke `process.uptime()` built-in Node.js API to calculate seconds elapsed since server startup
- **To maintain backward compatibility**, we will preserve the existing response logic as the `else` condition, ensuring all non-`/health` paths continue receiving the original "Hello World!\\n" plain-text response
- **To document the new capability**, we will update README.md with health check endpoint usage instructions, add examples of curl commands for testing, and update the "How It Works" section to explain routing logic
- **To update project metadata**, we will modify package.json description field and keywords array to reflect health monitoring capability
- **To enable verification**, we will provide manual testing procedures for both `/health` endpoint and existing root `/` behavior to confirm no regression

**Implementation Strategy Summary:**

The health check feature implementation follows a surgical modification approach: insert conditional routing logic (if-else statement based on `req.url`) at the beginning of the existing request handler, branch to health check response generation for `/health` path, and fall through to existing "Hello World!" logic for all other paths. This approach minimizes code disruption, preserves educational clarity, and maintains the project's minimalist philosophy while adding operationally valuable health check functionality.

## 0.2 Repository Scope Discovery

### 0.2.1 Comprehensive File Analysis

**Existing Files Requiring Modification:**

| File Path | Type | Modification Required | Rationale | Lines Affected (Approximate) |
|-----------|------|----------------------|-----------|------------------------------|
| `Hello_World_Node.js` | Source | Modify request handler to add routing logic and JSON response generation | Core implementation file for health check endpoint | Lines 8-12 (expand to ~25 lines) |
| `README.md` | Documentation | Add health check endpoint documentation, usage examples, and updated "How It Works" section | Users need instructions for using new health check feature | Add new section after line 43 |
| `package.json` | Configuration | Update description and keywords to reflect health monitoring capability | Package metadata should accurately describe project features | Lines 4, 10-14 |

**Integration Point Discovery:**

- **Request Handler Integration Point:**
  - File: `Hello_World_Node.js` lines 8-12
  - Current Behavior: Universal request handler accepting all HTTP methods and paths, returning identical plain-text response
  - Required Modification: Insert conditional logic using `req.url` to branch between health check JSON response and existing plain-text response
  - Integration Pattern: If-else conditional statement wrapping existing response generation logic

- **HTTP Response Generation:**
  - File: `Hello_World_Node.js` lines 9-11
  - Current Behavior: Sets status 200, Content-Type text/plain, sends "Hello World!\\n"
  - Required Extension: Add parallel path for health check responses with Content-Type application/json and structured JSON body
  - Integration Pattern: Conditional response generation based on request path

- **Process Module Integration:**
  - File: `Hello_World_Node.js` (new import required)
  - Current State: No process module explicitly imported (available as global)
  - Required Addition: None (process is globally available in Node.js)
  - Usage: Call `process.uptime()` within health check response generation

**Search Patterns Executed:**

```bash
# Searched for existing health check implementations
grep -r "health" . 
# Result: No existing health check references found

#### Verified project structure
ls -la
#### Result: 3 files identified - Hello_World_Node.js, README.md, package.json

#### Checked for configuration files
find . -name "*.config.*" -o -name "*.json" -o -name "*.yaml"
#### Result: Only package.json found (no additional config files)

#### Verified no test directory exists
find . -type d -name "test*" -o -name "*spec*"
#### Result: No test files or directories present
```

**Files NOT Requiring Modification:**

- `.git/` directory - Version control metadata unaffected by feature implementation
- No test files exist - Project currently has no test infrastructure
- No CI/CD configuration files exist - No GitHub Actions, CircleCI, or Travis CI configs found
- No Docker files exist - No containerization configuration present
- No environment files - No .env, .env.example, or similar configuration files

**Impact Analysis:**

- **Zero Breaking Changes:** Health check implementation adds new functionality without modifying existing response behavior for non-health-check paths
- **Single File Core Change:** Primary implementation contained within one source file (Hello_World_Node.js)
- **Documentation Alignment:** README and package.json updates maintain consistency with actual implementation
- **No Database/Schema Changes:** Feature requires no persistent storage, migrations, or schema modifications
- **No API Contract Changes:** Existing root path (`/`) behavior remains unchanged; new `/health` path is purely additive

### 0.2.2 Web Search Research Conducted

**Best Practices for Node.js Health Check Implementation:**

Research Topic: Health check endpoint patterns and conventions
- <cite index="4-1,4-2">Common endpoint naming: `/readyz` and `/livez` are used in Kubernetes environments; `/health` or `/healthcheck` are general-purpose alternatives</cite>
- <cite index="4-21,4-22">`/healthz` is ambiguous between liveness and readiness; clearer naming preferred</cite>
- Decision: Use `/health` as the most universally recognized and clear endpoint name for educational purposes

Research Topic: Health check response structure and content
- <cite index="2-18">Recommended response data includes: response time, uptime, status code (200 for "OK"), and timestamp</cite>
- <cite index="1-1">process.uptime() built-in API provides seconds the Node.js process has been running</cite>
- Decision: Include `status`, `uptime` (from process.uptime()), and `timestamp` (ISO 8601 format) in JSON response

Research Topic: Dependency management for health checks
- <cite index="4-12,4-13">Minimal implementation recommended without adding dependencies; better to add code directly than introduce new dependency</cite>
- <cite index="8-12,8-13,8-14">Don't use modules for health checks; stick with minimal implementation; tradeoff favors direct code over dependency costs</cite>
- Decision: Implement health check using only Node.js built-in capabilities, maintaining zero-dependency architecture

Research Topic: Health check complexity and scope
- <cite index="8-6,8-7,8-8">Avoid excessive internal state checks for liveness probes; checking database availability can cause more harm by triggering unnecessary restarts</cite>
- Decision: Implement simple response-based health check that verifies HTTP server is accepting and processing requests

Research Topic: Security considerations
- <cite index="9-4,9-5,9-20">Public health endpoints may be attacked; strategies include adding private headers</cite>
- Decision: Current localhost-only binding (127.0.0.1) provides adequate security for educational project; no additional authentication required

**Library and Pattern Recommendations:**

For production systems, libraries like `@hmcts/nodejs-healthcheck` or `express-healthcheck` provide comprehensive health monitoring. However, consistent with research findings and project philosophy, this implementation uses zero external libraries to maintain educational clarity and immediate executability.

**Common Patterns for Simple Health Checks:**

Pattern identified from research: Return JSON object with status indicator and operational metrics, use HTTP 200 for healthy state, optionally use HTTP 503 for unhealthy state (not applicable to this simple implementation).

### 0.2.3 New File Requirements

**Status:** No new files required

This feature implementation follows the project's single-file architecture philosophy. All health check functionality will be integrated into the existing `Hello_World_Node.js` file through conditional logic within the request handler. 

**Rationale for No New Files:**

- **Educational Simplicity:** Single-file architecture maximizes comprehension for learners
- **Zero Configuration Overhead:** No route configuration files, no controller modules, no separation of concerns beyond what exists
- **Consistency with Existing Pattern:** Project intentionally avoids modular architecture to demonstrate fundamental HTTP server concepts
- **Minimal Cognitive Load:** All functionality remains visible in <30 lines of code within single file

**Files That Will NOT Be Created:**

- `src/routes/health.js` - Not created (no modular architecture)
- `src/controllers/healthController.js` - Not created (no MVC pattern)
- `config/health_settings.yaml` - Not created (no configuration required)
- `tests/health_test.js` - Not created (no test infrastructure exists)
- `tests/integration/health_integration_test.js` - Not created (no test infrastructure exists)
- `.env.example` - Not created (no environment variables required)
- `docs/features/health_check.md` - Not created (README.md serves as comprehensive documentation)

## 0.3 Dependency Inventory

### 0.3.1 Private and Public Packages

**Key Dependencies for Health Check Feature Implementation:**

| Registry | Package Name | Version | Purpose | Usage Context |
|----------|--------------|---------|---------|---------------|
| Node.js Built-in | `http` | N/A (core module) | HTTP server creation and request/response handling | Already imported; used for existing server and health check endpoint |
| Node.js Built-in | `process` | N/A (global object) | Access to process uptime information | NEW: Used in health check to report `process.uptime()` |
| Node.js Built-in | `JSON` | N/A (global object) | JSON serialization for health check response | NEW: Used via `JSON.stringify()` for response formatting |

**Analysis of Version Requirements:**

All dependencies are Node.js built-in modules and global objects available in Node.js >=14.0.0 as specified in `package.json` line 19. No version pinning required as these are stable, core Node.js APIs that maintain backward compatibility across supported Node.js versions.

**External Package Status:**

- **Zero npm Dependencies:** Project intentionally maintains zero external dependencies to ensure immediate executability
- **No package-lock.json:** No lock file exists or will be created; no dependency resolution required
- **No node_modules:** No dependency installation step required; `npm install` remains unnecessary
- **Production-Ready Core APIs:** All used modules (`http`, `process`, `JSON`) are production-grade, battle-tested Node.js core capabilities

**Dependency Validation:**

```javascript
// Existing import (line 3 of Hello_World_Node.js)
const http = require('http');  // ✓ Already present

// Global objects (no import required)
process.uptime();  // ✓ Available in all Node.js versions >=14.0.0
JSON.stringify();  // ✓ Available in all Node.js versions >=14.0.0
```

### 0.3.2 Dependency Updates

**Status:** No dependency updates required

**Import Updates:**

No new imports or modifications to existing imports are required for this feature implementation. The health check feature utilizes:

- **Existing Import:** `const http = require('http');` (line 3) - Already present, no modification needed
- **Global Objects:** `process` and `JSON` are globally available in Node.js runtime and require no explicit import statements

**Files Requiring Import Updates:**

| File Pattern | Current State | Required Change | Rationale |
|--------------|---------------|-----------------|-----------|
| `Hello_World_Node.js` | `const http = require('http');` at line 3 | No change required | Existing import sufficient |
| No other files | N/A | N/A | Single-file architecture |

**Import Transformation Rules:**

No import transformations required. The implementation follows this pattern:

```javascript
// BEFORE (existing - unchanged):
const http = require('http');

// AFTER (identical - no modification):
const http = require('http');
// Note: process and JSON are global objects, no require() needed
```

**External Reference Updates:**

**Configuration Files:**

- `package.json`:
  - Line 4: Update `description` field to mention health check capability
  - Lines 10-14: Add "health-check" and "monitoring" to `keywords` array
  - Lines 18-20: No change to `engines` field (Node.js >=14.0.0 remains valid)
  - No changes to `dependencies` or `devDependencies` (none exist, none added)

**Documentation Files:**

- `README.md`:
  - Add new section documenting `/health` endpoint usage
  - Update "How It Works" section (lines 40-43) to explain routing logic
  - Add example curl commands for testing health endpoint
  - No changes to Prerequisites section (lines 5-7) - Node.js requirement unchanged

**Build Files:**

- No build files exist (`setup.py`, `pyproject.toml`, `package-lock.json`, `webpack.config.js`, etc.)
- No build process modifications required
- No bundling or compilation steps introduced

**CI/CD Configuration:**

- No CI/CD files exist (`.github/workflows/*.yml`, `.gitlab-ci.yml`, `.travis.yml`, `circle.yml`, etc.)
- No continuous integration modifications required
- No deployment pipeline changes needed

**Summary of Dependency Impact:**

This health check implementation exemplifies zero-dependency feature addition. No npm packages are installed, no lock files are generated, no vulnerability scanning is required, no license compatibility checks are needed, and no dependency update maintenance burden is introduced. The feature leverages exclusively Node.js core capabilities available since Node.js 0.10.x, ensuring maximum compatibility and immediate executability.

## 0.4 Integration Analysis

### 0.4.1 Existing Code Touchpoints

**Direct Modifications Required:**

**1. Hello_World_Node.js - Request Handler Function (Lines 8-12)**

**Current Implementation:**
```javascript
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});
```

**Integration Point:** Request handler callback function
**Modification Type:** Conditional routing logic insertion
**Approximate New Lines:** Lines 8-29 (expand from 5 lines to ~22 lines)

**Changes Required:**
- Insert conditional statement checking `req.url` value
- Branch to health check response generation when `req.url === '/health'`
- Preserve existing response logic as default/else case for all other paths
- Add JSON response structure creation for health endpoint
- Add `process.uptime()` invocation for uptime metrics
- Add `new Date().toISOString()` for timestamp generation

**Integration Strategy:**
```javascript
const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    // NEW: Health check response path
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const healthData = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };
    res.end(JSON.stringify(healthData));
  } else {
    // EXISTING: Preserved "Hello World" response (unchanged logic)
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});
```

**Impact:** Zero breaking changes; existing behavior preserved for all non-`/health` paths

**2. README.md - Documentation Updates (Multiple Insertion Points)**

**Current Section:** Usage (lines 13-35)
**Integration Point:** After line 35, before "Stopping the Server" section
**Modification Type:** New subsection insertion

**Changes Required:**
- Add new section titled "Testing the Health Check Endpoint"
- Document health check endpoint URL: `http://127.0.0.1:3000/health`
- Provide curl command example
- Show expected JSON response structure
- Explain response fields (`status`, `uptime`, `timestamp`)

**Current Section:** How It Works (lines 40-43)
**Integration Point:** Expand existing explanation
**Modification Type:** Content enhancement

**Changes Required:**
- Update description to explain routing logic based on request URL
- Document conditional response generation (JSON for `/health`, plain-text for other paths)
- Explain process.uptime() usage for operational metrics

**3. package.json - Metadata Updates (Lines 4, 10-14)**

**Current Description (Line 4):**
```json
"description": "A simple Hello World Node.js HTTP server application"
```

**Modified Description:**
```json
"description": "A simple Hello World Node.js HTTP server application with health check endpoint"
```

**Current Keywords (Lines 10-14):**
```json
"keywords": [
  "hello-world",
  "nodejs",
  "http-server",
  "example"
]
```

**Modified Keywords:**
```json
"keywords": [
  "hello-world",
  "nodejs",
  "http-server",
  "example",
  "health-check",
  "monitoring"
]
```

**Dependency Injections:**

**Status:** Not applicable - No dependency injection framework in use

This project does not use dependency injection patterns, service containers, or IoC (Inversion of Control) frameworks. All functionality is self-contained within a single request handler callback function. Health check logic is directly embedded within the request handler through conditional branching.

**Patterns NOT Used:**
- No service registration (no Express app.use(), no Koa app.use(), no Fastify register())
- No dependency injection containers (no InversifyJS, no TypeDI, no Awilix)
- No middleware chains (no connect, no express middleware)
- No router modules (no express.Router(), no koa-router)

**Database/Schema Updates:**

**Status:** Not applicable - No database in use

This project maintains zero database dependencies and requires no data persistence. Health check endpoint retrieves real-time process metrics (uptime, timestamp) from Node.js runtime without querying persistent storage.

**No Changes Required For:**
- Database migrations (no migration files exist)
- Schema definitions (no schema files exist)
- ORM models (no Sequelize, TypeORM, Mongoose, or Prisma in use)
- Database connection configuration (no connection strings, no database credentials)
- Seed data (no data fixtures required)

**Environment Variable Updates:**

**Status:** Not applicable - No environment variables used

The project hardcodes configuration values (`hostname = '127.0.0.1'`, `port = 3000`) and requires no environment-based configuration. Health check endpoint inherits existing hostname and port configuration without introducing new environment variables.

**No .env or .env.example files** exist or will be created.

**Integration Testing Touchpoints:**

**Status:** No test infrastructure exists

The project currently has no test files, no test framework, and no automated testing infrastructure. Health check verification will rely on manual testing procedures documented in README.md.

**Manual Testing Approach:**
- Start server: `node Hello_World_Node.js`
- Test health endpoint: `curl http://127.0.0.1:3000/health`
- Verify existing behavior: `curl http://127.0.0.1:3000/`
- Browser testing: Navigate to both URLs and confirm expected responses

**Integration Summary:**

All modifications are surgical, localized, and non-breaking. The health check feature integrates through a single conditional statement within the existing request handler, preserving all original behavior while adding new functionality accessible via URL-based routing. Documentation updates maintain consistency between implementation and usage instructions.

## 0.5 Technical Implementation

### 0.5.1 File-by-File Execution Plan

**CRITICAL:** Every file listed here MUST be modified. No files will be created.

**Group 1 - Core Feature Implementation**

**File 1: `Hello_World_Node.js` - MODIFY**

**Purpose:** Implement health check endpoint routing and JSON response generation

**Current State:** Lines 1-17 (17 lines total) - Universal request handler returning "Hello World!" for all requests

**Target State:** Lines 1-30 (expand to ~30 lines) - Conditional request handler with path-based routing

**Specific Modifications:**

Line 8-12 (Current request handler) → Lines 8-29 (New conditional handler):
- Insert `if (req.url === '/health')` conditional at line 8
- Add health check response branch (lines 9-18):
  - Set statusCode to 200
  - Set Content-Type header to 'application/json'
  - Create healthData object with status, uptime, and timestamp
  - Serialize with JSON.stringify() and send via res.end()
- Add `else` branch (lines 19-23):
  - Preserve existing "Hello World!" response logic
  - Maintain text/plain Content-Type
  - Maintain identical response body 'Hello World!\\n'
- Close conditional structure

**Implementation Pseudocode:**
```javascript
// Lines 8-29 (replacing lines 8-12)
const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    const healthData = {
      status: 'ok',
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };
    res.end(JSON.stringify(healthData));
  } else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World!\n');
  }
});
```

**Verification Points:**
- Health endpoint returns JSON with correct Content-Type
- Root path still returns plain-text "Hello World!"
- All other paths return plain-text "Hello World!" (default behavior)
- process.uptime() returns numeric seconds
- timestamp in ISO 8601 format

---

**Group 2 - Documentation Updates**

**File 2: `README.md` - MODIFY**

**Purpose:** Document health check endpoint usage and update architecture explanation

**Modification 1: Add Health Check Usage Section**

**Location:** After line 35 (after existing "Usage" section content), before line 37 ("## Stopping the Server")

**Content to Insert:**
```
7. Test the health check endpoint (optional):
   ```bash
   curl http://127.0.0.1:3000/health
   ```

   or visit in your browser:
   ```
   http://127.0.0.1:3000/health
   ```

8. You will see a JSON response with server health information:
   ```json
   {
     "status": "ok",
     "uptime": 123.456,
     "timestamp": "2024-01-01T12:00:00.000Z"
   }
   ```

   - `status`: Always returns "ok" when server is running
   - `uptime`: Number of seconds the server has been running
   - `timestamp`: Current server time in ISO 8601 format
```

**Modification 2: Update "How It Works" Section**

**Location:** Lines 40-43 (existing "How It Works" section)

**Current Content:**
```
## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. When a request is received, the server responds with a status code of 200 and sends "Hello World!" as plain text.
```

**Updated Content:**
```
## How It Works

The application creates an HTTP server using Node.js's built-in `http` module. When a request is received, the server inspects the request URL:

- **Health Check Path (`/health`)**: Returns a JSON response containing server status, uptime (seconds since startup), and current timestamp. This endpoint enables monitoring systems to verify the server is operational.

- **All Other Paths**: Returns "Hello World!" as plain text with a 200 status code, maintaining the simple "Hello World" behavior.

The server uses `process.uptime()` to track how long it has been running and `JSON.stringify()` to format health check responses.
```

---

**File 3: `package.json` - MODIFY**

**Purpose:** Update package metadata to reflect health check capability

**Modification 1: Update Description**

**Location:** Line 4

**Current Value:**
```json
"description": "A simple Hello World Node.js HTTP server application",
```

**New Value:**
```json
"description": "A simple Hello World Node.js HTTP server application with health check endpoint",
```

**Modification 2: Add Health Check Keywords**

**Location:** Lines 10-14

**Current Value:**
```json
"keywords": [
  "hello-world",
  "nodejs",
  "http-server",
  "example"
],
```

**New Value:**
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

**All Other Fields:** Remain unchanged (version, main, scripts, author, license, engines)

---

**Group 3 - Verification and Testing**

**No Test Files to Create:** Project intentionally has no test infrastructure

**Manual Verification Procedures (to be documented in README):**

1. Start server and verify startup message appears
2. Execute: `curl http://127.0.0.1:3000/` → Expect "Hello World!\\n" plain text
3. Execute: `curl http://127.0.0.1:3000/health` → Expect JSON with status/uptime/timestamp
4. Execute: `curl http://127.0.0.1:3000/anyotherpath` → Expect "Hello World!\\n" plain text
5. Browser test: Navigate to http://127.0.0.1:3000 → See "Hello World!"
6. Browser test: Navigate to http://127.0.0.1:3000/health → See formatted JSON
7. Verify uptime increments on subsequent health check requests
8. Verify timestamp reflects current server time

### 0.5.2 Implementation Approach per File

**Sequential Implementation Flow:**

**Phase 1: Core Implementation (Hello_World_Node.js)**

**Step 1:** Open `Hello_World_Node.js` in editor
**Step 2:** Locate request handler callback (lines 8-12)
**Step 3:** Replace callback body with conditional routing logic
**Step 4:** Implement health check response branch with JSON generation
**Step 5:** Preserve existing "Hello World" response in else branch
**Step 6:** Save file and verify syntax (no require() changes needed)
**Step 7:** Test manually: `node Hello_World_Node.js`

**Validation:** Server starts without errors, console shows startup message

---

**Phase 2: Functional Verification**

**Step 1:** With server running, test health endpoint:
```bash
curl http://127.0.0.1:3000/health
```
**Expected Output:**
```json
{"status":"ok","uptime":5.123,"timestamp":"2024-11-24T20:45:00.000Z"}
```

**Step 2:** Verify existing functionality preserved:
```bash
curl http://127.0.0.1:3000/
```
**Expected Output:**
```
Hello World!
```

**Step 3:** Verify default behavior for arbitrary paths:
```bash
curl http://127.0.0.1:3000/anything
```
**Expected Output:**
```
Hello World!
```

---

**Phase 3: Documentation Updates (README.md)**

**Step 1:** Open README.md in editor
**Step 2:** Locate Usage section (after line 35)
**Step 3:** Insert health check testing instructions (steps 7-8 from content above)
**Step 4:** Locate "How It Works" section (lines 40-43)
**Step 5:** Replace with updated explanation covering routing logic
**Step 6:** Save file and verify markdown formatting

**Validation:** README renders correctly, examples are copy-pasteable

---

**Phase 4: Metadata Updates (package.json)**

**Step 1:** Open package.json in editor
**Step 2:** Modify description field (line 4) to include "with health check endpoint"
**Step 3:** Add "health-check" and "monitoring" to keywords array (lines 10-14)
**Step 4:** Save file and verify JSON syntax with `npm install --dry-run` (should succeed without actual installation)

**Validation:** package.json parses correctly, npm recognizes valid format

---

**Phase 5: Final Integration Testing**

**Step 1:** Restart server to ensure clean state
**Step 2:** Execute complete test suite (all curl commands from Phase 2)
**Step 3:** Verify browser access to both endpoints
**Step 4:** Check uptime increments over time by calling `/health` multiple times with delay
**Step 5:** Confirm README instructions are accurate by following them step-by-step

---

**Implementation Philosophy:**

This implementation follows a **defensive enhancement pattern**: establish feature foundation by implementing core routing logic first, verify functionality through manual testing before proceeding to documentation, then ensure quality by updating all supporting documentation to maintain consistency between code and user-facing information. Each phase can be validated independently, enabling rapid detection of issues and maintaining project stability throughout feature addition.

## 0.6 Scope Boundaries

### 0.6.1 Exhaustively In Scope

**Source Files - Direct Modifications:**

- `Hello_World_Node.js` - Complete file modification
  - Lines 8-12 → Lines 8-29 (request handler expansion with routing logic)
  - Add conditional `if (req.url === '/health')` statement
  - Add JSON response generation for health endpoint
  - Add process.uptime() invocation
  - Add timestamp generation with new Date().toISOString()
  - Preserve existing "Hello World!" response in else branch
  - Verification: Both `/health` and `/` endpoints function correctly

**Documentation Files - Content Updates:**

- `README.md` - Multiple section updates
  - Lines 36-60 (new): Add health check testing instructions after existing Usage section
  - Lines 40-43 (existing): Expand "How It Works" section with routing explanation
  - Add curl command examples for `/health` endpoint
  - Add expected JSON response format example
  - Add explanation of health response fields (status, uptime, timestamp)
  - Verification: All examples are executable and produce documented results

**Configuration Files - Metadata Updates:**

- `package.json` - Targeted field modifications
  - Line 4: Update `description` field to include health check mention
  - Lines 10-16 (expanded from 10-14): Add "health-check" and "monitoring" keywords
  - No changes to: version, main, scripts, author, license, engines fields
  - Verification: Valid JSON syntax, npm recognizes package correctly

**Implementation Artifacts:**

- Health check response format: `{"status":"ok","uptime":123.456,"timestamp":"2024-11-24T20:45:00.000Z"}`
- HTTP status codes used: 200 (OK) for both endpoints
- Content-Type headers: application/json for `/health`, text/plain for all other paths
- Request routing logic: URL path inspection using `req.url` property
- Uptime calculation: `process.uptime()` returns seconds as floating-point number
- Timestamp format: ISO 8601 (UTC) via `new Date().toISOString()`

**Manual Testing Procedures:**

- Start server: `node Hello_World_Node.js`
- Test health endpoint: `curl http://127.0.0.1:3000/health` (expect JSON)
- Test root endpoint: `curl http://127.0.0.1:3000/` (expect "Hello World!")
- Test arbitrary paths: `curl http://127.0.0.1:3000/xyz` (expect "Hello World!")
- Browser verification: Navigate to both endpoints, verify responses
- Uptime verification: Request `/health` multiple times, confirm uptime increases
- Documentation verification: Follow README instructions, confirm accuracy

**Behavioral Preservation Requirements:**

- Root path `/` behavior: MUST return "Hello World!\\n" as plain text with status 200
- All non-health paths: MUST return "Hello World!\\n" (default behavior preserved)
- Server startup: MUST log "Server running at http://127.0.0.1:3000/" (unchanged)
- Network binding: MUST continue using 127.0.0.1:3000 (localhost only)
- CommonJS module system: MUST continue using `require()` syntax (no ESM migration)
- Zero dependencies: MUST maintain zero npm packages (no package installation)

**Quality Assurance Checkpoints:**

- Syntax validation: Node.js executes file without parse errors
- Runtime validation: Server starts successfully and logs startup message
- Functional validation: Health endpoint returns valid JSON with correct Content-Type
- Regression validation: Existing root path returns original "Hello World!" response
- Documentation validation: README instructions produce documented results
- Metadata validation: package.json contains valid JSON and accurate description

### 0.6.2 Explicitly Out of Scope

**Advanced Health Check Features - NOT Implemented:**

- Health status codes (503 Service Unavailable) - Simple implementation always returns 200
- Readiness vs. liveness probes - Single endpoint serves both purposes
- Configurable health check path - Hardcoded to `/health` (no environment variable)
- Health check authentication - No API keys, no header validation, no token verification
- Detailed dependency checks - No database connectivity tests, no external service pinging
- Prometheus metrics endpoint - No `/metrics` endpoint, no metric collection
- Custom health check logic - No pluggable health check functions, no extensibility hooks
- Response time tracking - No latency metrics, no performance monitoring
- Request logging for health checks - No access logs, no request ID tracking

**Framework and Library Additions - NOT Included:**

- Express.js framework - Maintaining pure Node.js http module usage
- express-healthcheck npm package - Zero-dependency requirement maintained
- @hmcts/nodejs-healthcheck library - No external health check libraries
- Any routing library (koa-router, express-router, etc.) - Manual routing only
- Any JSON middleware packages - Using native JSON.stringify()
- Any logging frameworks (Winston, Bunyan, Pino) - console.log only
- Any monitoring SDKs (Datadog, New Relic, AppDynamics) - No APM integration

**Infrastructure and Deployment Changes - NOT Performed:**

- Docker container updates - No Dockerfile modifications (none exists)
- Kubernetes health check probes - No k8s manifests to update (none exist)
- Load balancer configuration - No ALB/NLB/ELB target group health checks
- CI/CD pipeline modifications - No GitHub Actions, no Travis CI updates
- Port configuration changes - Health check uses same port 3000 as existing server
- Environment-specific configurations - No development/staging/production variants
- Service mesh integration - No Istio, no Linkerd, no Consul Connect

**Testing Infrastructure - NOT Created:**

- Unit test files - No Jest, no Mocha, no test framework installation
- Integration test files - No Supertest, no API testing framework
- Test configuration - No jest.config.js, no mocha.opts, no test scripts
- Code coverage tooling - No Istanbul/nyc, no coverage reports
- Test data fixtures - No mock responses, no test data generators
- Automated test execution - No npm test script additions, no pre-commit hooks

**Alternative Endpoint Patterns - NOT Implemented:**

- `/healthz` endpoint - Only `/health` implemented
- `/livez` endpoint - No separate liveness probe endpoint
- `/readyz` endpoint - No separate readiness probe endpoint  
- `/status` endpoint - No alternative naming conventions
- `/ping` endpoint - No ping endpoint separate from health check
- `/api/health` endpoint - No API versioning or namespacing
- Multiple health check endpoints - Single unified endpoint only

**Advanced Routing Features - NOT Implemented:**

- HTTP method filtering - Health check accepts all methods (GET, POST, PUT, DELETE, etc.)
- Query parameter parsing - No ?format=json, no query string handling
- Request header inspection - No Accept header negotiation, no content negotiation
- URL pattern matching - Exact `/health` match only, no regex routing, no wildcards
- Route middleware - No pre-handlers, no post-handlers, no middleware chains
- Request body parsing - No body parser, no form data handling, no file uploads

**Security Enhancements - NOT Implemented:**

- Rate limiting - No request throttling, unlimited health check requests
- API key authentication - No Authorization headers, no API tokens
- IP whitelisting - Localhost binding provides security, no additional IP filtering
- HTTPS/TLS - HTTP only, no SSL certificate configuration
- CORS headers - No Cross-Origin Resource Sharing configuration
- Security headers - No Helmet.js, no CSP, no X-Frame-Options

**Monitoring and Observability - NOT Included:**

- Structured logging - No log levels, no JSON log format, no log aggregation
- Distributed tracing - No OpenTelemetry, no Jaeger, no Zipkin integration
- Metrics collection - No StatsD, no Prometheus client, no metric exports
- Error tracking - No Sentry, no Rollbar, no error aggregation services
- Performance monitoring - No APM agents, no performance profiling
- Uptime monitoring services - No Pingdom, no StatusCake, no external monitors

**Backward Compatibility Breaks - NOT Introduced:**

- Port changes - No modification to port 3000 configuration
- Hostname changes - No modification to 127.0.0.1 localhost binding
- Response format changes for existing paths - Root `/` maintains exact response
- Server startup behavior changes - Startup message remains identical
- Module system changes - CommonJS `require()` syntax preserved (no ESM)
- Node.js version requirement changes - Minimum version remains >=14.0.0

**Documentation NOT Created:**

- Separate health check documentation file - All documentation in README.md
- API specification documents - No OpenAPI/Swagger specification
- Architecture decision records - No ADR documents for health check design
- Runbook documentation - No operational procedures beyond README
- Troubleshooting guides - No dedicated troubleshooting documentation
- Performance benchmarks - No load testing results, no benchmark documentation

This comprehensive out-of-scope definition ensures clear boundaries for the health check feature implementation, preventing scope creep while maintaining focus on the core requirement: adding a simple, dependency-free health check endpoint that confirms server operational status.

## 0.7 Special Instructions for Feature Addition

### 0.7.1 Feature-Specific Implementation Requirements

**Educational Clarity Preservation:**

The primary purpose of this project is educational demonstration of Node.js fundamentals. The health check implementation must maintain this educational clarity by:

- **Avoiding Abstraction Layers:** Do not introduce router classes, middleware functions, or helper utilities. All logic must remain inline within the request handler callback to maintain visibility and comprehension for learners.

- **Preserving Line-of-Sight Execution:** The entire request processing flow from HTTP request reception to response generation must remain traceable within a single visual scroll of the code editor (<30 lines total).

- **Minimizing Cognitive Complexity:** Health check logic should be understandable to a developer with 1 hour of Node.js experience. Avoid advanced patterns like async/await (not needed), Promise chains, event emitters beyond http.createServer, or stream manipulation.

- **Maintaining Self-Contained Examples:** The health check endpoint should demonstrate URL routing and JSON response generation without requiring readers to understand external modules, configuration files, or architectural patterns beyond basic if-else conditionals.

**Zero-Dependency Architecture Requirement:**

This is a **non-negotiable constraint**. The implementation MUST NOT introduce any npm packages including:

- **NO Express.js or routing frameworks** - Despite being standard practice in production Node.js applications, this project intentionally demonstrates HTTP server fundamentals without framework abstractions
- **NO health check libraries** - Packages like `express-healthcheck`, `@hmcts/nodejs-healthcheck`, or `terminus` are explicitly prohibited despite offering comprehensive health monitoring features
- **NO JSON middleware** - Native `JSON.stringify()` MUST be used instead of body-parser, express.json(), or similar middleware
- **NO testing frameworks** - No Jest, Mocha, Jasmine, or similar frameworks; manual testing documented in README is the verification approach
- **NO development dependencies** - No nodemon, no prettier, no eslint; maintaining zero entries in both `dependencies` and `devDependencies` in package.json

**Rationale:** The zero-dependency architecture ensures immediate executability after Node.js installation, demonstrates core capabilities without external abstractions, and teaches developers that sophisticated functionality can be achieved with built-in Node.js modules alone.

**Backward Compatibility Mandate:**

The health check feature is **purely additive**. All existing functionality MUST remain byte-for-byte identical:

- **Root Path Response:** `curl http://127.0.0.1:3000/` MUST return exactly "Hello World!\\n" (including newline character) with Content-Type: text/plain
- **Default Path Behavior:** Any path other than `/health` (e.g., `/foo`, `/api`, `/test`) MUST return "Hello World!\\n" with identical headers
- **Startup Logging:** Console output "Server running at http://127.0.0.1:3000/" MUST remain unchanged in format, timing, and content
- **Network Configuration:** Server MUST continue binding to 127.0.0.1:3000 without port or hostname modifications
- **Error Handling:** Existing error handling behavior (or lack thereof) MUST remain unchanged; no new try-catch blocks around existing code

**Verification Command:**
```bash
# Before and after implementation, this MUST produce identical output:
curl http://127.0.0.1:3000/ && echo "---" && curl http://127.0.0.1:3000/anything
```

**JSON Response Format Specification:**

The health check endpoint MUST return a JSON object with exactly these three fields, no more, no less:

```json
{
  "status": "ok",
  "uptime": 123.456,
  "timestamp": "2024-11-24T20:45:00.000Z"
}
```

**Field Requirements:**
- **status:** String literal "ok" (lowercase) - No dynamic status values (healthy/unhealthy), no status codes, no additional status levels
- **uptime:** Floating-point number representing seconds from `process.uptime()` - No rounding, no string formatting, no unit conversions
- **timestamp:** ISO 8601 UTC timestamp string from `new Date().toISOString()` - No custom date formats, no timezone conversions, no Unix timestamps

**Content-Type MUST be:** `application/json` (not `application/json; charset=utf-8` or any variant)

**HTTP Status Code MUST be:** 200 (not 201, not 204, always 200 regardless of server state)

**Single-File Architecture Enforcement:**

All health check functionality MUST reside within `Hello_World_Node.js`. Do NOT create:

- `routes/health.js` - No route modules
- `controllers/healthController.js` - No controller pattern
- `middleware/healthCheck.js` - No middleware files
- `lib/health.js` - No utility libraries
- `config/healthConfig.js` - No configuration files

**Justification:** The single-file architecture is intentional pedagogy. Breaking into modules would defeat the educational purpose of showing complete HTTP server implementation in one comprehensible file.

**Documentation Completeness Requirement:**

README.md updates MUST enable a complete novice to:

1. **Understand the new functionality** - Explain what a health check is and why it exists in simple language
2. **Execute health check testing** - Provide exact curl commands that work copy-paste without modification
3. **Interpret the response** - Explain what each field in the JSON response means and what values to expect
4. **Verify backward compatibility** - Document how to confirm existing "Hello World!" behavior remains unchanged
5. **Understand the implementation** - Update "How It Works" section to explain URL routing logic at a conceptual level understandable to beginners

**Testing Instructions Must Include:**
- Exact curl command: `curl http://127.0.0.1:3000/health`
- Browser testing: Navigate to `http://127.0.0.1:3000/health`
- Expected output with example values
- Regression testing: Confirm root path still works

**CommonJS Module System Preservation:**

The project uses CommonJS (`require()` syntax) and MUST NOT be migrated to ES Modules:

- **NO `import` statements** - Continue using `const http = require('http');` syntax
- **NO `export` statements** - File remains an executable script, not a module
- **NO `type: "module"` in package.json** - Maintain implicit CommonJS module system
- **NO `.mjs` file extension** - Keep `.js` extension indicating CommonJS

**Rationale:** CommonJS is more universally compatible with older Node.js tutorials and documentation, reducing confusion for learners comparing this example with other resources.

**Security Through Network Binding:**

Health check endpoint inherits localhost-only binding (127.0.0.1) from existing server configuration. Do NOT:

- Add authentication mechanisms - No API keys, no tokens, no passwords
- Add authorization checks - No role-based access control, no IP whitelisting beyond localhost binding
- Add rate limiting - No request throttling, no DDoS protection
- Change network binding to 0.0.0.0 - Must remain localhost-only for security

**Justification:** Localhost binding provides adequate security for an educational example. External access would require explicit `hostname` configuration change, which is out of scope and unnecessary.

**Performance Considerations:**

This is an educational project, not a production system. Do NOT:

- Optimize for high concurrency - No worker threads, no cluster module, no load balancing
- Add response caching - No in-memory cache, no cache headers, no ETag generation
- Implement connection pooling - Not applicable (no database connections)
- Add compression - No gzip, no deflate, no brotli compression middleware

**The implementation should prioritize code clarity over performance optimization.**

**Version Control and Git:**

When committing changes:

- Use descriptive commit message: "feat: Add /health endpoint for service monitoring"
- Include all three modified files in a single commit: Hello_World_Node.js, README.md, package.json
- Do NOT commit: node_modules (doesn't exist), package-lock.json (doesn't exist), .env files (don't exist)

**Summary of Non-Negotiable Constraints:**

1. ✓ Zero npm dependencies maintained
2. ✓ Single-file architecture preserved  
3. ✓ Backward compatibility guaranteed for existing paths
4. ✓ JSON response follows exact three-field specification
5. ✓ CommonJS module system retained
6. ✓ Localhost-only binding unchanged
7. ✓ Educational clarity prioritized over production patterns
8. ✓ Documentation enables complete novice success

These constraints ensure the health check feature enhances the project's educational value while maintaining its core principles of simplicity, immediate executability, and minimal cognitive overhead for learners.

