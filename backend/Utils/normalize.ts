export function normalizeSpecPayload(data: any) {
    if (data['@type']) {
        data.type = data['@type'];
        delete data['@type'];
    }

    if (data['@baseType']) {
        data.baseType = data['@baseType'];
        delete data['@baseType'];
    }

    if (Array.isArray(data.specCharacteristic)) {
        data.characteristics = data.specCharacteristic.map((c: any) => {
            if (c['@type']) {
                c.type = c['@type'];
                delete c['@type'];
            }
            return c;
        });
        delete data.specCharacteristic;
    }

    if (data.validFor) {
        data.validForStart = data.validFor.startDateTime;
        data.validForEnd = data.validFor.endDateTime;
        delete data.validFor;
    }

    return data;
}

export function normalizeUsagePayload(data: any) {
    const cloned = { ...data };

    if (cloned['@type']) {
        cloned.type = cloned['@type'];
        delete cloned['@type'];
    }

    if (cloned['@baseType']) {
        cloned.baseType = cloned['@baseType'];
        delete cloned['@baseType'];
    }

    if (cloned.usageDate) {
        cloned.usageDate = new Date(cloned.usageDate);
    }

    if (Array.isArray(cloned.usageCharacteristic)) {
        cloned.usageCharacteristic = cloned.usageCharacteristic.map((c: any) => ({
            ...c,
            type: c['@type'] || c.type,
            baseType: c['@baseType'] || c.baseType,
        }));
    }

    if (Array.isArray(cloned.relatedParty)) {
        cloned.relatedParty = cloned.relatedParty.map((rp: any) => {
            const party = rp.partyOrPartyRole || {};
            return {
                role: rp.role,
                partyId: party.id,
                partyName: party.name,
                type: party['@type'],
                baseType: party['@baseType'],
                schemaLocation: party.schemaLocation,
            };
        });
    }

    if (Array.isArray(cloned.externalIdentifier)) {
        cloned.externalIdentifier = cloned.externalIdentifier.map((ext: any) => ({
            owner: ext.owner,
            externalIdentifierType: ext.externalIdentifierType,
            type: ext['@type'] || ext.type,
            baseType: ext['@baseType'] || ext.baseType,
            schemaLocation: ext.schemaLocation,
        }));
    }

    if (cloned.resource) {
        cloned.resourceId = cloned.resource.id;
        cloned.resourceName = cloned.resource.name;
        delete cloned.resource;
    }

    if (cloned.usageSpecification) {
        cloned.usageSpecification = { id: cloned.usageSpecification.id };
    }

    return cloned;
}
