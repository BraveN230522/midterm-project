"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dataMapping = exports.dataMappingSuccess = void 0;
const dataMappingSuccess = (data) => {
    return { data, message: 'Success' };
};
exports.dataMappingSuccess = dataMappingSuccess;
const dataMapping = (data) => {
    return { data };
};
exports.dataMapping = dataMapping;
