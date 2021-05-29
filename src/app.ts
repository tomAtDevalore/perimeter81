import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRouter';
import logger from './log/logger';
import productRouter from './routes/productsRouter';

// Environment file config
config();

// Port is now available to the Node.js runtime
const port = parseInt(process.env.SERVER_PORT ?? '0');

// Create express instance
const app = express();

app.use(cors());

// Accept json files
app.use(express.json());

// Route incoming request to destination
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);

// Start the express server
app.listen(port, () => {
  logger.info(`server started at http://localhost:${port}`);
});
