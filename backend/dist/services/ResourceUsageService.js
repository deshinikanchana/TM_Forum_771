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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteResourceUsage = exports.updateResourceUsage = exports.getResourceUsageById = exports.getAllResourceUsages = exports.createResourceUsage = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createResourceUsage = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    try {
        const generatedId = data.id && data.id.trim() !== ''
            ? data.id
            : crypto.randomUUID();
        const generatedHref = data.href || `http://localhost:3000/tmf-api/resourceUsageManagement/v5/resourceUsage/${generatedId}`;
        if (data.id) {
            const exists = yield prisma.resourceUsage.findUnique({ where: { id: data.id } });
            if (exists) {
                throw new Error(`ResourceUsage with id '${data.id}' already exists.`);
            }
        }
        if ((_a = data.usageSpecification) === null || _a === void 0 ? void 0 : _a.id) {
            const specExists = yield prisma.resourceUsageSpecification.findUnique({
                where: { id: data.usageSpecification.id }
            });
            if (!specExists) {
                throw new Error(`Referenced usageSpecification ID '${data.usageSpecification.id}' does not exist.`);
            }
        }
        const created = yield prisma.resourceUsage.create({
            data: {
                id: generatedId,
                href: generatedHref,
                usageDate: data.usageDate ? new Date(data.usageDate) : new Date(),
                usageType: data.usageType || "UNKNOWN",
                description: data.description || '',
                isBundle: (_b = data.isBundle) !== null && _b !== void 0 ? _b : false,
                resourceId: data.resourceId || 'unknown-resource',
                resourceName: data.resourceName || 'Unnamed Resource',
                baseType: data.baseType || '',
                type: data.type || '',
                schemaLocation: data.schemaLocation || '',
                usageSpecification: ((_c = data.usageSpecification) === null || _c === void 0 ? void 0 : _c.id)
                    ? { connect: { id: data.usageSpecification.id } }
                    : undefined,
                usageCharacteristics: {
                    create: (data.usageCharacteristic || []).map((uc) => ({
                        name: uc.name,
                        value: uc.value,
                        valueType: uc.valueType,
                        type: uc.type || uc['@type'],
                        baseType: uc.baseType || uc['@baseType'],
                        schemaLocation: uc.schemaLocation,
                    }))
                },
                relatedParties: {
                    create: (data.relatedParty || []).map((rp) => {
                        var _a, _b;
                        return ({
                            role: rp.role,
                            partyId: (_a = rp.partyOrPartyRole) === null || _a === void 0 ? void 0 : _a.id,
                            partyName: ((_b = rp.partyOrPartyRole) === null || _b === void 0 ? void 0 : _b.name) || '',
                            type: rp.type || rp['@type'],
                            baseType: rp.baseType || rp['@baseType'],
                            schemaLocation: rp.schemaLocation,
                        });
                    })
                },
                externalIdentifiers: {
                    create: (data.externalIdentifier || []).map((ext) => ({
                        owner: ext.owner,
                        externalIdentifierType: ext.externalIdentifierType,
                        type: ext.type || ext['@type'],
                        baseType: ext.baseType || ext['@baseType'],
                        schemaLocation: ext.schemaLocation,
                    }))
                }
            },
            include: {
                usageCharacteristics: true,
                relatedParties: true,
                externalIdentifiers: true
            }
        });
        return created;
    }
    catch (error) {
        console.error("ResourceUsage Create Error:", error);
        throw error;
    }
});
exports.createResourceUsage = createResourceUsage;
const getAllResourceUsages = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.resourceUsage.findMany({
        include: {
            usageCharacteristics: true,
            relatedParties: true,
            externalIdentifiers: true
        }
    });
});
exports.getAllResourceUsages = getAllResourceUsages;
const getResourceUsageById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.resourceUsage.findUnique({
        where: { id },
        include: {
            usageCharacteristics: true,
            relatedParties: true,
            externalIdentifiers: true,
        }
    });
});
exports.getResourceUsageById = getResourceUsageById;
const updateResourceUsage = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { usageSpecification } = data, rest = __rest(data, ["usageSpecification"]);
    return prisma.resourceUsage.update({
        where: { id },
        data: {
            type: data.type,
            isBundle: data.isBundle
        },
    });
});
exports.updateResourceUsage = updateResourceUsage;
const deleteResourceUsage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.resourceUsage.delete({ where: { id } });
});
exports.deleteResourceUsage = deleteResourceUsage;
