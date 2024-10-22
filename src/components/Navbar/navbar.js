import "./navbar.css";
import { useState } from "react";
import { ReactComponent as DisplayIcon } from "../../assets/icons_FEtask/Display.svg";
import { ReactComponent as DownIcon } from "../../assets/icons_FEtask/down.svg";



const Navbar = ({displayStatus,OnClick,groupValue,setgroupValue,orderValue,setorderValue}) => {
  

 

  const handleGroup = (e) => {
    setgroupValue(e);
    OnClick();
    localStorage.setItem("group", e);
  };

  const handleOrder = (e) => {
    setorderValue(e);
    OnClick();
    localStorage.setItem("order", e);
  };

  return (
    <div className="navbar">
      <div className="button" onClick={OnClick}>
        <DisplayIcon />
        <span>Display</span>
        <DownIcon />
      </div>

      {displayStatus && (
        <>
          <div className="dropdown">
            <div className="selectGroup">
              <span style={{ fontSize: "14px", color: "#555B5A" }}>
                Grouping
              </span>
              <select
                value={groupValue}
                onChange={(e) => handleGroup(e.target.value)}
                className="selectStyle"
                name="group"
                id="group"
              >
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="selectGroup">
              <span style={{ fontSize: "14px", color: "#555B5A" }}>
                Ordering
              </span>
              <select
                value={orderValue}
                onChange={(e) => handleOrder(e.target.value)}
                className="selectStyle"
                name="order"
                id="order"
              >
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
