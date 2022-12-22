import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../dbConnection/dbConn";
import attendence from "./attendenceModel";
import bank from "./bankDetailsModel";
import bond from "./bondModel";
import emp_Leave from "./empLeaveModel";
import personalDetails from "./personalDetailsModel";
import salary from "./salaryModel";

class employee extends Model {
  Id: any;
  RoleId: any;
  FullName: any;
  Email: any;
  DOB: any;
  Address: any;
  Password: any;
  Contact: any;
  AlternativeContact: any;
  RelativePerson: any;
  RelativeContact: any;
  Designation: any;
  ProfileImage: any;
  Documents: any;
  Reporter: any;
  static Id: number;
  dataValues: any;
  Employee_Id: any;
}

employee.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    RoleId: {
      type: DataTypes.INTEGER,
      references: {
        model: "roles",
        key: "Id",
      },
      allowNull: false,
    },
    Employee_Id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    RoleName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    DOB: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Address: {
      type: DataTypes.STRING,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Contact: {
      type: DataTypes.STRING,
      allowNull: false,
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
    Designation: {
      type: DataTypes.STRING,
    },
    IsConfirm: {
      type: DataTypes.BOOLEAN,
      defaultValue: "false",
    },
    Confirmation_Date: {
      type: DataTypes.STRING,
    },
    Joining_Date: {
      type: DataTypes.STRING,
    },
    Under_Probation: {
      type: DataTypes.BOOLEAN,
      defaultValue: "true",
    },
    Probation_Period: {
      type: DataTypes.INTEGER,
      defaultValue: 6,
    },
    Reporter: {
      type: DataTypes.ENUM(
        "Jevin Sakhiya",
        "Shreyas Gajipara",
        "Sagar Anadkat"
      ),
      allowNull: false,
    },
    ProfileImage: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: "employee",
  }
);

employee.hasMany(attendence, {foreignKey: "Reference_Id"});
employee.hasMany(bank, {foreignKey: "Reference_Id"});
employee.hasMany(bond, {foreignKey: "Reference_Id"});
employee.hasMany(emp_Leave, {foreignKey: "Reference_Id"});
employee.hasMany(personalDetails, {foreignKey: "Reference_Id"});
employee.hasMany(salary, {foreignKey: "Reference_Id"});

// employee.drop()

export default employee;
