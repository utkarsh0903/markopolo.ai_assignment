
// users.js
import { Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();
const filePath = path.join(process.cwd(), '/data/users.json'); 
const users = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

router.get("/", (req, res) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  if (!page || !limit || page < 1 || limit < 1) {
    return res.status(400).json({ error: "Invalid page or limit" });
  }

  const start = (page - 1) * limit;
  const end = start + limit;
  const paginatedData = users.slice(start, end);

  res.json({
    data: paginatedData,
    total: users.length,
    page,
    limit,
  });
});

export { router };  
