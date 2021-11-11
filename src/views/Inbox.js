import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";
import ArchiveIcon from "@mui/icons-material/Archive";
import { blue } from "@mui/material/colors";
import moment from "moment";
import Stack from "@mui/material/Stack";

//internal imports
import { callsContext } from "../shared/context/calls-context";
import FeedDetails from "../ui-components/FeedDetails";

const Inbox = () => {
  const { updateCallsContext } = useContext(callsContext);
  const [activityFeeds, setActivityFeeds] = useState(null);
  const [clicked, setClicked] = useState(false);

  //fetch activity feeds and store it in a state
  useEffect(
    () => {
      let config = {
        method: "get",
        url: "https://aircall-job.herokuapp.com/activities",
        headers: {}
      };

      axios(config)
        .then(response => {
          let activities = response.data.filter(call => !call.is_archived);
          setActivityFeeds(
            //sort the call feeds by date and time
            activities.sort(function(a, b) {
              if (moment(a.created_at).isBefore(b.created_at)) {
                return 1;
              } else {
                return -1;
              }
            })
          );

          updateCallsContext(activities.length);
        })
        .catch(error => {
          console.log("error when fetching calls");
        });
    },
    [clicked]
  );

  //archive a feed
  function archiveAfeed(id) {
    let data = JSON.stringify({
      is_archived: true
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
        console.log("arichved successfully");
        clicked ? setClicked(false) : setClicked(true);
      })
      .catch(error => {
        console.log("error when archiving calls");
      });
  }

  //archive all feeds
  function archiveAllFeeds() {
    let archiveFeedsPromeses = activityFeeds.map(feed => {
      let data = JSON.stringify({
        is_archived: true
      });

      let config = {
        method: "post",
        url: "https://aircall-job.herokuapp.com/activities/" + feed.id,
        headers: {
          "Content-Type": "application/json"
        },
        data: data
      };

      return axios(config);
    });

    Promise.all(archiveFeedsPromeses)
      .then(responses => {
        console.log("All calls have been archived successfully");
        clicked ? setClicked(false) : setClicked(true);
      })
      .catch(error => {
        console.log("error when archiving calls");
      });
  }

  return (
    <React.Fragment>
      <Stack
        direction="column"
        sx={{
          borderRadius: 6,
          mx: 1,
          my: 0.6
        }}
      >
        <Button
          variant="contained"
          sx={{ width: "85%", ml: 3.5, bgcolor: blue[350] }}
          startIcon={<ArchiveIcon />}
          onClick={() => {
            archiveAllFeeds();
          }}
        >
          archive all calls
        </Button>
        {activityFeeds &&
          activityFeeds.map(feed => {
            return (
              <React.Fragment>
                <Divider sx={{ m: 1.5 }} key={feed.id + "DInbox"}>
                  {moment(feed.created_at)
                    .format("MMMM, DD YYYY")
                    .toUpperCase()}
                </Divider>
                <FeedDetails
                  key={feed.id}
                  feed={feed}
                  handleArchive={archiveAfeed}
                />
              </React.Fragment>
            );
          })}
      </Stack>
    </React.Fragment>
  );
};

export default Inbox;
