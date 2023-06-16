import {
  Button,
  Flex,
  Text,
  Image,
  Box,
  Input,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import TicketManagement from "../components/TicketManagement";
import Dashboard from "./Dashboard";

const HomePage = () => {
  return (
    <Flex w="100vw" m="auto">
      <Tabs variant="unstyled">
        <Flex w="100vw" m="auto">
          <Flex w="240px" h="100vh" bg="green.800" flexDirection="column">
            <Box
              w="240px"
              h="152px"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              {/* <Image src="" mb={4}/> */}
              <Text textStyle="b1" color="green.400">
                Helpdesk Support System
              </Text>
            </Box>
            <TabList>
              <Box w="240px" h="540px" display="flex" flexDirection="column">
                <Tab _selected={{ color: "white", bg: "green.400" }}>
                  <Box
                    h="72px"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-evenly"
                  >
                    <Box display="flex" w="190px">
                      {/* <Image src=""/> */}
                      <Text textStyle="b1" color="white" ml={5}>
                        Ticket Management
                      </Text>
                    </Box>
                  </Box>
                </Tab>
                <Tab _selected={{ color: "white", bg: "green.400" }}>
                  <Box h="72px" display="flex" alignItems="center">
                    <Box display="flex" w="190px">
                      {/* <Image src=""/> */}
                      <Text textStyle="b1" color="white" ml={5}>
                        Dashboard
                      </Text>
                    </Box>
                  </Box>
                </Tab>
              </Box>
            </TabList>
          </Flex>
          <Flex>
            <TabPanels>
              <TabPanel p={0}>
                <TicketManagement />
              </TabPanel>
              <TabPanel p={0}>
                <Dashboard />
              </TabPanel>
            </TabPanels>
          </Flex>
        </Flex>
      </Tabs>
    </Flex>
  );
};

export default HomePage;
