import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../dbConnection/dbConn";

class salary extends Model {
  Id: any;
  EmpId: any;
  Basic_Salary: any;
  PF: any;
  ESI: any;
  PT: any;
  Other_Deduction: any;
  static Id: number;
}

salary.init(
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
    Basic_Salary: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    HRA: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Bonus: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Special_Allowance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Performance_Allowance: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    PF: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    ESI: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    PT: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Other_Deduction: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    Monthly: {
      type: DataTypes.FLOAT,
    },
  },
  {
    createdAt: "Created Time",
    updatedAt: "Updated Time",
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "salary",
  }
);

// salary.drop();

export default salary;
