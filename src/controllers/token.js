import { userModel } from '../models/userModel.js';
import cron from 'node-cron';

const getToken = async (req, res) => {
    const gID = req.body.gID;
    const user = await userModel.findOne({ gID });
    // console.log(user);
    if (!user) {
        res.send({ msg: "User doesn't exist." });
    } else {
        res.send({
            msg: 'User found, sending tokenStatus.',
            data: user.tokenStatus,
        });
    }
};

const useToken = async (req, res) => {
    const gID = req.body.gID;
    const user = await userModel.findOne({ gID });
    if (!user) {
        res.send({ msg: "User doesn't exist." });
    } else {
        if (user.tokenStatus) {
            res.send({ msg: 'User found, using token.', data: 'already used' });
        } else {
            user.tokenStatus = true;
            await user.save();
            res.send({ msg: 'User found, using token.', data: 'used' });
        }
    }
};

const resetAllToken = async () => {
    await userModel.updateMany(
        {},
        {
            $set: {
                tokenStatus: false,
            },
        }
    );
};

cron.schedule('*/2 * * * * *', () => {
    const date = new Date();
    console.log('running');
    console.log(
        `Time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}::${date.getMilliseconds()}`
    );
});

cron.schedule('1 21 * * *', () => {
    // const date = new Date();
    // console.log("consoling 1st log")
    // console.log(
    //     `Time: ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}::${date.getMilliseconds()}`
    // );
    try {
        async function reset() {
            await resetAllToken();
            console.log('Tokens Resetted');
        }
        reset();
    } catch (error) {
        console.log('error while resetting ', error);
    }
});

export { getToken, useToken };
