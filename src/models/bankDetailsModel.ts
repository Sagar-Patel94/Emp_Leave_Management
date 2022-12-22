import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../dbConnection/dbConn";

class bank extends Model {
  Id: any;
  EmpId: any;
  BankName: any;
  IFSC_Code: any;
  Account_number: any;
  Branch: any;
  static Id: number;
}

bank.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Reference_Id: {
      type: DataTypes.INTEGER,
      references: {
        model: "employees",
        key: "Id",
      },
      allowNull: false,
    },
    EmpId: {
      type: DataTypes.STRING,
    },
    BankName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IFSC_Code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Account_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Branch: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: "Created Time",
    updatedAt: "Updated Time",
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "bank",
  }
);

// bank.drop();

export default bank;
