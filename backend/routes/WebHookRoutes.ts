import { Router } from 'express';
import {registerWebhook,listWebhooks, unregisterWebhook} from '../controllers/WebHookController';

const router = Router();

router.post('/register', registerWebhook);
router.post('/unregister', unregisterWebhook);
router.get('/', listWebhooks);

export default router;
