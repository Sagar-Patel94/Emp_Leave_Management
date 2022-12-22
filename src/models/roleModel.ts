import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../dbConnection/dbConn";
import employee from "../models/employeeModel";

class role extends Model {
  Id: any;
  RoleName: any;
  static Id: number;
}

role.init(
  {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    RoleName: {
      type: DataTypes.STRING,
    },
  },
  {
    createdAt: "Created Time",
    updatedAt: "Updated Time",
    timestamps: true,
    sequelize: sequelizeConnection,
    modelName: "role",
  }
);

role.hasMany(employee, {foreignKey: "RoleId"});
employee.belongsTo(role, {foreignKey: "RoleId"}); 

// role.sync();

export default role;
