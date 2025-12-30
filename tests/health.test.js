/**
 * Health Check Endpoint Unit Tests
 * 
 * This test file validates the health check functionality of the Hello World Node.js server.
 * It tests the /health endpoint for correct response structure, status codes, and content.
 * 
 * Usage: node tests/health.test.js
 */

const http = require('http');
const { spawn } = require('child_process');
const assert = require('assert');
const path = require('path');

// Test configuration
const HOSTNAME = '127.0.0.1';
const PORT = 3000;
const SERVER_SCRIPT = path.join(__dirname, '..', 'Hello_World_Node.js');
const SERVER_START_TIMEOUT = 5000;
const REQUEST_TIMEOUT = 5000;

let serverProcess = null;
let testResults = { passed: 0, failed: 0 };

/**
 * Makes an HTTP request and returns a promise with the response
 * @param {Object} options - HTTP request options
 * @returns {Promise} - Resolves with statusCode, headers, and body
 */
function makeRequest(options) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: data
        });
      });
    });
    req.on('error', reject);
    req.setTimeout(REQUEST_TIMEOUT, () => {
      req.destroy();
      reject(new Error('Request timeout'));
    });
    req.end();
  });
}

/**
 * Runs a single test and logs the result
 * @param {string} name - Test name
 * @param {Function} testFn - Async test function
 */
async function test(name, testFn) {
  try {
    await testFn();
    console.log(`  ✓ ${name}`);
    testResults.passed++;
  } catch (error) {
    console.log(`  ✗ ${name}`);
    console.log(`    Error: ${error.message}`);
    testResults.failed++;
  }
}

/**
 * Starts the Hello World server
 * @returns {Promise} - Resolves when server is ready
 */
async function startServer() {
  return new Promise((resolve, reject) => {
    serverProcess = spawn('node', [SERVER_SCRIPT], {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    serverProcess.stdout.on('data', (data) => {
      if (data.toString().includes('Server running')) {
        setTimeout(resolve, 300);
      }
    });

    serverProcess.stderr.on('data', (data) => {
      const msg = data.toString();
      if (msg.includes('EADDRINUSE')) {
        reject(new Error('Port 3000 is already in use'));
      }
    });

    serverProcess.on('error', reject);
    setTimeout(() => reject(new Error('Server start timeout')), SERVER_START_TIMEOUT);
  });
}

/**
 * Stops the server process
 */
function stopServer() {
  if (serverProcess) {
    serverProcess.kill('SIGTERM');
    serverProcess = null;
  }
}

/**
 * Test suite: Health Endpoint Status Code
 */
async function testHealthEndpointStatusCode() {
  console.log('\n📋 Health Endpoint Status Code Tests');
  
  await test('GET /health returns HTTP 200', async () => {
    const res = await makeRequest({
      hostname: HOSTNAME,
      port: PORT,
      path: '/health',
      method: 'GET'
    });
    assert.strictEqual(res.statusCode, 200, `Expected 200, got ${res.statusCode}`);
  });
}

/**
 * Test suite: Health Endpoint Headers
 */
async function testHealthEndpointHeaders() {
  console.log('\n📋 Health Endpoint Headers Tests');
  
  await test('Content-Type is application/json', async () => {
    const res = await makeRequest({
      hostname: HOSTNAME,
      port: PORT,
      path: '/health',
      method: 'GET'
    });
    assert.strictEqual(
      res.headers['content-type'], 
      'application/json', 
      `Expected application/json, got ${res.headers['content-type']}`
    );
  });
}

/**
 * Test suite: Health Response Body Structure
 */
async function testHealthResponseBody() {
  console.log('\n📋 Health Response Body Tests');
  
  await test('Response is valid JSON', async () => {
    const res = await makeRequest({
      hostname: HOSTNAME,
      port: PORT,
      path: '/health',
      method: 'GET'
    });
    JSON.parse(res.body); // Will throw if invalid
  });
  
  await test('Response contains "status" field', async () => {
    const res = await makeRequest({
      hostname: HOSTNAME,
      port: PORT,
      path: '/health',
      method: 'GET'
    });
    const data = JSON.parse(res.body);
    assert.ok('status' in data, 'Missing "status" field');
  });
  
  await test('Response contains "timestamp" field', async () => {
    const res = await makeRequest({
      hostname: HOSTNAME,
      port: PORT,
      path: '/health',
      method: 'GET'
    });
    const data = JSON.parse(res.body);
    assert.ok('timestamp' in data, 'Missing "timestamp" field');
  });
  
  await test('Response contains "uptime" field', async () => {
    const res = await makeRequest({
      hostname: HOSTNAME,
      port: PORT,
      path: '/health',
      method: 'GET'
    });
    const data = JSON.parse(res.body);
    assert.ok('uptime' in data, 'Missing "uptime" field');
  });
  
  await test('Response contains "service" field', async () => {
    const res = await makeRequest({
      hostname: HOSTNAME,
      port: PORT,
      path: '/health',
      method: 'GET'
    });
    const data = JSON.parse(res.body);
    assert.ok('service' in data, 'Missing "service" field');
  });
}

/**
 * Test suite: Health Response Field Values
 */
async function testHealthFieldValues() {
  console.log('\n📋 Health Response Field Value Tests');
  
  await test('Status equals "healthy"', async () => {
    const res = await makeRequest({
      hostname: HOSTNAME,
      port: PORT,
      path: '/health',
      method: 'GET'
    });
    const data = JSON.parse(res.body);
    assert.strictEqual(data.status, 'healthy', `Expected "healthy", got "${data.status}"`);
  });
  
  await test('Uptime is a positive number', async () => {
    const res = await makeRequest({
      hostname: HOSTNAME,
      port: PORT,
      path: '/health',
      method: 'GET'
    });
    const data = JSON.parse(res.body);
    assert.strictEqual(typeof data.uptime, 'number', 'Uptime should be a number');
    assert.ok(data.uptime > 0, 'Uptime should be positive');
  });
  
  await test('Timestamp is valid ISO 8601 format', async () => {
    const res = await makeRequest({
      hostname: HOSTNAME,
      port: PORT,
      path: '/health',
      method: 'GET'
    });
    const data = JSON.parse(res.body);
    const date = new Date(data.timestamp);
    assert.ok(!isNaN(date.getTime()), 'Timestamp should be a valid date');
    assert.ok(data.timestamp.includes('T'), 'Timestamp should be ISO 8601 format');
    assert.ok(data.timestamp.endsWith('Z'), 'Timestamp should end with Z (UTC)');
  });
  
  await test('Service name is "hello-world-nodejs"', async () => {
    const res = await makeRequest({
      hostname: HOSTNAME,
      port: PORT,
      path: '/health',
      method: 'GET'
    });
    const data = JSON.parse(res.body);
    assert.strictEqual(
      data.service, 
      'hello-world-nodejs', 
      `Expected "hello-world-nodejs", got "${data.service}"`
    );
  });
}

/**
 * Test suite: Backward Compatibility
 */
async function testBackwardCompatibility() {
  console.log('\n📋 Backward Compatibility Tests');
  
  await test('Root path (/) returns "Hello World!"', async () => {
    const res = await makeRequest({
      hostname: HOSTNAME,
      port: PORT,
      path: '/',
      method: 'GET'
    });
    assert.strictEqual(res.statusCode, 200, 'Status should be 200');
    assert.strictEqual(res.body, 'Hello World!\n', 'Body should be "Hello World!\\n"');
    assert.strictEqual(res.headers['content-type'], 'text/plain', 'Content-Type should be text/plain');
  });
  
  await test('Unknown path returns "Hello World!"', async () => {
    const res = await makeRequest({
      hostname: HOSTNAME,
      port: PORT,
      path: '/unknown-path',
      method: 'GET'
    });
    assert.strictEqual(res.statusCode, 200, 'Status should be 200');
    assert.strictEqual(res.body, 'Hello World!\n', 'Body should be "Hello World!\\n"');
  });
}

/**
 * Main test runner
 */
async function runTests() {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║    Health Check Endpoint Unit Tests        ║');
  console.log('╚════════════════════════════════════════════╝');
  
  try {
    console.log('\n🚀 Starting server...');
    await startServer();
    console.log('✅ Server started successfully');
    
    // Run all test suites
    await testHealthEndpointStatusCode();
    await testHealthEndpointHeaders();
    await testHealthResponseBody();
    await testHealthFieldValues();
    await testBackwardCompatibility();
    
  } catch (error) {
    console.error('\n❌ Setup Error:', error.message);
    testResults.failed++;
  } finally {
    stopServer();
  }
  
  // Print summary
  console.log('\n╔════════════════════════════════════════════╗');
  console.log('║              Test Summary                   ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log(`  Total:  ${testResults.passed + testResults.failed}`);
  console.log(`  Passed: ${testResults.passed}`);
  console.log(`  Failed: ${testResults.failed}`);
  
  if (testResults.failed > 0) {
    console.log('\n❌ SOME TESTS FAILED');
    process.exit(1);
  } else {
    console.log('\n✅ ALL TESTS PASSED');
    process.exit(0);
  }
}

// Run tests
runTests().catch(err => {
  console.error('Test runner error:', err);
  stopServer();
  process.exit(1);
});
