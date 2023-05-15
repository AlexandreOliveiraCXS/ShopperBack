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

    listProduct.map(async (product) => {
        const errors = await getValidationErrors(product);

        if (!product.code || !product.costPrice || !product.description || !product.salesPrice) {
            console.log("Um ou mais campos estão imcorretos!")
            return;
        }
        if (errors.length <= 0) {
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
        } else {
            console.log(errors)
            errors.map((e) => { listErrors.push(e) });
        }
    });

    return res.status(201).json({ status: listErrors });
});

productRouter.get('/', async (req: Request, res: Response) => {
    const productFind = await ProductsModel.findOne({ where: { code: req.query.idProduct } });

    return res.status(202).json(productFind);
});

export default productRouter;
