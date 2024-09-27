"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middlewaresConfig = __importStar(require("../middlewares/middlewares.json"));
const path_1 = __importDefault(require("path"));
const ApiRouter_1 = __importDefault(require("./ApiRouter"));
class BaseRouter {
    constructor() {
        this.router = (0, express_1.Router)();
        this.initMiddlewares();
        this.initApiRoutes(); // Corrected method call order
        this.handleMethodNotAllowed(); // Handle method not allowed
        this.handleNotFound(); // Handle route not found
    }
    initMiddlewares() {
        const { all } = middlewaresConfig;
        if (all && Array.isArray(all)) {
            all.forEach((middlewarePath) => {
                const resolvedPath = path_1.default.resolve(__dirname, '..', middlewarePath);
                const middleware = require(resolvedPath).default;
                this.router.use((req, res, next) => {
                    middleware.handle(req, res, next);
                });
            });
        }
    }
    initApiRoutes() {
        this.router.use('/api', ApiRouter_1.default);
    }
    handleMethodNotAllowed() {
        this.router.use((req, res, next) => {
            res.setHeader('Allow', 'GET, POST'); // Define allowed methods for your route
            if (req.method !== 'GET' && req.method !== 'POST') {
                res.status(405).json({ message: 'Method Not Allowed', allowedMethods: ['GET', 'POST'] });
            }
            else {
                next(); // Move to next middleware if method is allowed
            }
        });
    }
    handleNotFound() {
        this.router.use('*', (req, res) => {
            res.status(404).json({ message: 'Route Not Found!' });
        });
    }
}
exports.default = BaseRouter;
