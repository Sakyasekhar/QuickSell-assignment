import "./Group.css";
import { ReactComponent as AddIcon } from "../../assets/icons_FEtask/add.svg";
import { ReactComponent as MenuIcon } from "../../assets/icons_FEtask/3 dot menu.svg";
import Card from "../Card/Card";

import { ReactComponent as BacklogIcon } from "../../assets/icons_FEtask/Backlog.svg";
import { ReactComponent as TodoIcon } from "../../assets/icons_FEtask/To-do.svg";
import { ReactComponent as InProgressIcon } from "../../assets/icons_FEtask/in-progress.svg";
import { ReactComponent as DoneIcon } from "../../assets/icons_FEtask/Done.svg";
import { ReactComponent as CanceledIcon } from "../../assets/icons_FEtask/Cancelled.svg";
import userImage from "../../assets/icons_FEtask/user.png"; 

import {ReactComponent as GreenDot} from "../../assets/icons_FEtask/greendot.svg"
import {ReactComponent as GrayDot} from "../../assets/icons_FEtask/graydot.svg"

import { useEffect, useState } from "react";

const Group = ({ groupValue, heading,users,cardData }) => {
  const [count, setCount] = useState(0);

  const Icons = {
    Backlog: <BacklogIcon />,
    Todo: <TodoIcon />,
    "In progress": <InProgressIcon />,
    Done: <DoneIcon />,
    Canceled: <CanceledIcon />,
  };

  useEffect(() => {
    if (cardData != null) setCount(cardData.length);
  }, [cardData]);

  return (
    <div className="group">
      <div className="grouptopbar">
        {groupValue != "user" ? (
          <div className="header">
            {Icons[heading]}
            <span className="head">{heading}</span>
            <span>{count}</span>
          </div>
        ) : (
          <div className="header">
            <div className="card-avatar">
          <img src={userImage} alt="User Avatar" />
          {heading.available==true ? <GreenDot />: <GrayDot />}
        </div>
            <span className="head">{heading.name}</span>
            <span>{count}</span>
          </div>
        )}

        <div className="addmenubuttons">
          <AddIcon />
          <MenuIcon />
        </div>
      </div>

      <div className="cards">
        {cardData != undefined && cardData.length ? (
          cardData.map((ele) => {
            const { id, title, tag, userId, status, priority } = ele;

            return (
              <Card
                groupValue={groupValue}
                key={id}
                id={id}
                title={title}
                tag={tag[0]}
                userId={userId}
                users={users}
                status={status}
                priority={priority}
              />
            );
          })
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default Group;
