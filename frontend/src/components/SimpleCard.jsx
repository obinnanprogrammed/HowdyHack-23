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

=======
import {useState} from 'react';
import {useNavigate} from 'react-router-dom';

export default function SimpleCard() {
  const history = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleInputChange = (e) => {
    const {name, value} = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(formData.email !== "obinnanwakwue10@gmail.com" || formData.password !== "censored") {
      console.log("Cope, you have invalid information");
      console.log(formData.email, formData.password)
      return (<p style="color: red">Invalid login</p>)
    } else {
      history.push("/home");
    }
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
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

              <Input type="email" onChange={handleInputChange} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" onChange={handleInputChange} />

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

              onClick={handleSubmit}>

                Sign in
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
