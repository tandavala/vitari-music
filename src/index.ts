import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { v1Router } from "./infrastructure/http/api/v1";

const app = express();
const origin = {
  origin: "*",
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors(origin));
app.use(helmet());
app.use(compression());
app.use(morgan("combined"));

app.use("/api/v1", v1Router);

app.listen(8080, () => {
  console.log("[App]: Server listening on 8080");
});

export { app };
