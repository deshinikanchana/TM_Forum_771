import { Request, Response } from 'express';
import { registerListener, unregisterListener, getListeners } from '../webhooks/WebHookRegistry';

export const registerWebhook = (req: Request, res: Response) => {
    const { url } = req.body;
    if (!url) {
        res.status(400).json({ error: 'URL is required' });
        return;
    }

    registerListener(url);
    res.status(201).json({ message: 'Listener registered', url });
};

export const unregisterWebhook = (req: Request, res: Response) => {
    const { url } = req.body;
    if (!url) {
        res.status(400).json({ error: 'URL is required' });
        return;
    }

    unregisterListener(url);
    res.status(204).send();
};

export const listWebhooks = (_req: Request, res: Response) => {
    res.status(200).json(getListeners());
};

