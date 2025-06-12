import { prisma } from '../prisma/Client';

export const createSpecification = async (data: any) => {
    return prisma.resourceUsageSpecification.create({
        data: {
            ...data,
            characteristics: {
                create: data.characteristics || [],
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
