import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../dbConnection/dbConn";

class personalDetails extends Model {
  Id: any;
  EmpId: any;
  FullName: any;
  Email: any;
  DOB: any;
  Address: any;
  Contact: any;
  AlternativeContact: any;
  RelativePerson: any;
  RelativeContact: any;
  ProfileImage: any;
  Documents: any;
  static Id: number;
}

personalDetails.init(
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
    },
    EmpId: {
      type: DataTypes.STRING,
    },
    FullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      unique: true,
    },
    Address: {
      type: DataTypes.STRING,
    },
    DOB: {
      type: DataTypes.DATEONLY,
    },
    Contact: {
      type: DataTypes.STRING,
    },
    AlternativeContact: {
      type: DataTypes.STRING,
    },
    RelativePerson: {
      type: DataTypes.STRING,
    },
    RelativeContact: {
      type: DataTypes.STRING,
    },
    ProfileImage: {
      type: DataTypes.STRING,
    },
    Documents: {
      type: DataTypes.STRING,
    },
  },
  {
    paranoid: true,
    deletedAt: "SoftDelete",
    createdAt: "Created Time",
    updatedAt: "Updated Time",
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "personalDetail",
  }
);

// personalDetails.drop();

export default personalDetails;
