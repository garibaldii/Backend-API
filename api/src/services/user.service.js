import userModel from '../model/user.model.js';

const createUserService = (userInfos) => userModel.create(userInfos);

const findAllUsersService = () => userModel.find();

export default { 
  createUserService,
  findAllUsersService,
};