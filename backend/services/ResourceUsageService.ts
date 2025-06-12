import { prisma } from '../prisma/Client';
import { ResourceUsageInput } from '../types/ResourceUsageTracker';

export const createResourceUsage = async (data: ResourceUsageInput) => {
    try {
        const generatedId = data.id || crypto.randomUUID();
        const generatedHref = data.href || `http://localhost:3000/tmf-api/resourceUsageManagement/v5/resourceUsage/${generatedId}`;

        return await prisma.resourceUsage.upsert({
            where: {id: generatedId},
            update: {},
            create: {
                id: generatedId,
                href: generatedHref,
                usageDate: data.usageDate && !isNaN(Date.parse(data.usageDate)) ? new Date(data.usageDate) : new Date(),
                usageType: data.usageType,
                description: data.description,
                isBundle: Boolean(data.isBundle),
                resourceId: data.resourceId,
                resourceName: data.resourceName,
                baseType: data.baseType,
                type: data.type,
                schemaLocation: data.schemaLocation,
                usageSpecification: data.usageSpecification?.id
                    ? {connect: {id: data.usageSpecification.id}}
                    : undefined,
                usageCharacteristics: {
                    create: data.usageCharacteristic || []
                },
                relatedParties: {
                    create: data.relatedParty || []
                },
                externalIdentifiers: {
                    create: data.externalIdentifier || []
                }
            }
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
