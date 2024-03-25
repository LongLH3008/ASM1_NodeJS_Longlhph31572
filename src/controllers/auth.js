import { signinSchema, signupSchema } from "../schemas/auth";
import UserModel from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const signin = async (req, res) => {
	try {
		const { email, password } = req.body;
		const { error } = signinSchema.validate(req.body, { abortEarly: false });
		if (error) {
			const err = error.details.map((e) => e.message);
			return res.status(400).json({
				message: err,
			});
		}
		const isExist = await UserModel.findOne({ email: email });
		if (!isExist) {
			return res.status(400).json({
				message: "User does not exist",
			});
		}
		const checkPassword = await bcrypt.compare(password, isExist.password);
		if (!checkPassword) {
			return res.status(400).json({
				message: "Wrong password",
			});
		}
		const token = jwt.sign({ userId: isExist._id }, "123456");
		res.status(200).json({
			message: "Welcome",
			data: isExist,
			token,
		});
	} catch (error) {
		console.log(error);
	}
};

const signup = async (req, res) => {
	try {
		const { name, email, password } = req.body;
		const { error } = signupSchema.validate(req.body, { abortEarly: false });
		if (error) {
			const err = error.details.map((e) => e.message);
			return res.status(401).json({
				message: err,
			});
		}
		const isExist = await UserModel.findOne({ email: email });
		if (isExist) {
			return res.status(401).json({
				message: "User already exists",
			});
		}
		const hashPassword = await bcrypt.hash(password, 10);
		const newUser = await UserModel.create({
			name,
			email,
			password: hashPassword,
		});
		res.status(200).json({
			message: "Signup Success",
			data: newUser,
		});
	} catch (error) {
		console.log(error);
	}
};

export { signin, signup };
