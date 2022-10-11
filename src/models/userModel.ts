
import sequelize from '../bd/cnx';
import {Model, Optional, DataTypes} from 'sequelize';

export interface UserI {
    id: number | null,
    firstname: string,
    lastname: string,
    email: string,
    password: string,
    login: string,
    status: boolean,
    createdAt?: Date,
    updatedAt?: Date,
    deletedAt?: Date,
}

export interface TagInput extends Optional<UserI, 'id'> {}
export interface TagOutput extends Required<UserI> {}

 class User extends Model <UserI, TagInput> implements UserI{
    public id!: number;
    public firstname!: string;
    public lastname!: string;
    public email!: string;
    public password!: string;
    public login!: string;
    public status!: boolean;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    public readonly deletedAt!: Date;
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    login: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
}, 
    {
        timestamps: true,
        sequelize: sequelize,
        paranoid: true,
        modelName: 'User',
        freezeTableName: true,
        schema: "sc_devteam"
      }
  )
  export default User;