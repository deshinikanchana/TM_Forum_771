import { Router } from 'express';
import * as ctrl from '../controllers/ResourceUsageController';

const router = Router();

router.get('/', ctrl.list);
router.get('/:id', ctrl.get);
router.post('/', ctrl.create);
router.put('/:id', ctrl.update);
router.delete('/:id', ctrl.remove);

export default router;




