import React, { useEffect } from "react"
import { useState } from "react"
import "./navbar.css"
import "../../CSS/App.css"
import "../../CSS/responsive.css"
import { useSelector } from "react-redux"
function Navbar({ setIsOpen }) {
  const { websiteData } = useSelector((state) => state.content)
  const [btnstate, setbtn] = useState(false)
  function handelClick() {
    setbtn((btnstate) => !btnstate)
  }

  function handelNav() {
    setbtn((btnstate) => false)
  }

  let checkClass = btnstate ? "active" : null

  return (
    <div
      className="hover_div"
      // onClick={() => setIsOpen("navbar")}
      onClick={() => setIsOpen && setIsOpen("navbar")}
    >
      <nav className={`nav ${checkClass}`}>
        <div className="nav_wrapper">
          <div className="logo">
            <h1>{websiteData?.navbar?.websiteName}</h1>
          </div>
          <div className="menus" onClick={handelNav}>
            <ul style={{ pointerEvents: "none" }}>
              {websiteData?.navbar?.links?.map((item, index) => {
                return (
                  <li>
                    <a
                      href={`#${item.toString().toLowerCase()}`}
                      key={index}
                      className="text-red-500"
                    >
                      {item}
                    </a>
                  </li>
                )
              })}
              <div>
                <select className="drop-down">
                  <option selected disabled>
                    Select Language
                  </option>
                </select>
              </div>
            </ul>
          </div>
          <div className="menu-toggler" onClick={handelClick}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
