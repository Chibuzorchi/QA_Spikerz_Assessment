"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const child_process_1 = require("child_process");
const stream_1 = require("stream");
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok', timestamp: new Date().toISOString() });
});
// Enhanced automation endpoint with real-time console output
app.post('/run-automation', async (req, res) => {
    console.log('\n--- Starting Playwright tests ---');
    const startTime = Date.now();
    const playwrightProcess = (0, child_process_1.spawn)('npx', ['playwright', 'test'], {
        stdio: ['inherit', 'pipe', 'pipe']
    });
    // Create streams to capture output
    const stdoutStream = new stream_1.PassThrough();
    const stderrStream = new stream_1.PassThrough();
    let stdoutData = '';
    let stderrData = '';
    playwrightProcess.stdout.pipe(stdoutStream);
    playwrightProcess.stderr.pipe(stderrStream);
    // Pipe to console in real-time
    playwrightProcess.stdout.on('data', (data) => {
        process.stdout.write(data);
        stdoutData += data.toString();
    });
    playwrightProcess.stderr.on('data', (data) => {
        process.stderr.write(data);
        stderrData += data.toString();
    });
    // Handle process completion
    playwrightProcess.on('close', (code) => {
        const duration = Date.now() - startTime;
        console.log(`\n--- Tests completed in ${duration}ms with exit code ${code} ---`);
        if (code === 0) {
            res.status(200).json({
                success: true,
                exitCode: code,
                duration: `${duration}ms`,
                output: stdoutData,
                timestamp: new Date().toISOString()
            });
        }
        else {
            res.status(500).json({
                success: false,
                exitCode: code,
                duration: `${duration}ms`,
                error: stderrData || 'Unknown error',
                output: stdoutData,
                timestamp: new Date().toISOString()
            });
        }
    });
    // Handle errors
    playwrightProcess.on('error', (error) => {
        console.error('\nProcess error:', error);
        res.status(500).json({
            success: false,
            error: error.message,
            timestamp: new Date().toISOString()
        });
    });
});
app.listen(port, () => {
    console.log(`API server running at http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map