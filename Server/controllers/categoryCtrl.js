const categoryModel  = require("../models/categoryModels"); //  path to category model

const categoryCtrl = {
   getCategories: async (req, res) => {
        try {
            const categories = await categoryModel.find();
            res.json(categories);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
   },
   // create
   createCategory: async (req, res) => {
        try {
            const { name } = req.body;

            // Check if category already exists
            const category = await categoryModel.findOne({ name });
            if(category) return res.status(400).json({ msg: "This category already exists." });

            // Create new category
            const newCategory = new categoryModel({ name });
            await newCategory.save();
            res.status(201).json(newCategory);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
   },
   //delete
   deleteCategory: async (req, res) => {
        try{
            // Check if category is associated with any products
            const category = await categoryModel.findByIdAndDelete(req.params.id);
            if(!category) return res.status(404).json({msg: "Category not found."});
            res.json({msg: "Category deleted successfully."});
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
   },
    // update
    updateCategory: async (req, res) => {
        try {
            const { name } = req.body;
            const category = await categoryModel.findByIdAndUpdate(
                req.params.id,
                { name },
                { new: true } // Return the updated document
            );
            if (!category) return res.status(404).json({ msg: "Category not found." });
            res.json(category);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }
}

module.exports = categoryCtrl;
