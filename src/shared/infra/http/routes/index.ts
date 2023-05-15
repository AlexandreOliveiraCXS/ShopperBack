import { Router } from 'express';
import cors from 'cors';
import productRouter from './product.router';

const routes = Router();

routes.use(cors());

routes.use('/product', productRouter);

export default routes;