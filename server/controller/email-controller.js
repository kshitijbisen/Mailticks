import { response } from "express";
import Email from "../model/email.js";
import Category from "../model/category.js";

export const saveSentEmails = async (request, response) => {
    try {
        const email = await new Email(request.body);
        email.save();

        response.status(200).json('email saved successfully');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const getEmails = async (request, response) => {
    try {
        let emails;

        if (request.params.type === 'starred') {
            emails = await Email.find({ starred: true, bin: false });
        } else if (request.params.type === 'bin') {
            emails = await Email.find({ bin: true })
        } else if (request.params.type === 'allmail') {
            emails = await Email.find({});
        } else if (request.params.type === 'inbox') {
            emails = await Email.find({ type : 'inbox' });
        } else {
            emails = await Email.find({ type: request.params.type });
        }

        response.status(200).json(emails);
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const moveEmailsToBin = async (request, response) => {
    try {
        await Email.updateMany({ _id: { $in: request.body }}, { $set: { bin: true, starred: false, type: '' }});
    } catch (error) {
        response.status(500).json(error.message);   
    }
}
export const toggleStarredEmails=async (request, response) => {
    try {
        await Email.updateOne({ _id:request.body.id }, { $set: { starred: request.body.value }});
        return response.status(200).json("Email is starred")
    } catch (error) {
        response.status(500).json(error.message);   
    }
}
export const createCategory = async (request, response) => {
    try {
        const category = await new Category(request.body);
        category.save();

        response.status(200).json('Category saved');
    } catch (error) {
        response.status(500).json(error.message);
    }
}

export const getCategory = async (request, response) => {
    try {
        let category;
        category = await Category.find({});

        response.status(200).json(category);
    } catch (error) {
        response.status(500).json(error.message);
    }
}
