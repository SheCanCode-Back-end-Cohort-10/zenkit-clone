import express from "express";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';

import configurations from "../configs/index.js";
import allRoutes from "../routes/index.js";
import ErrorHandler from "../middlewares/ErrorHandler.js";
import documentation from '../docs/documentation.js';
import ErrorHandlerMiddleware from "../middlewares/ErrorHandlerV2.js";

// Cors policy configuration.
const corsOptions = {
    allowedHeaders: ["Authorization","Content-Type"],
    methods: ["GET", "POST", "UPDATE" ],
    origin: ["http://localhost:5173", configurations.CLIENT_APP],
}

export default function (app) {
    app.use(cors());
    app.use(express.json());

    app.use('/api-doc', swaggerUi.serve);
    app.use('/api-doc', swaggerUi.setup(documentation));
    app.use('/api/v1', allRoutes);

    // Error handling middleware
    app.use(ErrorHandlerMiddleware);

    return app;
}