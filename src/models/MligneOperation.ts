import sequelize from '../bd/cnx';
import {Model, Optional, DataTypes} from 'sequelize';

interface ILigneOperation {
    id:         number,
    code:       string,
    libelle:    string,
    value:      number,
    produit:    number,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
}

class CLigneOperation extends Model<ILigneOperation> implements ILigneOperation{

    public id!:      number;
    public code!:    string;
    public libelle!: string;
    public value!:   number;
    public produit!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

CLigneOperation.init({
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
    },
    value: {
        type: DataTypes.STRING(12),
        allowNull: false,
    },
    produit: {
        type: DataTypes.STRING(8),
        allowNull: false,
    }
},{
    timestamps: true,
    sequelize: sequelize,
    paranoid: true,
    modelName: 'LigneOperation',
    freezeTableName: true,
    schema: "sc_devteam"
  })

  export default CLigneOperation;