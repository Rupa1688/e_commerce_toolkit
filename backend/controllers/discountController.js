const Order = require("../model/order")
const Refund = require("../model/refund")
const Promocode = require("../model/promocode")
const AssignPromocode = require("../model/assignPromocode")
const nodemailer = require("nodemailer")
module.exports.addPromocode = async (req, res) => {
  try {
    console.log("body", req.body)
    const promocodeAdded = await new Promocode(req.body).save()

    res.json({ promocodeAdded, message: "Promocode Added" })
  } catch (e) {
    console.log("e", e)
  }
}

module.exports.getAllPromocode = async (req, res) => {
  try {
    const promocodeData = await Promocode.find({})

    res.json({ promocodeData })
  } catch (e) {
    console.log("e", e)
  }
}

module.exports.assignPromocode = async (req, res) => {
  try {
    const promocodeData = await Promocode.findOne({
      _id: req.body.promocodeData,
    })
    console.log("bbb", promocodeData)
    req.body.promocode = promocodeData.promocode
    req.body.promocodeId = req.body.promocodeData
    console.log("bbb", req.body)
    const promocodeAssigned = await new AssignPromocode(req.body).save()
    console.log("assignPromocode", promocodeAssigned)
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "rupa3560@gmail.com",
        pass: "xsrlcrdkpowwjltn",
      },
    })
    const sendMail = await transporter.sendMail({
      from: "rupa3560@gmail.com",
      to: "rupa-kumari@csgroupchd.com",
      subject: "Apply discount to buy products from shopping",
      html: `apply for discount to buy products from shopping website using this follwing promocode <h3> ${promocodeAssigned.promocode} </h3>`,
    })
    res.json({ promocodeAssigned, message: "promocodeAssigned Added" })
  } catch (e) {
    console.log("e", e)
  }
}
module.exports.applyPromocode = async (req, res) => {
  try {
    const assignPromocode = await AssignPromocode.findOne({
      users: req.body.userId,
      promocode: req.body.data.promocode,
    })
    console.log("assignPromocode", assignPromocode)
    const promocodeData = await Promocode.findOne({
      _id: assignPromocode.promocodeId,
    })
    // const assignPromocodeUpdate = await AssignPromocode.findOneAndUpdate(
    //   {
    //     users: req.body.userId,
    //     promocode: req.body.data.promocode,
    //   },
    //   { status: false },
    //   { new: true }
    // )
    // console.log("assignPromocodeUpdate", assignPromocodeUpdate)
    res.json({
      discount: promocodeData?.discount,
      // assignPromocodeUpdate,
      message: "promocode apply successfully",
    })
    console.log("promocodeData", promocodeData)
  } catch (e) {
    console.log("e", e)
  }
}
