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

export default async function getValidationErrors(product: iRowProducts[]): Promise<Errors[]> {
    var validationErrors: Errors[] = [];

    await Promise.all(product.map(async (p) => {
        const Error = [];

            if (!p.code || !p.costPrice || !p.description || !p.salesPrice) {
                console.log("Um ou mais campos estão imcorretos!")
                Error.push("Um ou mais campos estão imcorretos!");
            }

            if (!parseFloat(p.salesPrice))
                Error.push("Preço de custo não preenchido");

            if (!parseFloat(p.salesPrice))
                Error.push("Preço de venda não preenchido");

            if (parseFloat(p.salesPrice) < parseFloat(p.costPrice))
                Error.push("O preço de venda não pode ser menor que o de custo (Financeiro)");

            const productFind = await ProductsModel.findOne({ where: { code: p.code } });
            const currentPrice = productFind ? productFind.sales_price : 0;

            var discount = (currentPrice - parseFloat(p.salesPrice)) / currentPrice * 100;
            discount = discount < 0 ? (discount * -1) : discount;

            if (discount !== 0 && (discount > 10.5 || discount < 9.8))
                Error.push("O Reajuste não pode ser maior ou menor que 10% (Marketing)");

        if (Error.length > 0) {
            validationErrors.push({
                product: p.code,
                Error: Error
            });
        }
    }));

    console.log("Errors: " + validationErrors.length)
    return validationErrors;

}