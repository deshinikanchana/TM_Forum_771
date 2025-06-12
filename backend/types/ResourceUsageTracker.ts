export interface UsageCharacteristic {
    name: string;
    value: string;
    valueType: string;
    type?: string;
    baseType?: string;
    schemaLocation?: string;
}

export interface RelatedParty {
    role: string;
    partyId?: string;
    partyName?: string;
    type?: string;
    baseType?: string;
    schemaLocation?: string;
}

export interface ExternalIdentifier {
    owner: string;
    externalIdentifierType: string;
    type?: string;
    baseType?: string;
    schemaLocation?: string;
}

export interface ResourceUsageInput {
    id: string;
    href?: string;
    usageDate: string;
    usageType?: string;
    description?: string;
    isBundle?: boolean;
    usageSpecification?: { id: string };
    resourceId?: string;
    resourceName?: string;
    baseType?: string;
    type?: string;
    schemaLocation?: string;
    usageCharacteristic?: UsageCharacteristic[];
    relatedParty?: RelatedParty[];
    externalIdentifier?: ExternalIdentifier[];
}
