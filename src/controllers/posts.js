import PostModel from "../models/posts.js";
import { postSchema } from "../schemas/posts.js";

const getPosts = async (req, res) => {
	try {
		const data = await PostModel.find();
		res.status(200).json({
			message: "OK",
			data,
		});
	} catch (error) {
		console.log(err);
	}
};

const getPostById = async (req, res) => {
	try {
		const data = await PostModel.findOne({ _id: req.params.id });
		res.status(200).json({
			message: "OK",
			data,
		});
	} catch (error) {
		console.log(err);
	}
};

const createPost = async (req, res) => {
	try {
		const { error } = postSchema.validate(req.body, { abortEarly: false });
		if (error) {
			const errs = error.details.map((e) => e.message);
			return res.status(401).json({
				message: errs,
			});
		}
		const isExist = await PostModel.findOne({ title: req.body.title });
		if (isExist) {
			return res.status(401).json({
				message: `This post ${req.body.title} already exists`,
			});
		}
		const newPost = await PostModel(req.body).save();
		res.status(200).json({
			message: "Created",
			data: newPost,
		});
	} catch (error) {
		console.error(error);
	}
};

const updatePost = async (req, res) => {
	try {
		const { error } = postSchema.validate(req.body, { abortEarly: false });
		if (error) {
			const errs = error.details.map((e) => e.message);
			return res.status(401).json({
				message: errs,
			});
		}
		const post = await PostModel.findOne({ _id: req.params.id });
		const isExist = await PostModel.findOne({ title: req.body.title });
		if (isExist && post.title !== req.body.title) {
			return res.status(401).json({
				message: `This post ${req.body.title} already exists`,
			});
		}
		const newPost = await PostModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
		res.status(200).json({
			message: "Updated",
			data: newPost,
		});
		console.log(err);
	} catch (error) {}
};

const deletePost = async (req, res) => {
	try {
		const deleteData = await PostModel.findByIdAndDelete({ _id: req.params.id });
		res.status(200).json({
			message: "Deleted",
			data: deleteData,
		});
	} catch (error) {
		console.log(error);
	}
};

export { getPosts, getPostById, updatePost, deletePost, createPost };
