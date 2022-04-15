import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import Stack from "@mui/material/Stack";
import emergencyPic from "../images/Emergency.png";
import logoPic from "../images/Logo.png";
import Link from "./routing/Link";
import "./NavigationStyles.css";

const pages = ["About Us"];

const NavigationBar = ({
  emergencyClicked,
  onEmergencyClick,
  onAboutUsClicked,
}) => {
  return (
    <AppBar className="navbar" position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link href="/">
            <img className="image2" alt="Logo Text" src={logoPic} />
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link href="aboutus">
                <Button
                onClick={() => {onAboutUsClicked();}}
                  key={page}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Emergency">
              <Stack spacing={0}>
                <IconButton
                  onClick={() => {
                    onEmergencyClick();
                  }}
                  sx={{ p: 0 }}
                >
                  <Link href="/">
                    <img
                      className={`image ${
                        emergencyClicked ? "red-highlight" : ""
                      }`}
                      src={emergencyPic}
                      alt="Emergency"
                    />
                  </Link>
                </IconButton>
              </Stack>
            </Tooltip>

            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            ></Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavigationBar;
