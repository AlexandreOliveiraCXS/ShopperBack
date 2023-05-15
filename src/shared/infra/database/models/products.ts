import { DataTypes, Model } from 'sequelize';
import connection from '../index';

interface ProductsInstance extends Model {
  id: number;
  name: string,
  cost_price: number,
  sales_price: number,

}
const ProductsModel = connection.define<ProductsInstance>('products', {
  code: {
    primaryKey: true,
    type: DataTypes.NUMBER,
    allowNull: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cost_price: {
    type: DataTypes.NUMBER,
    allowNull: true,
  },
  sales_price: {
    type: DataTypes.NUMBER,
    allowNull: true,
  },
}, {
  freezeTableName: true,
  timestamps:false,
  createdAt:false,
  updatedAt:false,
});

export default ProductsModel