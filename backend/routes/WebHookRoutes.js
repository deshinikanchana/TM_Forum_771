"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WebHookController_1 = require("../controllers/WebHookController");
const router = (0, express_1.Router)();
router.post('/register', WebHookController_1.registerWebhook);
router.post('/unregister', WebHookController_1.unregisterWebhook);
router.get('/', WebHookController_1.listWebhooks);
exports.default = router;
