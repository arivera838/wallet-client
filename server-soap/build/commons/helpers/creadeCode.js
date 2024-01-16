"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const creadeCode = () => {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber.toString();
};
exports.default = creadeCode;
