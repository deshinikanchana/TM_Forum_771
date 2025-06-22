"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getListeners = exports.unregisterListener = exports.registerListener = void 0;
const listeners = [];
const registerListener = (url) => {
    if (!listeners.includes(url))
        listeners.push(url);
};
exports.registerListener = registerListener;
const unregisterListener = (url) => {
    const index = listeners.indexOf(url);
    if (index !== -1)
        listeners.splice(index, 1);
};
exports.unregisterListener = unregisterListener;
const getListeners = () => [...listeners];
exports.getListeners = getListeners;
