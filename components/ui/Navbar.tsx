import { FC, useContext } from "react";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { UIContext } from "../../context/ui";

const Navbar: FC = () => {
  const { openSideMenu } = useContext(UIContext);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton size="large" edge="start" onClick={openSideMenu}>
          <MenuOutlinedIcon />
        </IconButton>

        <Typography variant="h6">OpenJira</Typography>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
