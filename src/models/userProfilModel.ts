import sequelize from '../bd/cnx';
import {Model, Optional, DataTypes} from 'sequelize';

interface IProfil {
    id?:number,
    libelle:string,

    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
    
}

class CProfil extends Model <IProfil> implements IProfil{

    public id!: number;
    public libelle!: string;

    readonly createdAt!: Date;
    readonly updatedAt!: Date;
    readonly deletedAt!: Date;

}

CProfil.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    libelle: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},{
    timestamps: true,
    sequelize: sequelize,
    paranoid: true,
    modelName: 'CProfil',
    freezeTableName: true,
    schema: "sc_devteam"
  })

  export default CProfil