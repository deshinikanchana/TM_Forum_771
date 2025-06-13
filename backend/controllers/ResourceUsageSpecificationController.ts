import { Request, Response } from 'express';
import * as service from '../services/ResourceUsageSpecificationService';
import { notifyListeners } from '../webhooks/WebHookPublisher';


export const list = async (req: Request, res: Response) => {
    const specs = await service.getAllSpecifications();
    res.json(specs);
};

export const create = async (req: Request, res: Response) => {
    try {
        const result = await service.createSpecification(req.body);
        await notifyListeners('ResourceUsageSpecificationCreateEvent', { specification: result });
        res.status(201).json(result);
    } catch (e) {
        res.status(400).json({ error: 'Create failed' });
    }
};

export const get = async (req: Request, res: Response): Promise<void> => {
    const spec = await service.getSpecificationById(req.params.id);
    if (!spec) {
        res.status(404).json({ error: 'Not found' });
        return;
    }

    res.json({
        ...spec,
        id:req.params.id,
        href: `http://localhost:3000/tmf-api/resourceUsageManagement/v5/resourceUsageSpecification/${req.params.id}`,
    });
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
