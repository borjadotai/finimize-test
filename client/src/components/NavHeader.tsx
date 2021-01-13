import React from 'react'
import { Box, Image, IconButton, useColorMode } from '@chakra-ui/react'
import { MoonIcon, SunIcon } from '@chakra-ui/icons'
import images from '../images'

const NavHeader = () => {
    const { colorMode, toggleColorMode } = useColorMode()
    let isLightTheme = colorMode === 'light'

    const bgColor = {
        light: 'blue100',
        dark: 'black',
    }

    const borderColor = {
        light: 'grey3',
        dark: 'text',
    }

    return (
        <Box
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
            px={6}
            py={4}
            bg={bgColor[colorMode]}
            borderBottomWidth="1px"
            borderBottomColor={borderColor[colorMode]}
        >
            <Image src={images.fullBrandLogo} alt="Finimize" width="170px" height="30px" />
            <IconButton
                aria-label="Change theme"
                icon={isLightTheme ? <MoonIcon /> : <SunIcon />}
                onClick={toggleColorMode}
            />
        </Box>
    )
}

export default NavHeader
