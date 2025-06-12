import { prisma } from '../prisma/Client';
import { ResourceUsageInput } from '../types/ResourceUsageTracker';

export const createResourceUsage = async (data: ResourceUsageInput) => {
    try {
    return await prisma.resourceUsage.create({
        data: {
            id: data.id || crypto.randomUUID(),
            href: data.href || "",
            usageDate: data.usageDate && !isNaN(Date.parse(data.usageDate)) ? new Date(data.usageDate) : new Date(),
            usageType: data.usageType,
            description: data.description,
            isBundle: data.isBundle,
            resourceId: data.resourceId,
            resourceName: data.resourceName,
            baseType: data.baseType,
            type: data.type,
            schemaLocation: data.schemaLocation,

            usageSpecification: data.usageSpecification?.id
                ? { connect: { id: data.usageSpecification.id } }
                : undefined,

            usageCharacteristics: {
                create: data.usageCharacteristic?.map(({ ...rest }) => rest) || [],
            },

            relatedParties: {
                create: data.relatedParty?.map(({ ...rest }) => rest) || [],
            },

            externalIdentifiers: {
                create: data.externalIdentifier?.map(({ ...rest }) => rest) || [],
            },
        },
    });
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
            externalIdentifiers: true,
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

export const updateResourceUsage = async (
    id: string,
    data: Partial<ResourceUsageInput>
) => {
    const { usageSpecification, ...rest } = data;

    return prisma.resourceUsage.update({
        where: { id },
        data: {
            ...rest,
            usageSpecification: usageSpecification
                ? { connect: { id: usageSpecification.id } }
                : undefined,
        },
    });
};

export const deleteResourceUsage = async (id: string) => {
    return prisma.resourceUsage.delete({ where: { id } });
};
