import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
} from "@chakra-ui/react";

import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  return (
    <Menu>
      <MenuButton
        as={Button}
        rounded={"full"}
        variant={"link"}
        cursor={"pointer"}
        minW={0}
      >
        <Avatar size={"sm"} src={currentUser.photoURL} />
      </MenuButton>
      <MenuList alignItems={"center"}>
        <br />
        <Center>
          <Avatar size={"2xl"} src={currentUser.photoURL} />
        </Center>
        <br />
        <Center>
          <MenuItem
            onClick={() => {
              navigate("/private/profile");
            }}
            w={100}
            as={Button}
          >
            Profile
          </MenuItem>
        </Center>
        <br />
        <MenuDivider />
        <MenuItem as={NavLink} to={"/private/annonces/my-annonces"}>
          My Annonces
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
