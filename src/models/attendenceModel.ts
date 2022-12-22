import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../dbConnection/dbConn";

class attendence extends Model {
  Id: any;
  EmpId: any;
  Date: any;
  InTime: any;
  OutTime: any;
  BreakInTime: any;
  BreakOutTime: any;
  TotalTime: any;
  Average: any;
  Status: any;
  static Id: number;
}

attendence.init(
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
    Date: {
      type: DataTypes.STRING,
    },
    InTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    OutTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    BreakInTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    BreakOutTime: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    TotalTime: {
      type: DataTypes.STRING,
    },
    AverageTime: {
      type: DataTypes.STRING,
    },
    Status: {
      type: DataTypes.ENUM("Pending", "Approved", "Rejected"),
      defaultValue: "Pending",
    },
  },
  {
    createdAt: "Created Time",
    updatedAt: "Updated Time",
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "attendence",
  }
);

// attendence.drop();

export default attendence;
