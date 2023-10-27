const User = require("../model/user")

const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")
module.exports.signUp = async (req, res) => {
  try {
    const { name, email, password, address, phone_number, role } = req.body
    if (!(name && email && password && address && phone_number)) {
      res.status(402).send("All input is required")
    } else {
      const oldUser = await User.findOne({ email })
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login")
      }
      encryptedPassword = await bcrypt.hash(password, 10)
      const user = await User.create({
        name,
        email: email.toLowerCase(),
        password: encryptedPassword,
        address,
        phone_number,
        role,
      })
      res.status(200).json({ user, message: "data save successfully" })
    }
  } catch (err) {
    console.log(err)
  }
}
module.exports.signIn = async (req, res) => {
  console.log("rrr", req.body)
  try {
    const { email, password } = req.body
    if (!(email && password)) {
      res.status(400).send("All input is required")
    }
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      )
      console.log("token", token)
      user.token = token
      res.status(200).json({ user, token })
    } else {
      res.status(400).send("Invalid Credentials")
    }
  } catch (err) {
    console.log(err)
  }
}
module.exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find({})
    console.log("users", users)
    res.status(200).json({ users })
  } catch (e) {}
}
