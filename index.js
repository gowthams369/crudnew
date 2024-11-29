import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import dototenv from "dotenv"
import route from "./routes/userRoute.js";

const app = express();

app.use(bodyParser.json());
dototenv.config();
const PORT = process.env.PORT || 5000;
const MONGOURL= process.env.MONGO_URL;

mongoose
.connect(MONGOURL)
.then(()=>{
    console.log("Database connected sucessfully.");
    app.listen(PORT,()=>{
        console.log(`server is running on port ${PORT}`);
    });
})
.catch((error) => console.log(error));

app.use("/api/user",route);
