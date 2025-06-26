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
    <html>
      <head>
        <title>Resource Usage Management API</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f9f9f9;
            padding: 40px;
            color: #333;
          }
          h1 {
            color: #005a9c;
          }
          a {
            display: block;
            margin: 10px 0;
            color: #007bff;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <h1>Resource Usage Management API is running</h1>
        <a href="https://tmforum771-production.up.railway.app/tmf-api/resourceUsageManagement/v5/resourceUsage" target="_blank">
          View Resource Usage
        </a>
        <a href="https://tmforum771-production.up.railway.app/tmf-api/resourceUsageManagement/v5/resourceUsageSpecification" target="_blank">
          View Resource Usage Specification
        </a>
      </body>
    </html>
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
