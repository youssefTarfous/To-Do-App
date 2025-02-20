import express from "express";
import cors from "cors";
import ConnectToMongoDb from "./Config/ConnectToMongoDb.mjs";
import mainRouter from "./Router/mainRouter.mjs";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT","PATCH", "DELETE"],
  })
);

app.use("/api", mainRouter);

app.listen(process.env.port || 3000, () => {
  ConnectToMongoDb();
  console.log(`Server running on port ${process.env.port || 3000}`);
});
