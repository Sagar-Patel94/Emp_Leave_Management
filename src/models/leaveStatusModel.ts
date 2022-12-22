import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../dbConnection/dbConn";

class leave_Status extends Model {
  Id: any;
  Name: any;
  static Id: number;
}

leave_Status.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    StatusName: {
      type: DataTypes.STRING,
    },
  },
  {
    createdAt: "Created Time",
    updatedAt: "Updated Time",
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "leave_Status",
  }
);

// leave_Status.drop();

export default leave_Status;
