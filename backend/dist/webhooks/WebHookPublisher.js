"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notifyListeners = void 0;
const axios_1 = __importDefault(require("axios"));
const WebHookRegistry_1 = require("./WebHookRegistry");
const uuid_1 = require("uuid");
const notifyListeners = (eventType, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const eventBody = {
        eventId: (0, uuid_1.v4)(),
        eventTime: new Date().toISOString(),
        eventType,
        event: payload,
        source: {
            id: 'ResourceUsageTracker',
            name: 'ResourceUsageAPI',
            "@type": "ReportingResource"
        }
    };
    const listeners = (0, WebHookRegistry_1.getListeners)();
    for (const url of listeners) {
        try {
            yield axios_1.default.post(url, eventBody);
        }
        catch (err) {
            console.warn(`Failed to notify listener ${url}`);
        }
    }
});
exports.notifyListeners = notifyListeners;
