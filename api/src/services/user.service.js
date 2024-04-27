import userModel from '../model/user.model.js';

const createUserService = async (userInfos) => userModel.create(userInfos);

const findAllUsersService = () => userModel.find();

export default { 
  createUserService,
  findAllUsersService,
};