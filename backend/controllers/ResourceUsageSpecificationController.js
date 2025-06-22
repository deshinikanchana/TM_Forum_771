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
exports.remove = exports.update = exports.get = exports.create = exports.list = void 0;
const service = __importStar(require("../services/ResourceUsageSpecificationService"));
const WebHookPublisher_1 = require("../webhooks/WebHookPublisher");
const normalize_1 = require("../Utils/normalize");
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const specs = yield service.getAllSpecifications();
        const enhanced = specs.map(spec => (Object.assign(Object.assign({}, spec), { href: `http://localhost:3000/tmf-api/resourceUsageManagement/v5/resourceUsageSpecification/${spec.id}` })));
        res.json(enhanced);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.list = list;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = (0, normalize_1.normalizeSpecPayload)(req.body);
        const result = yield service.createSpecification(payload);
        if (!(result === null || result === void 0 ? void 0 : result.id)) {
            res.status(500).json({ error: 'Missing ID in response' });
            return;
        }
        yield (0, WebHookPublisher_1.notifyListeners)('ResourceUsageSpecificationCreateEvent', { specification: result });
        res.status(201).json(Object.assign(Object.assign({}, result), { href: `http://localhost:3000/tmf-api/resourceUsageManagement/v5/resourceUsageSpecification/${result.id}` }));
    }
    catch (error) {
        console.error("Create error:", error);
        res.status(400).json({ error: error.message });
    }
});
exports.create = create;
const get = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const spec = yield service.getSpecificationById(req.params.id);
        if (!spec) {
            res.status(404).json({ error: 'Not found' });
            return;
        }
        res.json(Object.assign(Object.assign({}, spec), { href: `http://localhost:3000/tmf-api/resourceUsageManagement/v5/resourceUsageSpecification/${req.params.id}` }));
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.get = get;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    try {
        if (data['@type']) {
            data.type = data['@type'];
            delete data['@type'];
        }
        const result = yield service.updateSpecification(req.params.id, data);
        yield (0, WebHookPublisher_1.notifyListeners)('ResourceUsageSpecificationAttributeValueChangeEvent', { specification: result });
        res.status(200).json({ result });
    }
    catch (error) {
        res.status(400).json({ error: 'Update failed' });
    }
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield service.deleteSpecification(req.params.id);
        yield (0, WebHookPublisher_1.notifyListeners)('ResourceUsageSpecificationDeleteEvent', { id: req.params.id });
        res.sendStatus(204);
    }
    catch (error) {
        res.status(400).json({ error: 'Delete failed' });
    }
});
exports.remove = remove;
