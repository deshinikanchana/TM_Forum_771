import { Request, Response } from 'express';
import * as service from '../services/ResourceUsageSpecificationService';
import { notifyListeners } from '../webhooks/WebHookPublisher';

export const list = async (req: Request, res: Response): Promise<void> => {
    try {
        const specs = await service.getAllSpecifications();
        res.json(specs);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await service.createSpecification(req.body);

        if (!result?.id) {
            res.status(500).json({ error: 'Missing ID in response' });
            return;
        }


        await notifyListeners('ResourceUsageSpecificationCreateEvent', { specification: result });
        res.status(201).json({
            ...result,
            href: `http://localhost:3000/tmf-api/resourceUsageManagement/v5/resourceUsageSpecification/${result.id}`,
        });
    } catch (error: any) {
        console.error("Create error:", error);
        res.status(400).json({ error: error.message });
    }
};

export const get = async (req: Request, res: Response): Promise<void> => {
    try {
        const spec = await service.getSpecificationById(req.params.id);
        if (!spec) {
            res.status(404).json({ error: 'Not found' });
            return;
        }
        res.json({
            ...spec,
            id: req.params.id,
            href: `http://localhost:3000/tmf-api/resourceUsageManagement/v5/resourceUsageSpecification/${req.params.id}`,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await service.updateSpecification(req.params.id, req.body);
        await notifyListeners('ResourceUsageSpecificationAttributeValueChangeEvent', { specification: result });
        res.json(result);
    } catch (error: any) {
        res.status(400).json({ error: 'Update failed' });
    }
};

export const remove = async (req: Request, res: Response): Promise<void> => {
    try {
        await service.deleteSpecification(req.params.id);
        await notifyListeners('ResourceUsageSpecificationDeleteEvent', { id: req.params.id });
        res.sendStatus(204);
    } catch (error: any) {
        res.status(400).json({ error: 'Delete failed' });
    }
};