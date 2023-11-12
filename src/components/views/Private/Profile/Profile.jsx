import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import UserProfileEdit from "./UserProfileEdit";
import Transaction from "./Transaction";
const Profile = () => {
  return (
    <>
      <Tabs
        mt={5}
        justifyContent={"center"}
        align="center"
        w={"full"}
        variant="enclosed"
      >
        <TabList>
          <Tab borderBottom={"none"}>Edit Profile</Tab>
          <Tab borderBottom={"none"}>My Transaction</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <UserProfileEdit />
          </TabPanel>
          <TabPanel>
            <Transaction />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
};

export default Profile;
