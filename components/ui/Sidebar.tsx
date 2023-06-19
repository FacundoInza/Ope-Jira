import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import { useContext } from "react";
import { UIContext } from "../../context/ui";

const menuItems: string[] = ["Inbox", "Starred", "Send Email", "Drafts"];

const Sidebar = () => {
  const { sideMenuOpen, closeSideMenu } = useContext(UIContext);

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: "5px 10px" }}>
          <Typography variant="h4">Menu</Typography>
        </Box>
        <Divider />
        <List>
          {menuItems.map((text, i) => (
            <ListItem button key={text}>
              <ListItemIcon>
                {i % 2 ? <InboxOutlinedIcon /> : <MailOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
export default Sidebar;
