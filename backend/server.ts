import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const TMF_BASE = '/tmf-api/resourceUsageManagement/v5';

app.use(cors());
app.use(express.json());

// Routes
import resourceUsageRoutes from './routes/ResourceUsageRoutes';
import specRoutes from './routes/ResourceUsageSpecificationRoutes';
import webhookRoutes from './routes/WebHookRoutes';

app.use(`${TMF_BASE}/resourceUsage`, resourceUsageRoutes);
app.use(`${TMF_BASE}/resourceUsageSpecification`, specRoutes);
app.use('/webhooks', webhookRoutes);

app.post('/notifications', (req, res) => {
    console.log('📩 Received Webhook Event:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

// Health check
app.get('/', (_req, res) => {
    res.send(`
    <h2>Resource Usage Management API</h2>
    <ul>
      <li><a href="/tmf-api/resourceUsageManagement/v5/resourceUsage">Resource Usage</a></li>
      <li><a href="/tmf-api/resourceUsageManagement/v5/resourceUsageSpecification">Resource Usage Specification</a></li>
    </ul>
  `);
});


// Error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    console.error('❌ Server error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}${TMF_BASE}`);
});
