import roleModel from "../models/roleModel";

export default class roleService {
  static async inputData(bodyData: any) {
    return await new Promise(async (resolve, reject) => {
      let data = await roleModel.create({
        RoleName: bodyData.roleName,
      });
      resolve(data);
    });
  }

  static async getRole(id: any) {
    return await new Promise(async (resolve, reject) => {
      let data = await roleModel.findByPk(id);
      resolve(data);
    });
  }
}