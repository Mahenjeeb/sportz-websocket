import express from "express";
import {matchRouter} from "./routes/matches.js";
const app = express();
app.use(express.json());
app.get("/", (_, resp) => {
  return resp.send("App is running");
});
app.use('/matches', matchRouter);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
