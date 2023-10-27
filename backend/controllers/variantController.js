const VariantProduct = require("../model/varient")
module.exports.addVariant = async (req, res) => {
  try {
    console.log("rrr", req.body, req.files)
    let arr = []
    req.files.variant_image.forEach((element) => {
      arr.push(element.originalname)
    })
    console.log("arr", arr)
    const data = {
      name: req.body.name,
      color: req.body.color,
      product_id: req.body.product_id,
      image: req.files.image[0].originalname,
      variant_image: arr,
      desc: req.body.description,
      price: req.body.price,
    }
    console.log("data", data)
    const variantProduct = await new VariantProduct(data).save()
    console.log("variantProduct", variantProduct)
    res.status(200).json({ variantProduct, message: "data save successfully" })
  } catch (err) {
    console.log(err)
  }
}

module.exports.getVariant = async (req, res) => {
  const product_id = req.params.id
  console.log("product_id", product_id)
  const variantProduct = await VariantProduct.find({ product_id: product_id })
  console.log("variantProduct", variantProduct)
  res.status(200).json({ variantProduct })
}
module.exports.VariantOfProduct = async (req, res) => {
  const variant_id = req.query.id
  console.log("11", variant_id)
  const variantProduct = await VariantProduct.find({ _id: variant_id })
  console.log("variantProduct", variantProduct)
  res.status(200).json({ variantProduct })
}
