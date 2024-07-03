import { FC, PropsWithChildren } from 'react';
import Header from '../Header/Header';
import { Box, CssBaseline } from '@mui/material';

const Layout: FC<PropsWithChildren> = ({children}) => {
    return <>
        <CssBaseline/>
        <Header/>
        <Box
            sx={{
                padding: 1
            }}
        >
            {children}
        </Box>

    </>
}

export default Layout
