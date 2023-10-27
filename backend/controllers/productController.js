const Category = require("../model/category")
const ProductCategory = require("../model/productCategory")
module.exports.addCategory = async (req, res) => {
  try {
    console.log("rrr", req.body, req.file)
    const data = {
      name: req.body.name,
      image: req.file.originalname,
      parent_id: req.body.parent_id,
    }
    const category = await new Category(data).save()
    console.log("category", category)
    res.status(200).json({ category, message: "data save successfully" })
  } catch (err) {
    console.log(err)
  }
}

module.exports.getCategory = async (req, res) => {
  try {
    const id = req.params.id
    const category = await Category.findById(id)
    console.log("category", category)
    res.status(200).json({ category })
  } catch (err) {
    console.log(err)
  }
}

module.exports.getParentCategory = async (req, res) => {
  try {
    const category = await Category.find({})
    console.log("category", category)
    res.status(200).json({ category })
  } catch (err) {
    console.log(err)
  }
}

module.exports.addProductCategory = async (req, res) => {
  try {
    console.log("rrr11", req.body, req.file)
    const category_id = req.body.category_id
    const category = await Category.find({ _id: category_id })
    console.log("category", category)
    const data = {
      name: req.body.name,
      image: req.file.originalname,
      category_id: category_id,
      category_parent_id: category[0].parent_id,
      desc: req.body.description,
      price: req.body.price,
    }
    console.log("dddd", data)
    const productCategory = await new ProductCategory(data).save()
    console.log("productCategory", productCategory)
    res.status(200).json({ productCategory, message: "data save successfully" })
  } catch (err) {
    console.log(err)
  }
}
module.exports.getAllProductCategory = async (req, res) => {
  try {
    console.log("cateid", req.query?.categoryId)
    category_id = req.query.categoryId
    const productCategory = await ProductCategory.find({
      $or: [{ category_id: category_id }, { category_parent_id: category_id }],
    })
    console.log("ProductCategory", productCategory)
    res.status(200).json({ productCategory })
  } catch (err) {
    console.log(err)
  }
}
module.exports.getProductCategory = async (req, res) => {
  try {
    const productCategory_id = req.params.id
    const productCategory = await ProductCategory.find({
      _id: productCategory_id,
    })
    console.log("ProductCategory", productCategory)
    res.status(200).json({ productCategory })
  } catch (err) {
    console.log(err)
  }
}
module.exports.getAllProduct = async (req, res) => {
  try {
    const productCategory_id = req.params.id
    const products = await ProductCategory.find({})
    console.log("products", products)
    res.status(200).json({ products })
  } catch (err) {
    console.log(err)
  }
}
