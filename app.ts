import express from 'express';
import mongoose from 'mongoose';
import comicRouter from './src/routes/comicRoutes';
import characterRouter from './src/routes/characterRoutes';
import creatorRouter from './src/routes/creatorRoutes';
import populateRouter from './src/routes/populateRoutes';
import dotenv from 'dotenv';

dotenv.config()

class App {
    express : express.Application
 
    constructor() {
        this.express = express()
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