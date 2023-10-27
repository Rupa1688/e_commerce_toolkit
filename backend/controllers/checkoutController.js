// const { default: Stripe } = require("stripe")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const Category = require("../model/category")
const ProductCategory = require("../model/productCategory")
const Tranjection = require("../model/tranjection")
const Order = require("../model/order")
const Refund = require("../model/refund")
const Promocode = require("../model/promocode")

module.exports.createCheckoutSession = async (req, res) => {
  try {
    console.log("item", req.body)
    let cartData = req.body.cartData.map((item) => {
      return {
        _id: item._id,
        name: item.name,
        color: item.color,
        product_id: item.product_id,
        image: item.image,
        desc: item.desc,
        price: item.price,
        productSize: item.productSize,
        quantity: item.quantity,
      }
    })
    const customer = await stripe.customers.create({
      // email: req.body.user.email,
      // id: req.body.user._id,
      // description: 'User Account Created'
      metadata: {
        userId: req.body.user._id.toString(),
        cartData: JSON.stringify(cartData),
      },
    })
// lineitem=-2400
    let line_items = req.body.cartData.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            // images: item.image,
            description: item.desc,
            metadata: {
              id: item._id,
            },
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      }
    })
    console.log("line_items", line_items)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      // shipping_address_collection: {
      //   allowed_countries: ["US", "CA", "KE"],
      // },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "inr",
            },
            display_name: "Free shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 5,
              },
              maximum: {
                unit: "business_day",
                value: 7,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 1500,
              currency: "inr",
            },
            display_name: "Next day air",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },

      customer: customer.id,
      line_items,
      // discounts: 10,
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "IN"],
      },
      custom_text: {
        shipping_address: {
          message:
            "Please note that we can't guarantee 2-day delivery for PO boxes at this time.",
        },
        submit: {
          message: "We'll email you instructions on how to get started.",
        },
      },

      success_url: "http://localhost:3000/product/success",
      cancel_url: "http://localhost:3000/product/cancel",
    })

    res.json({ id: session.id })
  } catch (err) {
    console.log(err)
  }
}

const fulfillOrder = async (session) => {
  // TODO: fill me in
  // console.log("Fulfilling order", session)
  // const tranjection = await Tranjection.findOneAndUpdate(
  //   { tranjection_id: session.id },
  //   { $set: { payment_status: session.payment_status } },
  //   { new: true }
  // )
  // console.log("tranjectionFullfill", tranjection)
  // return tranjection
  // res.send("payment successfully")
}

const createOrder = async (customer, data) => {
  try {
    console.log("customer", customer)
    console.log("data", data)
    const cart = JSON.parse(customer.metadata.cartData)
    const amount_subtotal = data.amount_subtotal / 100
    const amount_total = data.amount_total / 100
    // console.log("ss", session)
    const orderData = {
      userId: customer.metadata.userId,
      customerId: data.customer,
      tranjection_id: data.id,
      paymentIntent: data.payment_intent,
      products: cart,
      amountSubTotal: amount_subtotal,
      amountTotal: amount_total,
      shipping: data.customer_details,
      currency: data.currency,
      payment_method: data.payment_method_types,
      payment_status: data.payment_status,
    }

    // const order = await new Order(orderData).save()
    // return order
  } catch (e) {
    console.log("ee", e)
    return e
  }
}

const emailCustomerAboutFailedPayment = (session) => {
  // TODO: fill me in
  console.log("Emailing customer", session)
}

module.exports.webhook = async (request, response) => {
  try {
    // console.log("rawBody", request.rawBody)
    const sig = request.headers["stripe-signature"]
    const endpointSecret = "whsec_x9FNCgMRl8KIOmE9p291Ukq7dk16sxnX"
    // const endpointSecret = "whsec_d8TZ26EQAdGugHAi7rVg0o30dhtWLUGo"
    let event

    try {
      event = stripe.webhooks.constructEvent(
        request.rawBody,
        sig,
        endpointSecret
      )
    } catch (err) {
      console.log("err", err)
      return response.status(400).send(`Webhook Error: ${err.message}`)
    }
    console.log("evvv", event)

    // Handle the checkout.session.completed event

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object
        console.log("checkout.session.completed")
        stripe.customers
          .retrieve(event.data.object.customer)
          .then(async (customer) => {
            const order = await createOrder(customer, event.data.object)
            console.log("order11", order)
            // if (order) {
            //   response
            //     .status(200)
            //     .json({ message: "order successfully", order })
            // } else {
            //   response.status(401).json({ message: "order cancel", order })
            // }
          })
          .catch((err) => {
            console.log("err", err.message)
          })

        // Check if the order is paid (for example, from a card payment)
        //
        // A delayed notification payment will have an `unpaid` status, as
        // you're still waiting for funds to be transferred from the customer's
        // account.
        if (session.payment_status === "paid") {
          //   const fullFillData = await fulfillOrder(session)
          //   console.log("fullFillData", fullFillData)
          //   response
          //     .status(200)
          //     .json({ message: "payment successfully", fullFillData })
        }
        break
      }
      case "checkout.session.async_payment_succeeded": {
        const session = event.data.object
        console.log("checkout.z.async_payment_succeeded")
        // Fulfill the purchase...
        fulfillOrder(session)

        break
      }

      case "checkout.session.async_payment_failed": {
        const session = event.data.object
        console.log("checkout.z.failed")
        // Send an email to the customer asking them to retry their order
        emailCustomerAboutFailedPayment(session)

        break
      }
      default: {
        console.log(`Unhandled event type ${event.type}.`)
      }
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports.refund = async (req, res) => {
  try {
    id = req.body.id
    const orders = await Order.findOne({ tranjection_id: id })
    console.log("refff", orders)
    const refund = await stripe.refunds.create({
      payment_intent: orders.paymentIntent,
      amount: orders.amountTotal * 100,
    })
    console.log("refund", refund)
    const refundData = await new Refund(refund).save()
    const paymentStatus = await Order.findOneAndUpdate(
      { tranjection_id: id },
      { $set: { payment_status: refund.object } },
      { new: true }
    )
    console.log("paymentStatus", paymentStatus)
    res.status(200).json({ refundData, message: "payment refunded" })
  } catch (e) {
    console.log(e)
  }
}

module.exports.transactionDetail = async (req, res) => {
  try {
    id = req.query.transactionId
    const trajectionDetail = await Order.findOne({ tranjection_id: id })
    res.status(200).json({ trajectionDetail })
  } catch (e) {
    console.log(e)
  }
}
