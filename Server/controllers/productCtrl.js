const Products = require('../models/productModel'); // path to product model

//API features(filtering, sorting, paginating)

class APIfeatures {
     constructor(query, queryString) {
          this.query = query;
          this.queryString = queryString;
     }
     filtering() {
          const queryObj = { ...this.queryString } //queryString = req.query
          console.log({ before: queryObj }) // before delete page
          const excludedFields = ['page', 'sort', 'limit']
          excludedFields.forEach(el => delete (queryObj[el]))

          let queryStr = JSON.stringify(queryObj)
          console.log({ queryStr,queryObj }) // before $gte

          // gte = greater than or equal
          queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match)
          console.log({ queryStr }) // after $gte
          this.query.find(JSON.parse(queryStr))
          return this;
     }
     sorting() {
          if (this.queryString.sort) {
               const sortBy = this.queryString.sort.split(',').join(' ')
               console.log(sortBy)
               // sort('price ratingsAverage')
               this.query = this.query.sort(sortBy)
          } else {
               this.query = this.query.sort('-createdAt')
          }

     }
     paginating() {
          //pagination is required for large data in database
          const page = this.queryString.page * 1 || 1
          const limit = this.queryString.limit * 1 || 9
          const skip = (page - 1) * limit;
          this.query = this.query.skip(skip).limit(limit)
          return this;

     }
}

const productCtrl = {
    getProducts: async (req, res) => {
       try {
            const features = new APIfeatures(products.find(), req.query).filtering().sorting().paginating();
            const products = await features.query
       } catch (error) {
            return res.status(500).json({ msg: error.message });
       }
    },
    createProduct: async (req, res) => {
       try{
            const {product_id,title,price,description,content,images,category} = req.body

            if(!images) return res.status(400).json({msg:"No Image Upload"})

            const product = await Products.findOne({product_id})

            if(product)
            return res.status(400).json({msg:"This product already exists"})

            const newProduct = new Products({
                product_id,title : title.toLowerCase(),price,description,content,images,category
            })

            await newProduct.save();

            res.json({msg:"Create a product"})
        }
        catch(err){
            return res.status(500).json({msg:err.message})
        }
    },
    updateProduct: async (req, res) => {
        try {
            const { id } = req.params;
            const { title, price, description, content, images, category } = req.body;

            // Check if images are uploaded
            if (!images || images.length === 0) {
                return res.status(400).json({ msg: "No image uploaded" });
            }

            // Prepare the updated data
            const updatedData = {
                title: title.toLowerCase(),
                price,
                description,
                content,
                images,
                category
            };

            // Update the product and return the updated document
            const updatedProduct = await Products.findByIdAndUpdate(
                id,
                updatedData,
                { new: true } // Return the updated document
            );

            if (!updatedProduct) {
                return res.status(404).json({ msg: "Product not found" });
            }

            return res.status(200).json({
                msg: "Product updated successfully",
                data: updatedProduct
            });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
    deleteProduct: async (req, res) => {
       try {
            const { id } = req.params;
            await Products.findByIdAndDelete(id);
            return res.status(200).json({ msg: "Product deleted successfully" });
       } catch (error) {
            return res.status(500).json({ msg: error.message });
       }
    }
};

module.exports = productCtrl;