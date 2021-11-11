import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Divider from "@mui/material/Divider";
import moment from "moment";

//internal imports
import FeedDetails from "../ui-components/FeedDetails";
import { callsContext } from "../shared/context/calls-context";

const Archive = () => {
  const { updateCallsContext } = useContext(callsContext);
  const [archivedFeeds, setArchivedFeeds] = useState(null);
  const [clicked, setClicked] = useState(false);

  //fetch all archived feeds and store it in a state
  useEffect(
    () => {
      let config = {
        method: "get",
        url: "https://aircall-job.herokuapp.com/activities",
        headers: {}
      };

      axios(config)
        .then(response => {
          let activities = response.data.filter(call => call.is_archived);
          setArchivedFeeds(
            activities.sort(function(a, b) {
              if (moment(a.created_at).isBefore(b.created_at)) {
                return 1;
              } else {
                return -1;
              }
            })
          );
          updateCallsContext(response.data.length - activities.length);
        })
        .catch(error => {
          console.log("error when fetching calls");
        });
    },
    [clicked]
  );

  //remove feed from archive
  function removeAFeedFromArchive(id) {
    let data = JSON.stringify({
      is_archived: false
    });

    let config = {
      method: "post",
      url: "https://aircall-job.herokuapp.com/activities/" + id,
      headers: {
        "Content-Type": "application/json"
      },
      data: data
    };

    axios(config)
      .then(response => {
        console.log("feed removed from arichve successfully");
        clicked ? setClicked(false) : setClicked(true);
      })
      .catch(error => {
        console.log("error when unarchiving calls");
      });
  }

  return (
    <React.Fragment>
      {archivedFeeds &&
        archivedFeeds.map(feed => {
          return (
            <React.Fragment>
              <Divider sx={{ m: 1.5 }} key={feed.id + "D"}>
                {moment(feed.created_at)
                  .format("MMMM, DD YYYY")
                  .toUpperCase()}
              </Divider>
              <FeedDetails
                key={feed.id}
                feed={feed}
                handleArchive={removeAFeedFromArchive}
              />
            </React.Fragment>
          );
        })}
    </React.Fragment>
  );
};

export default Archive;
