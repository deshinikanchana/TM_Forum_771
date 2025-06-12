const listeners: string[] = [];

export const registerListener = (url: string) => {
    if (!listeners.includes(url)) listeners.push(url);
};

export const unregisterListener = (url: string) => {
    const index = listeners.indexOf(url);
    if (index !== -1) listeners.splice(index, 1);
};

export const getListeners = () => [...listeners];
