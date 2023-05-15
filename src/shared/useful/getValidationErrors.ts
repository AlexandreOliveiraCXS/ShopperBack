import ProductsModel from "../infra/database/models/products";

interface Errors {
    product: string,
    Error: string[]
}

interface iRowProducts {
    code: string,
    description: string,
    costPrice: string,
    salesPrice: string,
}

export default async function getValidationErrors(product: iRowProducts): Promise<Errors[]> {
    const validationErrors: Errors[] = [];

    const Error = [];
    if (parseFloat(product.salesPrice) < parseFloat(product.costPrice))
        Error.push("O preço de venda não pode ser menor que o de custo (Financeiro)");

    const productFind = await ProductsModel.findOne({ where: { code: product.code } });

    const currentPrice = productFind ? productFind.sales_price : 0;
    
    var discount = (currentPrice - parseFloat(product.salesPrice)) / currentPrice * 100;
    discount = discount < 0 ? (discount * -1) : discount;
    if (discount !== 0 && (discount > 10.5 || discount < 9.8))
        Error.push("o Reajuste não pode ser maior ou menor que 10% (Marketing)");

    if (Error.length > 0)
        validationErrors.push({
            product: product.code,
            Error: Error
        });

    return validationErrors;
}