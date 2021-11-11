import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

import Inbox from "./views/Inbox";
import Archive from "./views/Archive";
import Layout from "./layout/Layout";
import callsContext from "./shared/context/calls-context";

const App = () => {
  //context
  const [callsNumber, setCallsNumber] = useState(0);
  function updateCallsContext(feeds) {
    setCallsNumber(feeds);
  }

  //fetch activity feeds to update context states
  useEffect(() => {
    let config = {
      method: "get",
      url: "https://aircall-job.herokuapp.com/activities",
      headers: {}
    };

    axios(config)
      .then(response => {
        let activities = response.data.filter(call => !call.is_archived);
        setCallsNumber(activities.length);
      })
      .catch(error => {
        console.log("error when fetching calls");
      });
  }, []);

  return (
    <div className="container">
      <callsContext.Provider value={{ callsNumber, updateCallsContext }}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Inbox />} />
            <Route path="archive" element={<Archive />} />
          </Route>
        </Routes>
      </callsContext.Provider>
    </div>
  );
};

export default App;
