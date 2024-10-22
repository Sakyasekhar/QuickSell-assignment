import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/navbar";
import Group from "../components/Group/Group";
import axios from "axios";

const getOrder = () => {
  if (localStorage.getItem("order")) {
    return localStorage.getItem("order");
  } else {
    return "priority";
  }
};
const getGroup = () => {
  if (localStorage.getItem("group")) {
    return localStorage.getItem("group");
  } else {
    return "status";
  }
};

const Home = () => {
  const [displayStatus, setdisplayStatus] = useState(false);
  const [groupValue, setgroupValue] = useState(getGroup());
  const [orderValue, setorderValue] = useState(getOrder());

  const [data, setdata] = useState({});
  const [filteredData, setfilteredData] = useState({});

  const statusBar = ["Backlog", "Todo", "In progress", "Done", "Canceled"];
  const priorityBar = ["No Prioroity", "Urgent", "High", "Medium", "Low"];
  const [users, setUsers] = useState([]);

  const OnClick = () => {
    setdisplayStatus((prev) => !prev);
  };

  useEffect(() => {
    const response = axios
      .get("https://api.quicksell.co/v1/internal/frontend-assignment")
      .then((res) => {
        setdata(res.data);
        setUsers(res.data.users);
        //console.log(res.data);
      });
  }, []);

  useEffect(() => {
    const filterdataByGroup = () => {
      if (groupValue == "status") {
        return data.tickets.reduce((acc, cur) => {
          let stat = cur.status;

          if (!acc[stat]) acc[stat] = [];

          acc[stat].push(cur);

          return acc;
        }, {});
      } else if (groupValue == "user") {
        return data.tickets.reduce((acc, cur) => {
          let userid = cur.userId;

          if (!acc[userid]) acc[userid] = [];

          acc[userid].push(cur);

          return acc;
        }, {});
      } else {
        return data.tickets.reduce((acc, cur) => {
          let prio = cur.priority;

          if (!acc[prio]) acc[prio] = [];

          acc[prio].push(cur);

          return acc;
        }, {});
      }
    };

    const filterdataByOrder = (groupedData) => {
      // Sorting grouped data
      const sortedData = { ...groupedData };
      if (orderValue === "title") {
        for (const ele in sortedData) {
          sortedData[ele].sort((a, b) => a.title.localeCompare(b.title));
        }
      } else {
        for (const ele in sortedData) {
          sortedData[ele].sort((a, b) => b.priority - a.priority);
        }
      }
      return sortedData;
    };

    if (data.tickets != null) {
      const groupedData = filterdataByGroup();
      const sortedGroupedData = filterdataByOrder(groupedData);
      setfilteredData(sortedGroupedData);
    }
  }, [data, groupValue, orderValue]);

  return (
    <div>
      <Navbar
        displayStatus={displayStatus}
        OnClick={OnClick}
        groupValue={groupValue}
        setgroupValue={setgroupValue}
        orderValue={orderValue}
        setorderValue={setorderValue}
      />
      {/* <div className="view"> */}
      {groupValue === "status" && (
        <div className="view">
          {statusBar.map((ele, key) => (
            <div key={key}>
              <Group
                groupValue={groupValue}
                heading={ele}
                users={users}
                cardData={filteredData[ele]}
              />
            </div>
          ))}
        </div>
      )}

      {groupValue === "priority" && (
        <div className="view">
          {priorityBar.map((ele, key) => (
            <div key={key}>
              <Group
                groupValue={groupValue}
                heading={ele}
                users={users}
                cardData={filteredData[key]}
              />
            </div>
          ))}
        </div>
      )}

      {groupValue === "user" && (
        <div className="view">
          {users.map((ele, key) => (
            <div key={key}>
              <Group
                groupValue={groupValue}
                heading={ele}
                users={users}
                cardData={filteredData[ele.id]}
              />
            </div>
          ))}
        </div>
      )}

      {/* </div> */}
    </div>
  );
};

export default Home;
