import React, { useState } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import Dashboard from "./Dashboard";

export default function SimpleCard({ switchToSignup, onLogin }) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Define your correct email and password (Note: In real-world applications, never hard code these in frontend code!)
  const handleLogin = () => {
    const storedPassword = localStorage.getItem(enteredEmail);

    if (storedPassword && storedPassword === enteredPassword) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect email or password!");
    }
  };

  const handleEmailChange = (event) => {
    setEnteredEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setEnteredPassword(event.target.value);
  };

  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue(
        "linear-gradient(135deg, #E29495, #D47583, #BF556A)",
        "gray.800"
      )}
    >
      <Stack spacing={8} mx={"auto"} maxW={"xl"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading
            fontSize={"6xl"}
            textAlign="center"
            fontFamily="'Pacifico', cursive"
            textShadow="
        -2.5px -2.5px 0 #000,  
         2.5px -2.5px 0 #000,
         -2.5px 2.5px 0 #000,
          2.5px 2.5px 0 #000"
            color={"white"}
          >
            Reveille Rewards
          </Heading>
          <Text
            fontSize={"2xl"}
            color={"white"}
            textShadow="
        -1px -1px 0 #000,  
         1px -1px 0 #000,
         -1px 1px 0 #000,
          1px 1px 0 #000"
            fontFamily="'Pacifico', cursive"
          >
            Shop small, score big!
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={enteredEmail}
                onChange={handleEmailChange}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={enteredPassword}
                onChange={handlePasswordChange}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Text color={"blue.400"} onClick={switchToSignup}>
                  <Link>Create An Account</Link>
                </Text>
              </Stack>
              <Button
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleLogin}
              >
                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}