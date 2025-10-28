const router = require('express').Router();
const categoryCtrl = require('../Controllers/categoryCtrl');
const auth = require('../middleware/auth'); 
const authAdmin = require('../middleware/authAdmin'); 

// GET all categories and POST new category
router.route('/category')
    .get(categoryCtrl.getCategories)
    .post(auth, authAdmin, categoryCtrl.createCategory);

// PUT and DELETE by category ID
router.route('/category/:id')
    .put(auth, authAdmin, categoryCtrl.updateCategory) // optional
    .delete(auth, authAdmin, categoryCtrl.deleteCategory);

module.exports = router;
