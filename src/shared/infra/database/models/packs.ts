import { DataTypes, Model } from 'sequelize';
import connection from '../index';
import ProductsModel from './products';

interface PacksInstance extends Model {
  id: number,
  pack_id: number,
  product_id: number,
  qty: number,
  product: {
      code: number,
      name: string,
      cost_price: number,
      sales_price: number
  }

}

const PacksModel = connection.define<PacksInstance>('packs', {
  id: {
    primaryKey: true,
    type: DataTypes.NUMBER,
    allowNull: true,
  },
  
  pack_id: {
    type: DataTypes.NUMBER,
    allowNull: true,
  },
  product_id: {
    type: DataTypes.NUMBER,
    allowNull: true,
  },
  qty: {
    type: DataTypes.NUMBER,
    allowNull: true,
  },
}, {
  freezeTableName: true,
  timestamps:false,
  createdAt:false,
  updatedAt:false,
});

ProductsModel.hasMany(PacksModel, { foreignKey: "product_id" });
PacksModel.belongsTo(ProductsModel, { foreignKey: "product_id" });


export default PacksModel