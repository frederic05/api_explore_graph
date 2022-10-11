import sequelize from '../bd/cnx';
import {Model, Optional, DataTypes} from 'sequelize';

interface Iproduit {
    id:         number,
    code:       string,
    libelle:    string,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
}

class Cproduit extends Model<Iproduit> implements Iproduit{

    public id!:      number;
    public code!:    string;
    public libelle!: string;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

Cproduit.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type: DataTypes.STRING(10),
        allowNull: false,
    },
    libelle: {
        type: DataTypes.STRING(50),
        allowNull: false,
    }
},{
    timestamps: true,
    sequelize: sequelize,
    paranoid: true,
    modelName: 'Produit',
    freezeTableName: true,
    schema: "sc_devteam"
  })

  export default Cproduit;