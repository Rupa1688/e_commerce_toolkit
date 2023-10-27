import { useEffect, useState } from "react"
import Header from "../header/header"
// import ResponsiveDrawer from "../sidebar/sidebar"
import SidebarData from "../sidebar/sidebar"
// import Sidebar from "../sidebar/sidebar"
// import {Button,InputGroup,Row,Form,Card,Container,Col } from 'react-bootstrap';


const Layout=({children,cartData})=>{
   
   

    return(
        <>
        {/* <Header /> */}
        <SidebarData cartData={cartData}/>               
        <main className="main" >{children}</main>
       
        </>
    )
}
export default Layout