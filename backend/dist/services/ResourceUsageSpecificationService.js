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
exports.deleteSpecification = exports.updateSpecification = exports.getSpecificationById = exports.getAllSpecifications = exports.createSpecification = void 0;
const crypto_1 = __importDefault(require("crypto"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createSpecification = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const generatedId = data.id || crypto_1.default.randomUUID();
    const generatedHref = data.href || `http://localhost:3000/tmf-api/resourceUsageManagement/v5/resourceUsageSpecification/${generatedId}`;
    return prisma.resourceUsageSpecification.upsert({
        where: { id: generatedId },
        update: {},
        create: {
            id: generatedId,
            href: generatedHref,
            name: data.name || '',
            description: String((_a = data.description) !== null && _a !== void 0 ? _a : ''),
            version: data.version || '1.0',
            isBundle: (_b = data.isBundle) !== null && _b !== void 0 ? _b : false,
            lifecycleStatus: data.lifecycleStatus || 'active',
            lastUpdate: data.lastUpdate ? new Date(data.lastUpdate) : new Date(),
            validForStart: data.validForStart ? new Date(data.validForStart) : new Date(),
            validForEnd: data.validForEnd ? new Date(data.validForEnd) : new Date('2030-12-31T23:59:59Z'),
            baseType: data.baseType || '',
            type: data.type || '',
            schemaLocation: data.schemaLocation || '',
            characteristics: {
                create: (data.characteristics || []).map((c) => {
                    var _a, _b, _c, _d, _e, _f;
                    return ({
                        id: c.id || crypto_1.default.randomUUID(),
                        name: c.name || '',
                        valueType: c.valueType || '',
                        description: String((_a = c.description) !== null && _a !== void 0 ? _a : ''),
                        configurable: (_b = c.configurable) !== null && _b !== void 0 ? _b : true,
                        extensible: (_c = c.extensible) !== null && _c !== void 0 ? _c : false,
                        isUnique: (_d = c.isUnique) !== null && _d !== void 0 ? _d : false,
                        minCardinality: (_e = c.minCardinality) !== null && _e !== void 0 ? _e : 0,
                        maxCardinality: (_f = c.maxCardinality) !== null && _f !== void 0 ? _f : 1,
                    });
                }),
            },
        },
    });
});
exports.createSpecification = createSpecification;
const getAllSpecifications = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.resourceUsageSpecification.findMany({
        include: {
            characteristics: true,
        },
    });
});
exports.getAllSpecifications = getAllSpecifications;
const getSpecificationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.resourceUsageSpecification.findUnique({
        where: { id },
        include: {
            characteristics: true,
        },
    });
});
exports.getSpecificationById = getSpecificationById;
const updateSpecification = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.resourceUsageSpecification.update({
        where: { id },
        data: {
            type: data.type,
            version: data.version
        }
    });
});
exports.updateSpecification = updateSpecification;
const deleteSpecification = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.resourceUsageSpecification.delete({
        where: { id },
    });
});
exports.deleteSpecification = deleteSpecification;
