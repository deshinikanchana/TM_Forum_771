import { Request, Response } from 'express';
import * as service from '../services/ResourceUsageSpecificationService';
import { notifyListeners } from '../webhooks/WebHookPublisher';

export const create = async (req: Request, res: Response) => {
    try {
        const result = await service.createSpecification(req.body);
        await notifyListeners('ResourceUsageSpecificationCreateEvent', { specification: result });
        res.status(201).json(result);
    } catch (e) {
        res.status(400).json({ error: 'Create failed' });
    }
};

export const list = async (_req: Request, res: Response) => {
    const specs = await service.getAllSpecifications();
    res.json(specs);
};

export const get = async (req: Request, res: Response) => {
    const spec = await service.getSpecificationById(req.params.id);
    spec ? res.json(spec) : res.status(404).json({ error: 'Not found' });
};

export const update = async (req: Request, res: Response) => {
    try {
        const result = await service.updateSpecification(req.params.id, req.body);
        await notifyListeners('ResourceUsageSpecificationAttributeValueChangeEvent', { specification: result });
        res.json(result);
    } catch {
        res.status(400).json({ error: 'Update failed' });
    }
};

export const remove = async (req: Request, res: Response) => {
    try {
        await service.deleteSpecification(req.params.id);
        await notifyListeners('ResourceUsageSpecificationDeleteEvent', { id: req.params.id });
        res.sendStatus(204);
    } catch {
        res.status(400).json({ error: 'Delete failed' });
    }
};
