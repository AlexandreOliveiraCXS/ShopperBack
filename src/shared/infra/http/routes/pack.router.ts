import { Router, Request, Response } from 'express';
import PacksModel from '../../database/models/packs';
import ProductsModel from '../../database/models/products';

const packRouter = Router();


packRouter.get('/', async (req: Request, res: Response) => {
    var result: [] = [];
    const findAll = await PacksModel.findAll({
        include: [{
            model: ProductsModel,
            required: true,
        }]
    });

    findAll.map((row) => {
        const p = {
            pack_id: row.pack_id,
            qty: row.qty,
            value: row.product.sales_price * row.qty,
            products: [{
                idProduct: row.product.code,
                description: row.product.name,
                cost_price: row.product.cost_price,
                sales_price: row.product.sales_price,
                qty: row.qty,
            }]
        }

        const find = result.findIndex((r) => {
            return r.pack_id === row.pack_id;
        });

        if (find < 0) {
            result.push(p);
        } else {
            result[find].value += row.product.sales_price * row.qty;
            
            result[find].products.push({
                idProduct: row.product.code,
                description: row.product.name,
                cost_price: row.product.cost_price,
                sales_price: row.product.sales_price,
                qty: row.qty,
            });
        }
    });

    return res.status(201).json(result);
});

export default packRouter;
