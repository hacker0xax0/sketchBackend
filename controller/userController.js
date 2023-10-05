import { Users } from "../model/users.js";
import { SketcheOrders } from "../model/orders.js";
import bcrypt from 'bcryptjs';


// users
const getUser = async (req, res) => {
    try {
        const user = req.body;
        const validate = await Users.findOne({ email: user.email });
        if (validate) {
            res.status(400).json({
                success: false,
                message: 'Email Already Exist'
            });
        }
        else {
            try {
                const newUser = new Users(user);

                await newUser.generateAuthToken();

                await newUser.save();
                const data = await Users.findOne({ email: user.email })
                res.status(200).json({
                    success: true,
                    message: "Data added successfully",
                    data: data
                });
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: error.message,
                });
            }
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
const getLogin = async (req, res) => {
    try {
        const loginFormData = req.body;
        const data = await Users.findOne({ email: loginFormData.email });

        const isMatch = await bcrypt.compare(loginFormData.password, data.password);


        if (data.length === 0 || isMatch !== true) {
            throw new Error("Invalid secret passed");
        }
        else {
            res.status(200).json({
                success: true,
                message: "Data fetched successfully",
                data: data
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const editProfile = async (req, res) => {
    try {
        const payload = req.body;
        const email = req.params.email;
        try {
            const updatedProfile = await Users.findOneAndUpdate({ email }, {
                $set: payload
            }, { new: true });

            res.status(200).json({
                success: true,
                message: "Data updated successfully",
                data: updatedProfile
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }


    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const validation = async (req, res) => {
    try {
        const email = req.body.email;
        console.log(email);
        const token = req.body.token;
        console.log(token);
        try {
            const data = await Users.findOne({ $and: [{ email: email }, { "tokens[0].token": token }] });
            console.log(data);
            res.status(200).json({
                success: true,
                message: "Data fetched successfully",
                data: data
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// userprofile
async function userProfile(req, res) {
    try {
        const params = req.params;
        const data = await Users.find({ email: params.email });
        res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


// orders

async function postOrders(req, res) {
    try {
        const payload = req.body.orders;
        console.log(payload);
        for (let i = 0; i < payload.length; i++) {
            const element = payload[i];
            const newOrder = new SketcheOrders(element);
            await newOrder.save();
            res.status(200).json({
                success: true,
                message: "Data added successfully"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

// getAllOrders

async function getAllOrders(req, res) {
    try {
        const data = await SketcheOrders.find();
        res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// getOrderByEmail

async function getOrderByMail(req, res) {
    try {
        const email = req.body;
        console.log(email);
        const usersOrder = await SketcheOrders.find({ email: email.email });
        console.log(usersOrder);
        res.status(200).json({
            success: true,
            message: "Data fetched successfully",
            data: usersOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}


export { getUser, getLogin, editProfile, validation, postOrders, getAllOrders, getOrderByMail, userProfile };