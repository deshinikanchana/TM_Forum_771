import { ResourceUsageInput } from '../types/ResourceUsageTracker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export const createResourceUsage = async (data: ResourceUsageInput) => {
    try {
        const generatedId = data.id && data.id.trim() !== ''
            ? data.id
            : crypto.randomUUID();
        const generatedHref = data.href || `http://localhost:3000/tmf-api/resourceUsageManagement/v5/resourceUsage/${generatedId}`;

        if (data.id) {
            const exists = await prisma.resourceUsage.findUnique({ where: { id: data.id } });
            if (exists) {
                throw new Error(`ResourceUsage with id '${data.id}' already exists.`);
            }
        }

        if (data.usageSpecification?.id) {
            const specExists = await prisma.resourceUsageSpecification.findUnique({
                where: { id: data.usageSpecification.id }
            });

            if (!specExists) {
                throw new Error(`Referenced usageSpecification ID '${data.usageSpecification.id}' does not exist.`);
            }
        }

        const created = await prisma.resourceUsage.create({
            data: {
                id: generatedId,
                href: generatedHref,
                usageDate: data.usageDate ? new Date(data.usageDate) : new Date(),
                usageType: data.usageType || "UNKNOWN",
                description: data.description || '',
                isBundle: data.isBundle ?? false,
                resourceId: data.resourceId || 'unknown-resource',
                resourceName: data.resourceName || 'Unnamed Resource',
                baseType: data.baseType || '',
                type: data.type || '',
                schemaLocation: data.schemaLocation || '',

                usageSpecification: data.usageSpecification?.id
                    ? { connect: { id: data.usageSpecification.id } }
                    : undefined,

                usageCharacteristics: {
                    create: (data.usageCharacteristic || []).map((uc: any) => ({
                        name: uc.name,
                        value: uc.value,
                        valueType: uc.valueType,
                        type: uc.type || uc['@type'],
                        baseType: uc.baseType || uc['@baseType'],
                        schemaLocation: uc.schemaLocation,
                    }))
                },

                relatedParties: {
                    create: (data.relatedParty || []).map((rp: any) => ({
                        role: rp.role,
                        partyId: rp.partyOrPartyRole?.id,
                        partyName: rp.partyOrPartyRole?.name || '',
                        type: rp.type || rp['@type'],
                        baseType: rp.baseType || rp['@baseType'],
                        schemaLocation: rp.schemaLocation,
                    }))
                },

                externalIdentifiers: {
                    create: (data.externalIdentifier || []).map((ext: any) => ({
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

    } catch (error) {
        console.error("ResourceUsage Create Error:", error);
        throw error;
    }
};

export const getAllResourceUsages = async () => {
    return prisma.resourceUsage.findMany({
        include: {
            usageCharacteristics: true,
            relatedParties: true,
            externalIdentifiers: true
        }
    });
};

export const getResourceUsageById = async (id: string) => {
    return prisma.resourceUsage.findUnique({
        where: { id },
        include: {
            usageCharacteristics: true,
            relatedParties: true,
            externalIdentifiers: true,
        }
    });
};

export const updateResourceUsage = async (id: string, data: any) => {
    const { usageSpecification, ...rest } = data;

    return prisma.resourceUsage.update({
        where: { id },
        data: {
            type: data.type,
            isBundle: data.isBundle
        },
    });
};

export const deleteResourceUsage = async (id: string) => {
    return prisma.resourceUsage.delete({ where: { id } });
};
