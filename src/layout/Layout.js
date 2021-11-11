import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import PhoneIcon from "@mui/icons-material/Phone";
import ArchiveIcon from "@mui/icons-material/Archive";
import Badge from "@mui/material/Badge";
import { Scrollbars } from "react-custom-scrollbars-2";
import { blue } from "@mui/material/colors";

//internal imports
import { callsContext } from "../shared/context/calls-context";
import Header from "../Header.jsx";

const useStyles = makeStyles(theme => {
  return {
    root: {},
    appBar: {
      width: "100%"
    },
    gridItem: {
      alignItems: "flex-end"
    }
  };
});

const Layout = () => {
  const classes = useStyles();
  //context state
  const { callsNumber } = useContext(callsContext);

  //help show selected tab in appBar
  const [value, setValue] = React.useState("/");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      {/*appBar menu*/}
      <Box sx={{ bgcolor: "white", width: "100%" }}>
        <Grid container className={classes.gridItem} spacing={2}>
          <Grid item xs={5}>
            <Header />
          </Grid>
          <Grid item xs={7}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab
                icon={
                  <Badge color="secondary" badgeContent={callsNumber}>
                    <PhoneIcon />
                  </Badge>
                }
                label="Inbox"
                value={"/"}
                component={Link}
                to={"/"}
              />
              <Divider orientation="vertical" variant="middle" flexItem />
              <Tab
                icon={<ArchiveIcon />}
                label="Archive"
                value={"archive"}
                component={Link}
                to={"/archive"}
              />
            </Tabs>
          </Grid>
        </Grid>
      </Box>
      {/* feeds area*/}
      <Scrollbars style={{ width: "auto", height: 522 }}>
        <Outlet />
      </Scrollbars>

      {/*buttom menu*/}
      <Box sx={{ bgcolor: blue[800], width: "100%", height: "65px" }}>
        <Grid container spacing={0} sx={{ pt: 1.5 }}>
          <Grid item xs={2} sx={{ pl: 2 }}>
            <Badge
              color="secondary"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
              }}
              badgeContent={callsNumber}
            >
              <PhoneIcon fontSize="large" />
            </Badge>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Layout;
