import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../dbConnection/dbConn";

class bond extends Model {
  Id: any;
  EmpId: any;
  StartDate: any;
  EndDate: any;
  Duration: any;
  IsBond: any;
  static Id: number;
}

bond.init(
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
    StartDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    EndDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Duration: {
      type: DataTypes.STRING,
    },
    IsBond: {
      type: DataTypes.BOOLEAN,
      defaultValue: "true"
    },
  },
  {
    createdAt: "Created Time",
    updatedAt: "Updated Time",
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "bond",
  }
);

// bond.drop();

export default bond;
