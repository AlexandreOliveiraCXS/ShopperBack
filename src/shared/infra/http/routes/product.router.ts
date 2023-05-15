import { Router, Request, Response } from 'express';
import getValidationErrors from '../../../useful/getValidationErrors';
import ProductsModel from '../../database/models/products';

interface iRowProducts {
    code: string,
    description: string,
    costPrice: string,
    salesPrice: string,
}

interface Errors {
    product: string,
    Error: string[]
}

const productRouter = Router();

productRouter.post('/', async (req: Request, res: Response) => {
    const listErrors: Errors[] = [];
    const listProduct: iRowProducts[] = req.body.listProduct;

    const errors = await getValidationErrors(listProduct);

    if (errors.length <= 0) {
        await Promise.all(listProduct.map(async (product) => {

            const productFind = await ProductsModel.findOne({ where: { code: product.code } });

            if (!productFind) {
                const productNew = await ProductsModel.create({
                    code: product.code,
                    name: product.description,
                    cost_price: product.costPrice,
                    sales_price: product.salesPrice,
                });
            } else {
                const productUpdate = await productFind.update({
                    cost_price: product.costPrice,
                    sales_price: product.salesPrice
                });
            }
        }));
    } else {
        await Promise.all(errors.map((e) => {
            listErrors.push(e);
        }));
    }

    return res.status(201).json({ status: listErrors });
});

productRouter.get('/all', async (req: Request, res: Response) => {
    const productFind = await ProductsModel.findAll();

    return res.status(202).json(productFind);
});

productRouter.get('/', async (req: Request, res: Response) => {
    const productFind = await ProductsModel.findOne({ where: { code: req.query.idProduct } });

    return res.status(202).json(productFind);
});

export default productRouter;
