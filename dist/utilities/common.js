"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateMissingFieldMsg = void 0;
const generateMissingFieldMsg = (obj) => {
    const missingField = Object.entries(obj).find(([key, value]) => {
        return !value;
    });
    return `${missingField === null || missingField === void 0 ? void 0 : missingField[0]} is a required field`;
};
exports.generateMissingFieldMsg = generateMissingFieldMsg;
