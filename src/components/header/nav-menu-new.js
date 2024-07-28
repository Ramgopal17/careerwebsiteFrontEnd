import React from "react";
import menu_data from "./menu-data-new";
import { Link } from "react-router-dom";

const NavMenu = () => {
  return (
    <>
      <ul>
        {menu_data.map((item, i) => (
          <li
            key={i}
            style={{ "--tp-theme-redical": "rgb(12,84,173)" }}
            className={`${item.has_dropdown ? "has-dropdown" : ""} 
            `}
          >
            <Link to={item.link}>{item.title}</Link>
            {item.sub_menus && (
              <ul
                className="submenu"
                style={{ backgroundColor: "white", minWidth: "246px" }}
              >
                {item.sub_menus.map((sub_item, sub_i) => {
                  const isUrl = sub_item.link.startsWith("http://");
                  const targetAttr = isUrl ? `"_blank"` : "";

                  return (
                    <li
                      key={sub_i}
                      style={{
                        "--tp-common-white": "black",
                        "--tp-theme-redical": "rgb(12,84,173)",
                      }}
                    >
                      <Link
                        to={sub_item.link}
                        target={targetAttr}
                        style={{ fontSize: "15px", fontWeight: 400 }}
                      >
                        {sub_item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </>
  );
};

export default NavMenu;
