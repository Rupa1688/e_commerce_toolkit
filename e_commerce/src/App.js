import { Route, Routes, useNavigate } from "react-router-dom"
import AddUser from "./components/addUser/addUser"
import Login from "./components/login/login"
import NoPage from "./components/noPage/noPage"
// import Product from "./components/product/product"
// import UserProduct from "./components/product/userProduct"
import Layout from "./layout/layout"
import "./App.css"
import AddCategory from "./components/product/category/addCategory"
import GetAllCategory from "./components/product/category/getAllCategory"
import { Subcategory } from "./components/product/category/subCategory/subcategory"

import { GetAllProduct } from "./components/product/product/getAllProduct/getAllProduct"
import { AddProduct } from "./components/product/product/addProduct/addProduct"
import { GetProduct } from "./components/product/product/getProduct/getProduct"
import { AddVariant } from "./components/product/variant/addVariant/addVariant"
import { GetVariant } from "./components/product/variant/getVariant/getVariant"
import { Attribute } from "./components/product/attribute/attribute"
import { Cart } from "./components/product/cart/cart"
import { useEffect, useState } from "react"
import Success from "./components/success/success"
import Cancel from "./components/cancel/cancel"
import AddPromoCode from "./components/product/promocode/addPromocode/addPromocode"
import { GetPromoCode } from "./components/product/promocode/getPromocode/getPromocode"

function App() {
  const [cartData, setcartData] = useState([])
  const userData =
    localStorage?.getItem("token") &&
    localStorage?.getItem("token") !== undefined
      ? JSON.parse(localStorage?.getItem("token"))
      : ""
  useEffect(() => {
    const cartValues = localStorage?.getItem("cart")
      ? JSON.parse(localStorage?.getItem("cart"))
      : ""
    setcartData(cartValues)
  }, [])
  const navigate = useNavigate()

  console.log("df", cartData)
  return (
    <div className="App">
      <Layout cartData={cartData}>
        <Routes>
          <Route path="/user">
            <Route path="add" element={<AddUser />} />
            <Route path="login" element={<Login />} />
            <Route path="*" element={<NoPage />} />
          </Route>
          {userData && userData !== null ? (
            <Route path="/product">
              <Route path="admin">
                <Route path="addCategory" element={<AddCategory />} />
                <Route path="addSubCategory" element={<Subcategory />} />
              </Route>
              <Route path="admin/addProduct" element={<AddProduct />} />
              <Route path="admin/addVariant" element={<AddVariant />} />
              <Route path="admin/addAttribute" element={<Attribute />} />
              <Route path="category" element={<GetAllCategory />} />
              <Route path="product/:id" element={<GetAllProduct />} />
              {/* <Route path="product_id/:id" element={<GetProduct />} /> */}
              <Route
                path="variant/:id"
                element={<GetVariant setcartData={setcartData} />}
              />
              {cartData && cartData.length > 0 && cartData !== undefined && (
                <Route
                  path="cart"
                  element={
                    <Cart cartData={cartData} setcartData={setcartData} />
                  }
                />
              )}
              <Route path="admin/addPromocode" element={<AddPromoCode />} />
              <Route path="admin/getPromocode" element={<GetPromoCode />} />

              <Route path="success" element={<Success />} />
              <Route path="cancel" element={<Cancel />} />
            </Route>
          ) : (
            navigate("user/login")
          )}
          <Route path="*" element={<NoPage />} />
        </Routes>
      </Layout>
    </div>
  )
}

export default App
