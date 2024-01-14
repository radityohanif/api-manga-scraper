import express from "express";
import mangaRouter from "./routes/manga";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/manga", mangaRouter);

app.listen(PORT, () => {
  console.log(`🚀 [Server is running] on [http://localhost:${PORT}]`);
});
