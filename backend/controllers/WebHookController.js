"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listWebhooks = exports.unregisterWebhook = exports.registerWebhook = void 0;
const WebHookRegistry_1 = require("../webhooks/WebHookRegistry");
const registerWebhook = (req, res) => {
    const { url } = req.body;
    if (!url) {
        res.status(400).json({ error: 'URL is required' });
        return;
    }
    (0, WebHookRegistry_1.registerListener)(url);
    res.status(201).json({ message: 'Listener registered', url });
};
exports.registerWebhook = registerWebhook;
const unregisterWebhook = (req, res) => {
    const { url } = req.body;
    if (!url) {
        res.status(400).json({ error: 'URL is required' });
        return;
    }
    (0, WebHookRegistry_1.unregisterListener)(url);
    res.status(204).send();
};
exports.unregisterWebhook = unregisterWebhook;
const listWebhooks = (_req, res) => {
    res.status(200).json((0, WebHookRegistry_1.getListeners)());
};
exports.listWebhooks = listWebhooks;
