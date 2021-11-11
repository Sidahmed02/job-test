import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import { pink, grey, blue, green } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";
import CallMissedIcon from "@mui/icons-material/CallMissed";
import CallMissedOutgoingIcon from "@mui/icons-material/CallMissedOutgoing";
import VoicemailIcon from "@mui/icons-material/Voicemail";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import moment from "moment";

const FeedDetails = ({ feed, handleArchive }) => {
  //choose icon for a call type
  function callTypeIcon(directionCall, type) {
    if (directionCall === "inbound") {
      if (type === "answered") {
        return (
          <CallReceivedIcon
            sx={{ color: green[500], ml: "10px" }}
            fontSize="medium"
          />
        );
      } else if (type === "missed") {
        return (
          <CallMissedIcon
            sx={{ color: pink[500], ml: "10px" }}
            fontSize="medium"
          />
        );
      } else if (type === "voicemail") {
        return (
          <VoicemailIcon
            sx={{ color: blue[500], ml: "10px" }}
            fontSize="medium"
          />
        );
      }
    } else {
      if (type === "answered") {
        return (
          <CallMadeIcon
            sx={{ color: green[500], ml: "10px" }}
            fontSize="medium"
          />
        );
      } else if (type === "missed") {
        return (
          <CallMissedOutgoingIcon
            sx={{ color: pink[500], ml: "10px" }}
            fontSize="medium"
          />
        );
      } else if (type === "voicemail") {
        return (
          <VoicemailIcon
            sx={{ color: blue[500], ml: "10px" }}
            fontSize="medium"
          />
        );
      }
    }
  }
  //choose icon for arichve button
  function archiveButtonIcon(isArchived) {
    if (isArchived) {
      return <UnarchiveIcon fontSize="medium" sx={{ color: grey[500] }} />;
    } else {
      return <ArchiveIcon fontSize="medium" sx={{ color: grey[500] }} />;
    }
  }

  return (
    <React.Fragment>
      <Card sx={{ borderRadius: 6, mx: 1 }}>
        <CardHeader
          sx={{ p: 1 }}
          avatar={callTypeIcon(feed.direction, feed.call_type)}
          action={
            <IconButton
              sx={{ color: grey[500], mt: "6px", mr: "10px" }}
              onClick={() => {
                handleArchive(feed.id);
              }}
            >
              {archiveButtonIcon(feed.is_archived)}
            </IconButton>
          }
          title={feed.from}
          subheader={`tried to call on ${feed.via} at ${moment(
            feed.created_at
          ).format("LT")}`}
          subheaderTypographyProps={{
            variant: "h6",
            align: "center",
            color: grey[500],
            gutterBottom: true,
            fontSize: "13px"
          }}
          titleTypographyProps={{
            variant: "h6",
            align: "center",
            fontWeight: "bold",
            fontSize: "15px"
          }}
        />
      </Card>
    </React.Fragment>
  );
};

export default FeedDetails;
