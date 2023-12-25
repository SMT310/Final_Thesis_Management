import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Avatar from '@mui/material/Avatar';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Stack } from '@mui/material';
import AuthUser from '../../../components/AuthUser/AuthUser';

function Header() {
    const user = JSON.parse(localStorage.getItem('account')) || {};
    return (
        <>
            <AppBar
                position="fixed"
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.95)',
                }}
            >
                <Toolbar sx={{ display: 'flex', justifyContent: 'end' }}>
                    <Stack
                        direction={'row'}
                        sx={{
                            alignItems: 'center',
                        }}
                    >
                        <IconButton sx={{ mr:2 }}>
                            <Badge badgeContent={1} color="error" variant="dot">
                                <NotificationsIcon
                                    sx={{ width: 24, height: 24, color: '#818181' }}
                                />
                            </Badge>
                        </IconButton>
                        <AuthUser user ={user} />
                    </Stack>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Header;
