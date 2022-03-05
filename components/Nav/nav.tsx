import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Button, Center, Container } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";

import { AuthContext } from "store/auth-context";

const Nav = () => {
  const { logout } = useContext(AuthContext)

  const logoutHandler = () => logout();

  return (
    <Container maxW='xl' centerContent padding='0' margin='0'>
      <Center bg='teal' h='70px' w='100%' color='white' position='fixed' >
        <Breadcrumb separator='-'>
          <BreadcrumbItem>
            <BreadcrumbLink fontWeight='bold' fontSize='20px' href='/'>HOME</BreadcrumbLink>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <BreadcrumbLink fontWeight='bold' fontSize='20px' href='/blog'>BLOG</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
      </Center >

      <Button
        height='70px'
        position='fixed'
        right='10px'
        color='white'
        type='button'
        variant='ghost'
        onClick={logoutHandler}>
        LOGOUT
      </Button>
    </Container >
  );
}

export default Nav;
