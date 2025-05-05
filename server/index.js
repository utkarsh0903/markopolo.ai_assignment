// index.js
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { router as usersRouter } from './routes/users.js';  

const app = express();  
const port = process.env.PORT;

app.use(cors());

app.use("/api/users", usersRouter);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});