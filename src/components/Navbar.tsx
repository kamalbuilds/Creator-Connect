import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, Link, Stack, useColorMode, useColorModeValue, useDisclosure, Avatar, Menu, MenuButton, MenuList, MenuDivider, MenuItem, Center } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { useRouter } from 'next/router';
import StaticImage from 'next/image';
import clogo from "../asset/clogo.png";
import { Button } from '@chakra-ui/button';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount} from 'wagmi';
import { useState, useEffect} from 'react';

const NavLink = ({ children, href }: { children: ReactNode; href: string }) => (
  <Link
    px={2}
    py={1}
    rounded={'md'}
    _hover={{
      textDecoration: 'none',
      bg: useColorModeValue('gray.200', 'gray.700'),
    }}
    href={href}>
    {children}
  </Link>
);



export default function Navbar() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [dashboardLink, setDashboardLink] = useState('');

  useEffect(() => {
    if (address) {
      setDashboardLink(`/dashboard/${address}`);
    }
  }, [address]);

  const Links = [
    { label: 'Dashboard', href: dashboardLink},
    { label: 'Nft', href: '/nft' },
    { label: 'Recording', href: '/recording' },
  ];

  console.log(address, 'address');
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <HStack spacing={8} alignItems={'center'}>
            <Link href="/">
              <StaticImage src={clogo} alt="Logo" width={250} height={50} />
            </Link>
            <HStack
              as={'nav'}
              spacing={4}
              display={{ base: 'none', md: 'flex' }}>
              {Links.map((link) => (
                <NavLink key={link.label} href={link.href}>
                  {link.label}
                </NavLink>
              ))}
            </HStack>
          </HStack>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <ConnectButton />
              <Button onClick={toggleColorMode}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>

              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                    src={'https://avatars.dicebear.com/api/male/username.svg'}
                  />
                </MenuButton>
                <MenuList alignItems={'center'}>
                  <Center>
                    <Avatar
                      size={'2xl'}
                      src={'https://avatars.dicebear.com/api/male/username.svg'}
                    />
                  </Center>
                  <br />
                  <p className='text-center'>Hi</p>
                  <br />
                  <MenuDivider />
                  <MenuItem>Your Servers</MenuItem>
                  <MenuItem>Account Settings</MenuItem>
                  <MenuItem>Logout</MenuItem>
                </MenuList>
              </Menu>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
