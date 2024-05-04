import express from 'express';
import mongoose from 'mongoose';
import comicRouter from './src/routes/comicRoutes';
import characterRouter from './src/routes/characterRoutes';
import creatorRouter from './src/routes/creatorRoutes';
import populateRouter from './src/routes/populateRoutes';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config()

class App {
    express : express.Application
 
    constructor() {

        const swaggerDocument = JSON.parse(fs.readFileSync(path.join(__dirname, 'swagger-output.json'), 'utf8'));

        this.express = express()
        this.express.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
        this.middleware()
        this.database()
        this.routes()
    }

    private middleware(): void {
        this.express.use(express.json())
    }

    private async database() {
        try {
            mongoose.set("strictQuery", true)
            await mongoose.connect("mongodb://0.0.0.0:27017/marvel-api")
            console.log("Connected to database")
        } catch (error) {
            console.log("Cannot conect database: ", error)
        }
    }

    private routes(): void {
        this.express.use(comicRouter)
        this.express.use(characterRouter)
        this.express.use(creatorRouter)
        this.express.use(populateRouter)
    }
}

export default new App().express