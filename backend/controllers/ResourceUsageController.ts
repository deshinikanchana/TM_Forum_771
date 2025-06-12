import { Request, Response } from 'express';
import * as service from '../services/ResourceUsageService';
import { notifyListeners } from '../webhooks/WebHookPublisher';

export const create = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        const result = await service.createResourceUsage(data);
        await notifyListeners('ResourceUsageCreateEvent', { usage: result });
        res.status(201).json(result);
    } catch (e) {
        res.status(400).json({ error: 'Create failed' });
    }
};

export const list = async (_req: Request, res: Response) => {
    const usages = await service.getAllResourceUsages();
    res.json(usages);
};

export const get = async (req: Request, res: Response) => {
    const usage = await service.getResourceUsageById(req.params.id);
    usage ? res.json(usage) : res.status(404).json({ error: 'Not found' });
};

export const update = async (req: Request, res: Response) => {
    try {
        const result = await service.updateResourceUsage(req.params.id, req.body);
        await notifyListeners('ResourceUsageAttributeValueChangeEvent', { usage: result });
        res.json(result);
    } catch {
        res.status(400).json({ error: 'Update failed' });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        await service.deleteResourceUsage(req.params.id);
        await notifyListeners('ResourceUsageDeleteEvent', { id: req.params.id });
        res.sendStatus(204);
    } catch {
        res.status(400).json({ error: 'Delete failed' });
    }
};
