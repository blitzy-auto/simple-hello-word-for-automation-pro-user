# Technical Specification

# 0. Agent Action Plan

## 0.1 Intent Clarification

#### Core Feature Objective

Based on the prompt, the Blitzy platform understands that the new feature requirement is to add a health check endpoint to the existing Node.js HTTP server application to enable operational monitoring and service verification.

**Primary Requirements:**
- Create a dedicated health check endpoint that returns a successful response when the service is running correctly
- Enable easy verification of service availability for monitoring tools, load balancers, and operational teams
- Maintain the simplicity and minimalist architecture of the existing application

**Implicit Requirements Detected:**
- The health check endpoint should follow Node.js and industry best practices for health monitoring
- The implementation must use only Node.js built-in modules to maintain the zero-dependency architecture
- The endpoint should provide useful diagnostic information such as service status and uptime
- The solution should be production-ready and suitable for integration with common monitoring tools
- Documentation must be updated to reflect the new endpoint and its usage

**Feature Dependencies and Prerequisites:**
- Existing HTTP server implementation using Node.js built-in `http` module (currently in Hello_World_Node.js)
- Node.js runtime environment (>=14.0.0 as specified in package.json)
- No external dependencies required, maintaining the current zero-dependency architecture

#### Special Instructions and Constraints

**Architectural Requirements:**
- Maintain the existing single-file server architecture pattern
- Use only Node.js built-in modules (specifically the `http` module already in use)
- Preserve the CommonJS module pattern (require statements)
- Keep the implementation minimal and self-contained
- Ensure backward compatibility with the existing "Hello World" endpoint

**Integration Requirements:**
- The health check endpoint must coexist with the existing root endpoint that returns "Hello World!"
- Implement proper request routing to distinguish between the main endpoint and health check endpoint
- Maintain the existing server configuration (hostname: 127.0.0.1, port: 3000)
- Ensure the health check responds quickly without blocking other requests

**Implementation Constraints:**
- No external npm packages or dependencies should be added
- The solution must work with Node.js >=14.0.0 (as specified in engines field)
- Follow the existing code style and patterns in the repository
- Maintain the educational/example nature of the project while adding production-grade functionality

**Operational Considerations:**
- The health check endpoint should return HTTP 200 status code when the service is healthy
- Include meaningful response data such as service status and uptime information
- Use standard health check endpoint naming conventions (e.g., `/health`, `/health_check`, or `/healthcheck`)
- Ensure the endpoint is accessible via HTTP GET requests
- Response should be in a standard format (JSON) for easy parsing by monitoring tools

#### Technical Interpretation

These feature requirements translate to the following technical implementation strategy:

**To implement the health check endpoint, we will modify the existing HTTP server request handler to:**
- Add request URL parsing to distinguish between different endpoints (`/` for Hello World, `/health` for health checks)
- Implement routing logic within the existing request listener callback
- Create a health check response that includes status information and process uptime using Node.js built-in `process.uptime()` API
- Maintain the existing "Hello World" behavior for the root endpoint
- Use JSON response format for the health check endpoint to facilitate monitoring tool integration

**Specific Technical Actions:**
- **Modify Hello_World_Node.js**: Enhance the existing `http.createServer` callback to parse `req.url` and implement conditional routing logic
- **Add URL-based routing**: Implement if-else or switch statement to handle different endpoints without requiring external routing libraries
- **Implement health check logic**: Return JSON response with `{ "status": "ok", "uptime": process.uptime() }` for health check requests
- **Preserve existing behavior**: Ensure the root endpoint (`/`) continues to return "Hello World!" as before
- **Update package.json**: Resolve the entry point mismatch where package.json references "server.js" but the actual file is "Hello_World_Node.js"
- **Update README.md**: Document the new health check endpoint, its purpose, expected response format, and usage examples
- **Maintain consistency**: Follow the existing code formatting, comment style, and educational nature of the implementation

**Implementation Approach:**
The health check feature will be implemented by extending the existing request handler with URL-based routing logic. This approach maintains the zero-dependency architecture while adding production-grade health monitoring capabilities. The implementation will serve as an educational example of basic HTTP routing in Node.js without external frameworks.

## 0.2 Repository Scope Discovery

#### Comprehensive File Analysis

**Search Patterns Executed:**

The repository has been comprehensively analyzed using systematic deep search methodology. The repository structure is minimal and self-contained with only three first-order files at the root level.

**Existing Files Requiring Modification:**

| File Path | Type | Purpose | Modifications Required |
|-----------|------|---------|----------------------|
| Hello_World_Node.js | Source | Main HTTP server implementation | Add URL parsing and routing logic; implement health check endpoint handler; maintain existing Hello World endpoint |
| README.md | Documentation | Project documentation and usage guide | Add health check endpoint documentation; include usage examples; document response format |
| package.json | Configuration | npm package manifest | Update "main" field from "server.js" to "Hello_World_Node.js"; update "start" and "dev" scripts to reference correct filename |

**Integration Point Discovery:**

**1. HTTP Server Request Handler (Hello_World_Node.js, lines 8-12):**
- Current implementation: Single callback that responds identically to all requests
- Required changes: Add URL parsing using `req.url` property; implement conditional routing logic
- Integration approach: Wrap existing response logic in URL-based conditionals

**2. Server Request Listener (Hello_World_Node.js, line 8):**
- Current signature: `(req, res) => { ... }`
- Required enhancement: Parse `req.url` to determine endpoint; route to appropriate handler logic
- Maintain: Existing response headers and status codes for compatibility

**3. Package.json Entry Point Configuration (package.json, lines 5-8):**
- Current issue: References non-existent "server.js" file
- Required fix: Update to reference "Hello_World_Node.js" to match actual filename
- Impact: Ensures `npm start` and `npm run dev` commands work correctly

**4. Documentation Structure (README.md):**
- Current content: Documents only the Hello World endpoint
- Required additions: New section for health check endpoint; API endpoint table; response format examples
- Placement: After "How It Works" section, before "Configuration" section

**File Pattern Analysis:**

- Source files: `*.js` at root level (currently only Hello_World_Node.js)
- Configuration files: `package.json` at root level
- Documentation files: `*.md` at root level (currently only README.md)
- No subdirectories present (flat structure)
- No test files present (educational example project)
- No build or deployment configurations (simple runtime execution)

#### Web Search Research Conducted

**Research Topic: Node.js Health Check Endpoint Best Practices**

<cite index="5-18,5-19">Common endpoint naming conventions include /readyz and /livez for readiness and liveness probes</cite>, though for simple applications, `/health`, `/healthcheck`, or `/health_check` are widely used alternatives.

<cite index="1-1">The process.uptime() method is a built-in API of the process module used to get the number of seconds the Node.js process has been running</cite>, making it ideal for health check implementations without external dependencies.

<cite index="2-18">Key metrics to include in health checks are response time of the server, uptime of the server, status code (200 for OK), and timestamp</cite>.

<cite index="8-12,8-13">Best practice recommends not using external modules for health checks and sticking with minimal implementations for most cases</cite>, which aligns perfectly with this project's zero-dependency architecture.

**Key Findings Applied to Implementation:**
- Use `/health` as the endpoint path for simplicity and clarity
- Return HTTP 200 status code with JSON response body
- Include `status` field (string: "ok") and `uptime` field (number: seconds from process.uptime())
- Keep implementation minimal using only built-in Node.js APIs
- Respond quickly without performing expensive operations (appropriate for simple applications)
- Use JSON format for machine-readable responses compatible with monitoring tools

**Pattern Validation:**
- Simple implementations should return 200 status with basic information
- Avoid database or external service checks for simple applications (not applicable here)
- JSON response format is standard for modern health check endpoints
- GET method is standard for health check requests

#### New File Requirements

**No New Files Required:**

This feature implementation requires only modifications to existing files. The minimal architecture of the project (single server file, single documentation file, single configuration file) is preserved.

**Rationale:**
- The health check endpoint is a natural extension of the existing HTTP server functionality
- Adding routing logic to the existing server file maintains the educational simplicity of the example
- No separate router, controller, or service files are needed for this straightforward feature
- The zero-dependency, single-file server approach remains intact

**Files NOT Being Created:**
- No separate route handler files
- No middleware files
- No test files (project currently has no testing infrastructure)
- No additional configuration files
- No build or deployment scripts
- No health check utility modules

**Future Considerations** (explicitly out of current scope):
- If the project grows to include multiple endpoints, consider refactoring to a modular structure
- If testing infrastructure is added in the future, health check endpoint tests could be included
- If migrating to Express or another framework, health check could be extracted to a separate route file

## 0.3 Dependency Inventory

#### Private and Public Packages

**Current Dependency Status:**

The project maintains a zero-dependency architecture, using only Node.js built-in modules. This approach is intentional and documented in README.md: "No additional packages are required. This application uses only Node.js built-in modules."

**Key Packages and Modules:**

| Registry | Package/Module | Version | Purpose | Type |
|----------|----------------|---------|---------|------|
| Node.js Built-in | http | N/A (built-in) | HTTP server creation and request/response handling | Core Module |
| Node.js Built-in | process | N/A (built-in) | Process information including uptime() for health check | Global Object |
| npm | Node.js Runtime | >=14.0.0 | JavaScript runtime environment | Runtime Requirement |

**Dependency Analysis:**
- **http module**: Already imported and used in Hello_World_Node.js (line 3: `const http = require('http');`)
- **process object**: Global object available in all Node.js applications, no import required
- **No external dependencies**: package.json contains empty dependencies and devDependencies (implicitly, as neither field is present)

**Version Specifications:**
- Node.js engine requirement: `">=14.0.0"` (specified in package.json line 19)
- Currently verified runtime: Node.js v20.19.6 (satisfies requirement)
- npm version: 10.8.2 (for package management, though no packages to install)

**Health Check Implementation Dependencies:**
- `req.url`: Property of http.IncomingMessage object (built-in, no import needed)
- `process.uptime()`: Built-in method returning process runtime in seconds (no import needed)
- `JSON.stringify()`: Built-in JavaScript method for JSON serialization (no import needed)

#### Dependency Updates

**No Dependency Updates Required:**

The health check feature implementation requires no changes to the project's dependency structure. All required functionality is provided by Node.js built-in APIs that are already in use or globally available.

**Import Statement Analysis:**

**Current Imports (Hello_World_Node.js, line 3):**
```javascript
const http = require('http');
```

**Required Imports After Implementation:**
```javascript
const http = require('http');
```

**No import changes required** - The `http` module remains the only required import. The `process` global object and URL parsing functionality are available without additional imports.

**Module References:**
- `process.uptime()`: No import needed, process is a global object
- `req.url`: Property of the request object passed to the server callback
- `JSON.stringify()`: Built-in JavaScript function, no import needed
- `res.setHeader()`: Method of the response object from http module
- `res.end()`: Method of the response object from http module

**Configuration File Updates:**

**package.json changes required (non-dependency related):**
- Line 5: Update `"main": "server.js"` to `"main": "Hello_World_Node.js"`
- Line 7: Update `"start": "node server.js"` to `"start": "node Hello_World_Node.js"`
- Line 8: Update `"dev": "node server.js"` to `"dev": "node Hello_World_Node.js"`

These changes fix the entry point mismatch but do not involve dependency modifications.

**Verification:**
- No `npm install` required before or after implementation
- No changes to package.json dependencies or devDependencies fields
- No package-lock.json to update (file does not exist and is not needed)
- No node_modules directory created or modified

## 0.4 Integration Analysis

#### Existing Code Touchpoints

**Direct Modifications Required:**

**1. HTTP Server Request Handler (Hello_World_Node.js, lines 8-12)**

**Current Implementation:**
```javascript
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World!\n');
});
```

**Required Modifications:**
- **Parse request URL**: Add logic to extract and evaluate `req.url` property
- **Implement routing**: Add conditional logic to route requests based on URL path
- **Health check handler**: Implement new response logic for `/health` endpoint
- **Preserve existing handler**: Maintain current "Hello World" response for root path `/`
- **Content-Type handling**: Set appropriate headers based on endpoint (text/plain for root, application/json for health)

**Integration Approach:**
Replace the single-response handler with URL-based routing logic:
```javascript
const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    // Health check logic
  } else {
    // Existing Hello World logic
  }
});
```

**2. Server Configuration Constants (Hello_World_Node.js, lines 5-6)**

**Current Implementation:**
```javascript
const hostname = '127.0.0.1';
const port = 3000;
```

**Integration Requirements:**
- **No changes required**: Configuration remains the same
- **Validation**: Health check endpoint will be accessible at `http://127.0.0.1:3000/health`
- **Backward compatibility**: Existing endpoint remains at `http://127.0.0.1:3000/`

**3. Package.json Entry Points (package.json, lines 5-8)**

**Current Implementation:**
```json
"main": "server.js",
"scripts": {
  "start": "node server.js",
  "dev": "node server.js"
}
```

**Required Corrections:**
- **Line 5**: Change `"main": "server.js"` to `"main": "Hello_World_Node.js"`
- **Line 7**: Change `"start": "node server.js"` to `"start": "node Hello_World_Node.js"`
- **Line 8**: Change `"dev": "node server.js"` to `"dev": "node Hello_World_Node.js"`

**Integration Impact:**
- Fixes existing bug where `npm start` would fail
- Ensures package.json accurately reflects the actual entry point file
- Maintains consistency between documentation and configuration

**4. README.md Documentation Structure (multiple locations)**

**Current Structure:**
- Prerequisites (lines 5-7)
- Installation (lines 9-11)
- Usage (lines 13-34)
- How It Works (lines 40-42)
- Configuration (lines 44-49)

**Integration Points:**
- **After "How It Works" section**: Insert new "Health Check Endpoint" section
- **Update Usage section**: Add instructions for accessing the health check endpoint
- **Update "How It Works" section**: Briefly mention routing logic for multiple endpoints

**Code Integration Dependencies:**

**Request Object Properties:**
- `req.url`: String containing the request URL path (e.g., "/", "/health")
- `req.method`: String containing HTTP method (implicitly "GET" for health checks)

**Response Object Methods:**
- `res.statusCode`: Property for setting HTTP status code (already used, line 9)
- `res.setHeader()`: Method for setting response headers (already used, line 10)
- `res.end()`: Method for sending response and closing connection (already used, line 11)

**Global Process Object:**
- `process.uptime()`: Returns number of seconds the Node.js process has been running
- No initialization required, globally available

**Error Handling Considerations:**

**Current State:**
- No explicit error handling in current implementation
- Server error events not captured
- EADDRINUSE errors would cause unhandled exceptions

**Integration Opportunity:**
While adding the health check, error handling could be enhanced, but this is explicitly out of scope for this feature. The health check implementation will maintain the same error handling approach as the existing code.

**Testing Integration:**

**Current State:**
- No test files present in repository
- No testing framework configured
- No CI/CD pipelines with test execution

**Integration Approach:**
Testing infrastructure is out of scope. Health check endpoint will be verified through manual testing using curl or browser access.

**Performance Integration:**

**Current Characteristics:**
- Synchronous request handling
- No async operations
- Immediate response generation

**Health Check Impact:**
- Health check response will be equally fast (synchronous)
- `process.uptime()` is a synchronous, non-blocking operation
- JSON serialization with `JSON.stringify()` is synchronous
- No performance degradation expected

## 0.5 Technical Implementation

#### File-by-File Execution Plan

**CRITICAL: All files listed below MUST be modified to complete this feature implementation.**

**Group 1 - Core Server Implementation (Primary Changes)**

**MODIFY: Hello_World_Node.js**
- **Purpose**: Add health check endpoint with URL-based routing logic
- **Location**: Lines 8-12 (request handler callback)
- **Specific Changes**:
  - Add URL parsing logic to distinguish between endpoints
  - Implement conditional routing based on `req.url` value
  - Add health check response handler for `/health` endpoint
  - Preserve existing "Hello World" response for root path
  - Set appropriate Content-Type headers based on endpoint (application/json for health, text/plain for root)
  - Return JSON response with status and uptime for health checks
  - Maintain backward compatibility with existing root endpoint behavior
- **Technical Approach**: 
  - Parse `req.url` property to determine requested endpoint
  - Use if-else or switch statement for routing
  - Call `process.uptime()` to get server uptime in seconds
  - Use `JSON.stringify()` to serialize health check response object
  - Format: `{"status": "ok", "uptime": <seconds>}`

**Group 2 - Configuration and Entry Point Fix**

**MODIFY: package.json**
- **Purpose**: Fix entry point mismatch to reference correct server file
- **Locations**: Lines 5, 7, 8
- **Specific Changes**:
  - **Line 5**: Update `"main"` field from `"server.js"` to `"Hello_World_Node.js"`
  - **Line 7**: Update `"start"` script from `"node server.js"` to `"node Hello_World_Node.js"`
  - **Line 8**: Update `"dev"` script from `"node server.js"` to `"node Hello_World_Node.js"`
- **Technical Approach**: Direct string replacement in JSON fields
- **Impact**: Enables `npm start` and `npm run dev` to work correctly

**Group 3 - Documentation and Usage Guide**

**MODIFY: README.md**
- **Purpose**: Document new health check endpoint and update usage instructions
- **Locations**: Multiple sections require updates
- **Specific Changes**:
  - **Add new section "Health Check Endpoint"** (after "How It Works", before "Configuration")
    - Document endpoint path: `/health`
    - Explain purpose: service health monitoring
    - Provide usage example with curl command
    - Show expected response format with example JSON
    - Document status codes (200 for healthy)
  - **Update "How It Works" section** (around line 40-42)
    - Mention URL-based routing for multiple endpoints
    - Explain conditional request handling
  - **Update "Usage" section** (around line 13-34)
    - Add step showing how to access health check endpoint
    - Include both browser and curl access methods
- **Technical Approach**: 
  - Insert new markdown sections with proper heading levels
  - Include code blocks for curl examples and JSON responses
  - Maintain existing formatting style and structure

#### Implementation Approach per File

**Implementation Sequence and Strategy:**

**Phase 1: Core Functionality (Hello_World_Node.js)**

**Step 1 - Establish Routing Foundation:**
- Modify the `http.createServer` callback to parse `req.url`
- Implement URL-based conditional logic to distinguish between endpoints
- Structure: if-else block with separate handlers for each endpoint

**Step 2 - Implement Health Check Handler:**
- Add logic for `/health` endpoint within the routing structure
- Set status code to 200
- Set Content-Type header to `application/json`
- Create response object: `{ status: 'ok', uptime: process.uptime() }`
- Serialize response object using `JSON.stringify()`
- Send response using `res.end()`

**Step 3 - Preserve Existing Functionality:**
- Maintain the existing "Hello World" response for root path `/`
- Ensure status code remains 200
- Keep Content-Type as `text/plain`
- Preserve exact response text: `'Hello World!\n'`

**Step 4 - Handle Default/Unknown Routes:**
- Add else clause for any other URL paths
- Return existing "Hello World" response as default behavior
- Maintains backward compatibility for any unexpected requests

**Phase 2: Configuration Fix (package.json)**

**Step 1 - Update Entry Point Reference:**
- Modify the `main` field to point to actual server file
- Ensures proper module resolution if package is imported

**Step 2 - Fix NPM Scripts:**
- Update both `start` and `dev` scripts to reference correct file
- Enables `npm start` and `npm run dev` to execute successfully

**Phase 3: Documentation (README.md)**

**Step 1 - Add Health Check Documentation:**
- Insert new section with clear heading
- Document endpoint path, purpose, and usage
- Include practical examples (curl commands)
- Show expected response format with real example

**Step 2 - Update Existing Sections:**
- Enhance "How It Works" to mention routing
- Update "Usage" to include health check access instructions
- Maintain consistency with existing documentation style

**Quality Assurance Approach:**

**Manual Verification Steps:**
1. Start the server using `node Hello_World_Node.js`
2. Verify existing functionality: `curl http://127.0.0.1:3000/` returns "Hello World!"
3. Verify health check: `curl http://127.0.0.1:3000/health` returns JSON with status and uptime
4. Verify npm scripts: `npm start` successfully launches server
5. Check response headers: Content-Type is correct for each endpoint
6. Verify status codes: Both endpoints return 200

**Implementation Principles:**
- Maintain zero-dependency architecture throughout
- Preserve educational simplicity of the example
- Ensure backward compatibility with existing functionality
- Follow existing code style and formatting conventions
- Keep implementation minimal and easy to understand
- Document all changes for future maintainers and learners

## 0.6 Scope Boundaries

#### Exhaustively In Scope

**Source Code Files:**
- `Hello_World_Node.js` - Complete modification of request handler logic
  - Lines 8-12: Request handler callback implementation
  - Add URL parsing and routing logic
  - Implement health check response generation
  - Preserve existing Hello World endpoint functionality
  - Set appropriate response headers based on endpoint

**Configuration Files:**
- `package.json` - Entry point and script corrections
  - Line 5: `main` field update
  - Line 7: `start` script update
  - Line 8: `dev` script update
  - Fix mismatch between documented entry point and actual filename

**Documentation Files:**
- `README.md` - Comprehensive documentation updates
  - New section: "Health Check Endpoint" documentation
  - Section location: After "How It Works", before "Configuration"
  - Content: Endpoint path, purpose, usage examples, response format
  - Update "How It Works" section: Mention routing logic
  - Update "Usage" section: Include health check access instructions
  - Include curl command examples
  - Show expected JSON response format

**Specific Code Changes:**

**In Hello_World_Node.js:**
- Import statements: No changes (existing `http` import sufficient)
- Server configuration: No changes (existing `hostname` and `port` constants remain)
- Request handler (lines 8-12): Complete rewrite with routing logic
- Server listener (lines 14-16): No changes (existing implementation sufficient)

**API Endpoints Affected:**
- `/` (root path): Existing endpoint, functionality preserved exactly
  - Response: `Hello World!\n`
  - Content-Type: `text/plain`
  - Status Code: 200
- `/health` (new endpoint): New health check endpoint to be created
  - Response: `{"status":"ok","uptime":<seconds>}`
  - Content-Type: `application/json`
  - Status Code: 200

**Response Formats:**

**Root Endpoint Response:**
```
Status: 200 OK
Content-Type: text/plain

Hello World!
```

**Health Check Endpoint Response:**
```
Status: 200 OK
Content-Type: application/json

{"status":"ok","uptime":42.123}
```

**File Patterns Included:**
- All JavaScript source files at root: `*.js` (specifically Hello_World_Node.js)
- All JSON configuration files at root: `*.json` (specifically package.json)
- All Markdown documentation at root: `*.md` (specifically README.md)

**Integration Touchpoints:**
- HTTP server request handler callback
- Request object URL property (`req.url`)
- Response object methods (`res.statusCode`, `res.setHeader()`, `res.end()`)
- Process global object (`process.uptime()`)
- Package.json script execution paths
- Documentation structure and content

#### Explicitly Out of Scope

**Testing Infrastructure:**
- No test files to be created (tests/**/*.js, *.test.js, *.spec.js)
- No testing frameworks to be added (Jest, Mocha, Chai, etc.)
- No test scripts in package.json
- No CI/CD test execution configuration
- Manual testing only (using curl or browser)

**Advanced Health Check Features:**
- Database connectivity checks (no database in this application)
- External service dependency checks (no external services)
- Memory usage monitoring beyond basic uptime
- CPU utilization metrics
- Disk space checks
- Load balancer-specific health check formats (liveness/readiness separation)
- Authentication or authorization for health check endpoint
- Rate limiting for health check requests
- Detailed application-level diagnostics

**Additional Endpoints:**
- No other new endpoints beyond `/health`
- No REST API routes
- No WebSocket endpoints
- No static file serving
- No admin or management endpoints

**Framework or Library Additions:**
- No Express.js or other web frameworks
- No routing libraries
- No health check npm packages (express-healthcheck, @hmcts/nodejs-healthcheck, etc.)
- No logging libraries (Winston, Bunyan, Pino)
- No monitoring agent libraries
- No middleware packages

**Server Configuration Changes:**
- No changes to hostname (remains 127.0.0.1)
- No changes to port (remains 3000)
- No HTTPS/SSL configuration
- No clustering or multi-process setup
- No environment variable configuration
- No production deployment optimizations

**Error Handling Enhancements:**
- No try-catch blocks added
- No server error event handlers
- No uncaught exception handlers
- No EADDRINUSE handling
- No request timeout handling
- No graceful shutdown logic

**Performance Optimizations:**
- No caching mechanisms
- No response compression
- No connection pooling
- No load balancing
- No performance monitoring beyond basic uptime

**Security Enhancements:**
- No CORS headers
- No security headers (helmet.js patterns)
- No input validation
- No request sanitization
- No rate limiting
- No authentication tokens
- No IP whitelisting

**Build and Deployment:**
- No Dockerfile changes or creation
- No Docker Compose configuration
- No Kubernetes manifests
- No CI/CD pipeline files (.github/workflows, .gitlab-ci.yml, etc.)
- No build scripts
- No minification or bundling

**Code Refactoring:**
- No extraction of routing logic to separate modules
- No creation of controller/handler patterns
- No service layer abstraction
- No configuration management system
- No dependency injection container
- No architectural pattern changes (remains single-file server)

**Documentation Beyond Basics:**
- No API documentation generation (Swagger, OpenAPI)
- No architectural diagrams
- No deployment guides
- No troubleshooting guides
- No contribution guidelines
- No changelog or version history

**Additional Files:**
- No .gitignore modifications
- No .dockerignore creation
- No .env or environment files
- No logging configuration files
- No separate configuration files (config.json, etc.)

**Backward Compatibility Exceptions:**
- All existing functionality must remain intact
- No breaking changes to existing endpoint behavior
- No changes to server startup behavior or console output

## 0.7 Special Instructions for Feature Addition

#### Feature-Specific Requirements

**Preserve Educational Nature:**

This project serves as an educational example of a minimal Node.js HTTP server. The health check implementation must maintain this educational purpose:
- Keep the code simple and easy to understand for beginners
- Add comments explaining the routing logic and health check purpose
- Avoid complex patterns or abstractions that obscure the fundamentals
- Ensure the implementation can serve as a learning resource for Node.js concepts
- Document the reasoning behind implementation choices in code comments

**Zero-Dependency Architecture Mandate:**

The project explicitly states "No additional packages are required. This application uses only Node.js built-in modules." This constraint must be strictly maintained:
- No npm packages may be added to dependencies or devDependencies
- All functionality must use Node.js built-in modules only (`http`, `process`)
- No framework-specific patterns that would typically require external libraries
- Solution must work with a fresh Node.js installation without running `npm install`
- Maintain the philosophical simplicity of "just run `node Hello_World_Node.js` and it works"

**Backward Compatibility Requirement:**

The existing "Hello World" functionality is the core purpose of this example and must remain unchanged:
- Root endpoint `/` must return exactly `'Hello World!\n'` with status 200
- Response Content-Type for root must remain `text/plain`
- Server startup message must remain unchanged: `Server running at http://127.0.0.1:3000/`
- Server configuration (hostname, port) must not change
- Any user or tool currently using the root endpoint must experience zero disruption

**Minimal Routing Implementation:**

Since this project does not and should not use Express.js or other routing frameworks:
- Implement routing using simple conditional logic (if-else or switch statements)
- Parse `req.url` directly without URL parsing libraries
- Keep routing logic inline within the request handler callback
- Avoid creating separate routing modules or complex routing tables
- Ensure routing code is self-documenting and beginner-friendly

**Response Format Standardization:**

The health check endpoint must return well-formed JSON suitable for monitoring tools:
- Use standard JSON format with proper structure: `{"status": "ok", "uptime": <number>}`
- Set Content-Type header to `application/json` for the health endpoint
- Ensure JSON is properly serialized using `JSON.stringify()`
- Include uptime in seconds as a floating-point number from `process.uptime()`
- Status field should always be string "ok" when server is responding (no complex health state logic)

**Entry Point Consistency:**

Fix the existing discrepancy between documentation and actual files:
- The actual server file is named `Hello_World_Node.js`
- README.md and package.json incorrectly reference `server.js`
- All references must be updated to `Hello_World_Node.js` for consistency
- This fix prevents confusion for users following the README instructions
- Ensures `npm start` command works correctly

**Code Style Consistency:**

Maintain the existing code style and formatting:
- Use CommonJS module system with `require()` statements (not ES6 imports)
- Use `const` for variable declarations (as in existing code)
- Follow existing indentation patterns (2-space indentation)
- Use arrow functions for callbacks (as in existing code: `(req, res) => { ... }`)
- Include semicolons at statement ends (as in existing code)
- Keep comments simple and descriptive

**Documentation Standards:**

README.md updates must follow existing documentation patterns:
- Use clear section headings with markdown syntax
- Provide step-by-step instructions for usage
- Include both browser and command-line examples
- Show expected output with code blocks
- Maintain the friendly, instructional tone of the existing documentation
- Use consistent formatting for code examples and terminal commands

**Testing and Verification Approach:**

Since no automated testing infrastructure exists or will be added:
- Manual testing using curl or browser is the verification method
- Document specific curl commands in README.md for users to verify functionality
- Include expected output examples so users can confirm correct behavior
- Testing instructions should be simple enough for beginners to follow
- No test files or test frameworks should be added to maintain project simplicity

**Performance Considerations:**

The health check must not impact the simplicity or performance of the example:
- Health check response should be generated synchronously
- `process.uptime()` is non-blocking and extremely fast
- JSON serialization of the small response object is negligible overhead
- No async operations, promises, or callbacks needed for health check logic
- Response time should be immediate (single-digit milliseconds)

**Security Considerations for Educational Context:**

While this is an example application not intended for production:
- Bind to loopback interface only (127.0.0.1) as currently configured
- No security headers are added (out of scope for educational example)
- Document in README that this is for local development/learning only
- Health check endpoint provides minimal information (no sensitive data exposed)
- Accept that the health check is publicly accessible without authentication (appropriate for a local example)

**Integration with Monitoring Tools:**

Although this is a simple example, the health check format should be practical:
- Standard HTTP GET request to `/health` endpoint
- Returns 200 status code for successful health check
- JSON response format is machine-readable for monitoring tools
- Response structure supports uptime monitoring and alerting
- Compatible with common monitoring patterns even if not explicitly configured for specific tools

**Future Extensibility Considerations:**

While maintaining current simplicity, the implementation should not preclude future enhancements:
- Routing structure should be easy to extend with additional endpoints
- Health check response format could be extended with additional fields
- Code organization should make it easy to extract routing logic later if needed
- Documentation structure supports adding more sections as project grows
- However, these extensibility considerations should not add complexity to current implementation

