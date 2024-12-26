// Import necessary packages
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');  // Import Prisma Client
const prisma = new PrismaClient();
const app = express();
const port = 5000;

// Enable CORS
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  try {
    const students = await prisma.enrollments.findMany({
      include:{
        courses:true,
      },
    });
    console.log("data: ", students);
    return res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
