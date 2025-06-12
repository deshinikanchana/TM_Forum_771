import { prisma } from '../prisma/Client';
import { ResourceUsageInput } from '../types/ResourceUsageTracker';

export const createResourceUsage = async (data: ResourceUsageInput) => {
    return prisma.resourceUsage.create({
        data: {
            id: data.id,
            href: data.href,
            usageDate: new Date(data.usageDate),
            usageType: data.usageType,
            description: data.description,
            isBundle: data.isBundle,
            resourceId: data.resourceId,
            resourceName: data.resourceName,
            baseType: data.baseType,
            type: data.type,
            schemaLocation: data.schemaLocation,

            usageSpecification: data.usageSpecification
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
