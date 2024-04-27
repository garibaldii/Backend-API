import userModel from '../model/user.model.js';

const loginService = (email) => userModel.findOne({ email: email }).select('+password')

export {
    loginService
}