const Attribute = require("../model/attribute")
module.exports.addAttribute = async (req, res) => {
  try {
    console.log("ddddd", req.body)
    let arr = []

    let myPromise = new Promise(function (myResolve, myReject) {
      let result
      let i = 0

      let length = req.body.size.length
      console.log("length", length)
      return (result = req.body.size.forEach(async (size) => {
        const data = {
          product_id: req.body.product_id,
          size: size,
        }

        const attribute = await Attribute.create(data)
        console.log("attribute", attribute)
        arr.push(attribute)
        i++

        if (i == length) {
          myResolve(arr)
        }
      }))
    })
    myPromise.then(function (value) {
      res
        .status(200)
        .json({ arr, message: "data save successfully", status: 200 })
    })
  } catch (err) {
    console.log(err)
  }
}
module.exports.getAttribute = async (req, res) => {
  try {
    const id = req.params.product_id
    console.log("iddddd", id)
    const attribute = await Attribute.find({ product_id: id })
    res.status(200).json({ attribute, status: 200 })
  } catch (err) {
    console.log(err)
  }
}
