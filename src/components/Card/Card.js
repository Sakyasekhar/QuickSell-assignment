import React, { useEffect, useState } from "react";
import "./Card.css";

import {ReactComponent as Urgentgray} from "../../assets/icons_FEtask/SVG - Urgent Priority grey.svg";

import {ReactComponent as Zero} from "../../assets/icons_FEtask/No-priority.svg"
import {ReactComponent as One} from "../../assets/icons_FEtask/Img - Low Priority.svg"
import {ReactComponent as Two} from "../../assets/icons_FEtask/Img - Medium Priority.svg"
import {ReactComponent as Three} from "../../assets/icons_FEtask/Img - High Priority.svg"
import {ReactComponent as Four} from "../../assets/icons_FEtask/SVG - Urgent Priority colour.svg"
import userImage from "../../assets/icons_FEtask/user.png"; 

import { ReactComponent as BacklogIcon } from "../../assets/icons_FEtask/Backlog.svg";
import { ReactComponent as TodoIcon } from "../../assets/icons_FEtask/To-do.svg";
import { ReactComponent as InProgressIcon } from "../../assets/icons_FEtask/in-progress.svg";
import { ReactComponent as DoneIcon } from "../../assets/icons_FEtask/Done.svg";
import { ReactComponent as CanceledIcon } from "../../assets/icons_FEtask/Cancelled.svg";

import {ReactComponent as GreenDot} from "../../assets/icons_FEtask/greendot.svg"
import {ReactComponent as GrayDot} from "../../assets/icons_FEtask/graydot.svg"

const Card = ({groupValue,id,title,tag,userId,users,status,priority}) => {
  const [available,setAvailable] = useState(false);

  useEffect(()=>{
    users.forEach(user => {
      if(user.id==userId) setAvailable(user.available);
    });
  },[])
  const Icons = {
    Backlog: <BacklogIcon />,
    Todo: <TodoIcon />,
    "In progress": <InProgressIcon />,
    Done: <DoneIcon />,
    Canceled: <CanceledIcon />,
  };
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-id">{id}</span>
        <div className="card-avatar">
          <img src={userImage} alt="User Avatar" />
          {available==true ? <GreenDot />: <GrayDot />}
        </div>
      </div>
      <div className="card-content">
        {groupValue!="status" && (
          <span className="titleicon">
            {Icons[status]}
          </span>
        )}
        <span>{title}</span>
      </div>
      <div className="card-footer">
        {groupValue!="priority" && (
          <span className="card-icon">

          {priority==0 && <Zero/>}
          {priority==1 && <One/>}
          {priority==2 && <Two/>}
          {priority==3  && <Three/>}
          {priority==4  && <Urgentgray/>}
          
        </span>
        )}
        
        <div className="card-tag">
          <GrayDot/>
          <span >{tag}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
