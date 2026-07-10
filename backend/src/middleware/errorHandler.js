import { errorHandler as legacy } from './error.middleware.js';

// This module exposes a consistent name expected by some parts of the project
export const errorHandler = legacy;
export default errorHandler;
