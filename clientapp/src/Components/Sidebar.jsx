import React, { useState } from 'react';
import "./Sidebar.css"
import {
    FaTh,
    FaBars,
    FaLayerGroup,
    FaRegChartBar,
    FaShoppingBag,
    FaThList,
    FaAngleRight // New icon for indicating submenu
}from "react-icons/fa";
import { NavLink } from 'react-router-dom';

const Sidebar = ({children}) => {
    const [isOpen ,setIsOpen] = useState(false);
    const toggle = () => setIsOpen (!isOpen);
    const [masterMenuOpen, setMasterMenuOpen] = useState(false); // State to track if master menu is open
    
    const menuItem=[
        {
            path:"/",
            name:"Dashboard",
            icon:<FaTh/>
        },
        {
            name:"Master",
            icon:<FaTh/>, // You can replace with relevant icon
            subMenu: [
                {
                    path:"/itemgroup",
                    name:"Itemgroup",
                    icon:<FaLayerGroup/>
                },
                {
                    path:"/Items",
                    name:"Item +",
                    icon:<FaRegChartBar/>
                }
            ]
        },
        {
            path:"/sale",
            name:"Sale",
            icon:<FaRegChartBar/>
        },
        {
            path:"/purchase",
            name:"Purchase",
            icon:<FaShoppingBag/>
        },
        {
            path:"/report",
            name:"Report",
            icon:<FaThList/>
        }
    ];

    return (
        <div className="container">
           <div style={{width: isOpen ? "200px" : "50px"}} className="sidebar">
               <div className="top_section">
                   <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                   <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                       <FaBars onClick={toggle}/>
                   </div>
               </div>
               {menuItem.map((item, index) => (
                   <div key={index}>
                       {item.subMenu ? (
                           <>
                               <div className="link" onClick={() => setMasterMenuOpen(!masterMenuOpen)}> {/* Toggling master menu */}
                                   <div className="icon">{item.icon}</div>
                                   <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                                   <div className="sub_menu_icon">{masterMenuOpen ? <FaAngleRight /> : <FaAngleRight />}</div> {/* Submenu indicator */}
                               </div>
                               <div style={{display: masterMenuOpen && isOpen ? "block" : "none"}}> {}
                                   {item.subMenu.map((subItem, subIndex) => (
                                       <NavLink to={subItem.path} key={subIndex} className="link" activeClassName="active">
                                           <div className="icon">{subItem.icon}</div>
                                           <div className="link_text">{subItem.name}</div>
                                       </NavLink>
                                   ))}
                               </div>
                           </>
                       ) : (
                           <NavLink to={item.path} className="link" activeClassName="active">
                               <div className="icon">{item.icon}</div>
                               <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                           </NavLink>
                       )}
                   </div>
               ))}
           </div>
           <main>{children}</main>
        </div>
    );
};

export default Sidebar;
