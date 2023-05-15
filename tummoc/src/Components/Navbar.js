import { ReactNode } from 'react';
import { Link } from "react-router-dom"
import {
    Box,
    Flex,
    Avatar,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    Center,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { authLogout } from '../Redux/actions/auth.actions';



export default function Nav() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch()
    const isAuth = useSelector(s => s.auth.isAuth)
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <Link to="/"><Box>Tummoc</Box></Link>

                    <Flex alignItems={'center'}>
                        <Stack direction={'row'} spacing={7}>
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
                                    <br />
                                    <Center>
                                        <Avatar
                                            size={'2xl'}
                                            src={'https://avatars.dicebear.com/api/male/username.svg'}
                                        />
                                    </Center>
                                    <br />
                                    <Center>
                                        <p>Username</p>
                                    </Center>
                                    <br />
                                    <MenuDivider />
                                    {!isAuth && <Link to="/login"><MenuItem >Log-In</MenuItem></Link>}
                                    {!isAuth && <Link to="/signup"><MenuItem>Sign-Up</MenuItem></Link>}
                                    {
                                        isAuth && <Button
                                            variant={"link"}
                                            onClick={() => dispatch(authLogout())}
                                        ><MenuItem>Logout</MenuItem></Button>
                                    }
                                </MenuList>
                            </Menu>
                        </Stack>
                    </Flex>
                </Flex>
            </Box>
        </>
    );
}