"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const TMF_BASE = '/tmf-api/resourceUsageManagement/v5';
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Routes
const ResourceUsageRoutes_1 = __importDefault(require("./routes/ResourceUsageRoutes"));
const ResourceUsageSpecificationRoutes_1 = __importDefault(require("./routes/ResourceUsageSpecificationRoutes"));
const WebHookRoutes_1 = __importDefault(require("./routes/WebHookRoutes"));
app.use(`${TMF_BASE}/resourceUsage`, ResourceUsageRoutes_1.default);
app.use(`${TMF_BASE}/resourceUsageSpecification`, ResourceUsageSpecificationRoutes_1.default);
app.use('/webhooks', WebHookRoutes_1.default);
app.post('/notifications', (req, res) => {
    console.log('📩 Received Webhook Event:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});
// Health check
app.get('/', (_req, res) => {
    res.send('✅ Resource Usage Management API is running');
});
// Error handler
app.use((err, _req, res, _next) => {
    console.error('❌ Server error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});
// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}${TMF_BASE}`);
});
