import { userModel } from '../models/userModel.js';

export const authController = async (req, res) => {
    const fullName = req.body.fullName;
    // console.log(req.body)
    const gID = req.body.gID;
    const user = await userModel.findOne({gID})
    
    if(!user){
        const newUser = new userModel({fullName, gID})
        const result = await newUser.save();
        res.send({ msg: 'Registered Now', data: result });
    }
    else {
        res.send({msg: "Already Registered", data: user});
    }
};
