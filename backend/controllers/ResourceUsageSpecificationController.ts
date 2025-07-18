import { Request, Response } from 'express';
import * as service from '../services/ResourceUsageSpecificationService';
import { notifyListeners } from '../webhooks/WebHookPublisher';
import {normalizeSpecPayload} from '../Utils/normalize';

export const list = async (req: Request, res: Response): Promise<void> => {
    try {
        const specs = await service.getAllSpecifications();
        const enhanced = specs.map(spec => ({
            ...spec,
            href: `http://localhost:3000/tmf-api/resourceUsageManagement/v5/resourceUsageSpecification/${spec.id}`,
        }));
        res.json(enhanced);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const create = async (req: Request, res: Response): Promise<void> => {
    try {
        const payload = normalizeSpecPayload(req.body);
        const result = await service.createSpecification(payload);

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
            href: `http://localhost:3000/tmf-api/resourceUsageManagement/v5/resourceUsageSpecification/${req.params.id}`,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const update = async (req: Request, res: Response): Promise<void> => {
    const data = req.body;
    try {
        if (data['@type']) {
            data.type = data['@type'];
            delete data['@type'];
        }

        const result = await service.updateSpecification(req.params.id, data);
        await notifyListeners('ResourceUsageSpecificationAttributeValueChangeEvent', { specification: result });
        res.status(200).json({result});
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