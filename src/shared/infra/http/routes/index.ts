import { Router } from 'express';
import cors from 'cors';
import productRouter from './product.router';
import packRouter from './pack.router';

const routes = Router();

routes.use(cors());

routes.use('/product', productRouter);
routes.use('/pack', packRouter);

export default routes;