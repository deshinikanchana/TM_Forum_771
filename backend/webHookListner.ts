import express from 'express';
const app = express();
app.use(express.json());

app.post('/notifications', (req, res) => {
    console.log('📩 Received Webhook Event:', JSON.stringify(req.body, null, 2));
    res.sendStatus(200);
});

app.listen(4000, () => console.log('🔔 Webhook listener running on http://localhost:4000'));
