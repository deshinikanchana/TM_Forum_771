"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.get = exports.list = exports.create = void 0;
const service = __importStar(require("../services/ResourceUsageService"));
const WebHookPublisher_1 = require("../webhooks/WebHookPublisher");
const normalize_1 = require("../Utils/normalize");
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const normalized = (0, normalize_1.normalizeUsagePayload)(req.body);
        const result = yield service.createResourceUsage(normalized);
        res.status(201).json(Object.assign(Object.assign({}, result), { href: `http://localhost:3000/tmf-api/resourceUsageManagement/v5/resourceUsage/${result.id}` }));
    }
    catch (e) {
        console.error("Controller error:", e.message, e.stack);
        res.status(400).json({ error: e.message || 'Create failed' });
    }
});
exports.create = create;
const list = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const usages = yield service.getAllResourceUsages();
        res.status(200).json(usages);
    }
    catch (e) {
        res.status(500).json({ error: 'Failed to list resource usages' });
    }
});
exports.list = list;
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usage = yield service.getResourceUsageById(req.params.id);
    usage ? res.json(usage) : res.status(404).json({ error: 'Not found' });
});
exports.get = get;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        if (data['@type']) {
            data.type = data['@type'];
            delete data['@type'];
        }
        const result = yield service.updateResourceUsage(req.params.id, data);
        yield (0, WebHookPublisher_1.notifyListeners)('ResourceUsageAttributeValueChangeEvent', { usage: result });
        res.json(result);
    }
    catch (_a) {
        res.status(400).json({ error: 'Update failed' });
    }
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield service.deleteResourceUsage(req.params.id);
        yield (0, WebHookPublisher_1.notifyListeners)('ResourceUsageDeleteEvent', { id: req.params.id });
        res.sendStatus(204);
    }
    catch (_a) {
        res.status(400).json({ error: 'Delete failed' });
    }
});
exports.remove = remove;
