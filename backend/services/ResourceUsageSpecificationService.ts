import { prisma } from '../prisma/Client';

export const createSpecification = async (data: any) => {
    const generatedId = data.id || crypto.randomUUID();

    return prisma.resourceUsageSpecification.create({
        data: {
            id: generatedId,
            name: data.name || '',
            description: data.description || "",
            version: data.version || "1.0",
            isBundle: data.isBundle ?? false,
            lifecycleStatus: data.lifecycleStatus || "active",
            lastUpdate: data.lastUpdate ? new Date(data.lastUpdate) : new Date(),
            validForStart: data.validForStart ? new Date(data.validForStart) : new Date(),
            validForEnd: data.validForEnd ? new Date(data.validForEnd) : new Date("2030-12-31T23:59:59Z"),
            baseType: data.baseType || '',
            type: data.type || '',
            schemaLocation: data.schemaLocation || '',
            characteristics: {
                create: (data.characteristics || []).map((c: any) => ({
                    id: c.id || crypto.randomUUID(),
                    name: c.name || '',
                    valueType: c.valueType || '',
                    description: c.description || '',
                    configurable: c.configurable ?? true,
                    extensible: c.extensible ?? false,
                    isUnique: c.isUnique ?? false,
                    minCardinality: c.minCardinality ?? 0,
                    maxCardinality: c.maxCardinality ?? 1,
                })),
            },
        },
    });
};

export const getAllSpecifications = async () => {
    return prisma.resourceUsageSpecification.findMany({
        include: {
            characteristics: true,
        },
    });
};

export const getSpecificationById = async (id: string) => {
    return prisma.resourceUsageSpecification.findUnique({
        where: { id },
        include: {
            characteristics: true,
        },
    });
};

export const updateSpecification = async (id: string, data: any) => {
    return prisma.resourceUsageSpecification.update({
        where: { id },
        data,
    });
};

export const deleteSpecification = async (id: string) => {
    return prisma.resourceUsageSpecification.delete({
        where: { id },
    });
};
