import Joi from "joi";

const signinSchema = Joi.object({
	email: Joi.string().email().required().messages({
		"any.required": "Email required",
		"string.email": "Email invalid",
		"string.empty": "Email do not empty",
	}),
	password: Joi.string().required().messages({
		"any.required": "Password required",
		"string.empty": "Password do not empty",
	}),
});

const signupSchema = Joi.object({
	name: Joi.string().required().messages({
		"any.required": "Name required",
		"string.empty": "Name do not empty",
	}),
	email: Joi.string().email().required().messages({
		"any.required": "Email required",
		"string.empty": "Email do not empty",
		"string.email": "Email invalid",
	}),
	password: Joi.string().required().messages({
		"any.required": "Password required",
		"string.empty": "Password do not empty",
	}),
	confirmpassword: Joi.string().required().valid(Joi.ref("password")).messages({
		"any.required": "Password required",
		"any.only": "Password not match",
	}),
});

export { signinSchema, signupSchema };
