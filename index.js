import express from 'express';
import mongoose from 'mongoose';
import todoRoutes from './routes/todo.routes.js';
import cors from 'cors'
import * as dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = process.env.PORT || 3000; 
app.use(cors({
  origin: 'https://fullstack-todo-vue.netlify.app' 
}));

app.use(express.json());
const mongoUri = process.env.DB_URI;
// MongoDB Connection
// const mongoUri = 'mongodb://localhost:27017/todoApp';

if (!mongoUri) {
  console.error('MongoDB URL is not defined in the environment variables.');
} else {
  mongoose
    .connect(mongoUri, {
    })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch((err) => {
      console.error('Error connecting to MongoDB:', err);
    });
}


app.use('/api', todoRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
