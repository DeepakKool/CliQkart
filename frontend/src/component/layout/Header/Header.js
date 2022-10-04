import React from "react"
import { ReactNavbar } from "overlay-navbar"
import logo from "../../../images/logo.png"
import './Header.css'
const options = {
  burgerColorHover: "#eb4034",
  logo,
  logoWidth: "15vmax",
  navColor1: "white",
  logoHoverSize: "3px",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  profileIconUrl: "/login",
  searchIconMargin : "0 0 0 1vmax",
  link1Size: "3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  cartIconMargin: "1vmax",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#eb4034",
  link1Padding: "2vmax",
}

const Header = () => {
  return <ReactNavbar {...options} />
}

export default Header
