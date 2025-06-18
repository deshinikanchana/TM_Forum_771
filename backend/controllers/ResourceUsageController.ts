import { Request, Response } from 'express';
import * as service from '../services/ResourceUsageService';
import { notifyListeners } from '../webhooks/WebHookPublisher';
import { normalizeUsagePayload } from '../Utils/normalize';

export const create = async (req: Request, res: Response) => {
    try {
        const normalized = normalizeUsagePayload(req.body);
        const result = await service.createResourceUsage(normalized);

        res.status(201).json({
            ...result,
            href: `http://localhost:3000/tmf-api/resourceUsageManagement/v5/resourceUsage/${result.id}`
        });
    } catch (e:any) {
        console.error("Controller error:", e.message, e.stack);
        res.status(400).json({ error: e.message || 'Create failed' });
    }
};

export const list = async (_req: Request, res: Response) => {
    try {
        const usages = await service.getAllResourceUsages();
        res.status(200).json(usages);
    }catch(e){
        res.status(500).json({ error: 'Failed to list resource usages' });
    }
};

export const get = async (req: Request, res: Response) => {
    const usage = await service.getResourceUsageById(req.params.id);
    usage ? res.json(usage) : res.status(404).json({ error: 'Not found' });
};

export const update = async (req: Request, res: Response) => {
    const data = req.body;
    try {
        if (data['@type']) {
            data.type = data['@type'];
            delete data['@type'];
        }

        const result = await service.updateResourceUsage(req.params.id,data);
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
