import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../dbConnection/dbConn";

class otp extends Model {
  Id: any;
  EmpId: any;
  Email: any;
  Code: any;
  ExpireIn: any;
  static Id: number;
}

otp.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    EmpId: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    OTP: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ExpireIn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    createdAt: "Created Time",
    updatedAt: "Updated Time",
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "otp",
  }
);

// otp.drop();

export default otp;
