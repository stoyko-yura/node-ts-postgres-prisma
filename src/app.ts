import express, { Application } from "express";
import cors from "cors";

import * as routes from "./routes";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/users", routes.userRouter);
app.use("/posts", routes.roleRouter);

export default app;
