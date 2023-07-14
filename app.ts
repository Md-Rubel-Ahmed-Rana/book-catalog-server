import express, { Application } from "express";
import cors from "cors"
import dotenv from "dotenv"

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())
dotenv.config();




export default app