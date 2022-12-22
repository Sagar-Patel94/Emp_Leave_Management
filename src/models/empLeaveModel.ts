import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../dbConnection/dbConn";

class emp_Leave extends Model {
  Id: any;
  EmpId: any;
  Name: any;
  LeaveType: any;
  DateFrom: any;
  DateTo: any;
  Leave_Days: any;
  Leave_Balance: any;
  Quartily_Leave_Balance: any;
  Leave_Without_Pay: any;
  Reason: any;
  Status: any;
  static Id: number;
}

emp_Leave.init(
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
    Name: {
      type: DataTypes.STRING,
    },
    LeaveType: {
      type: DataTypes.ENUM("Half", "Full"),
      allowNull: false,
    },
    DateFrom: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    DateTo: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    Leave_Days: {
      type: DataTypes.FLOAT,
    },
    Quartily_Leave_Balance: {
      type: DataTypes.FLOAT,
    },
    Leave_Without_Pay: {
      type: DataTypes.FLOAT,
    },
    Reason: {
      type: DataTypes.STRING,
      allowNull: false,
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
    modelName: "emp_Leave",
  }
);

// emp_Leave.drop();

export default emp_Leave;
