import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../dbConnection/dbConn";

class leave_For_Quarter extends Model {
  Id: any;
  FirstQuarter: any;
  SecondQuarter: any;
  ThirdQuarter: any;
  FourthQuarter: any;
  TotalLeave: any;
  LeaveType: any;
  static Id: number;
}

leave_For_Quarter.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    FirstQuarter: {
      type: DataTypes.INTEGER,
    },
    SecondQuarter: {
      type: DataTypes.INTEGER,
    },
    ThirdQuarter: {
      type: DataTypes.INTEGER,
    },
    FourthQuarter: {
      type: DataTypes.INTEGER,
    },
  },
  {
    createdAt: "Created Time",
    updatedAt: "Updated Time",
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "leave_For_Quarter",
  }
);

// leave_For_Quarter.drop();

export default leave_For_Quarter;
