import axios from 'axios';
import { getListeners } from './WebHookRegistry';
import { v4 as uuidv4 } from 'uuid';

export const notifyListeners = async (eventType: string, payload: any) => {
    const eventBody = {
        eventId: uuidv4(),
        eventTime: new Date().toISOString(),
        eventType,
        event: payload,
        source: {
            id: 'ResourceUsageTracker',
            name: 'ResourceUsageAPI',
            "@type": "ReportingResource"
        }
    };

    const listeners = getListeners();
    for (const url of listeners) {
        try {
            await axios.post(url, eventBody);
        } catch (err) {
            console.warn(`Failed to notify listener ${url}`);
        }
    }
};
