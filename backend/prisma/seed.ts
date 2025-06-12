import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
    await prisma.resourceUsageSpecification.upsert({
        where: { id: 'af59-b504c742900e' },
        update: {},
        create: {
            id: 'af59-b504c742900e',
            name: 'VoiceCall',
            version: '1.0',
            lifecycleStatus: 'active',
            isBundle: false,
            validForStart: new Date('2024-01-01T00:00:00Z'),
            validForEnd: new Date('2030-12-31T23:59:59Z'),
            baseType: 'ResourceUsageSpecification',
            type: 'Specification',
            schemaLocation: 'https://api.example.com/schema/ResourceUsageSpecification'
        }
    });

    console.log('✅ Seeded ResourceUsageSpecification');
}

seed().finally(() => prisma.$disconnect());
