import Joi from "joi";

const postSchema = Joi.object({
	title: Joi.string().required().messages({
		"any.required": "Title required",
		"string.empty": "Title do not empty",
	}),
	description: Joi.string().required().messages({
		"any.required": "Description required",
		"string.empty": "Description do not empty",
	}),
	image: Joi.string().required().messages({
		"any.required": "Image required",
		"string.empty": "Image do not empty",
	}),
	author: Joi.string().required().messages({
		"any.required": "Author required",
		"string.empty": "Author do not empty",
	}),
	category: Joi.number().required().messages({
		"any.required": "Category required",
		"number.empty": "Category do not empty",
	}),
});

export { postSchema };
