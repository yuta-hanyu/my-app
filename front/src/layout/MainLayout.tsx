import { Typography } from '@mui/material'
import AppSnackbar from 'components/AppSnackbar'
import React, { Suspense, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import constant from 'const'
import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { blueGrey, lightBlue } from '@mui/material/colors'
import SidebarMenus from 'hooks/SidebarMenus'
import UserMenu from 'components/UserMenu'
import AppLoading from 'components/AppLoading'

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const MainLayout = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false)
  const sidebarMenus = SidebarMenus()
  const theme = useTheme()

  const Main = styled('main', {
    shouldForwardProp: (prop) => prop !== 'open',
  })<{
    open?: boolean
  }>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${constant.HEADER_DRAWER_WIDTH}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }))

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })<AppBarProps>(({ theme, open }) => ({
    background: blueGrey[500],
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${constant.HEADER_DRAWER_WIDTH}px)`,
      background: blueGrey[500],
      marginLeft: `${constant.HEADER_DRAWER_WIDTH}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }))

  const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  }))

  const StyledLink = styled(Link)(() => ({
    color: blueGrey[50],
    textDecoration: 'none',
    '&:hover': {
      color: lightBlue[300],
      transition: 'all 1s',
    },
  }))

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" open={isDrawerOpen}>
        <Toolbar>
          <Box style={{ flexGrow: 1 }}>
            <IconButton
              aria-label="open drawer"
              onClick={() =>
                setIsDrawerOpen((prevIsDrawerOpen) => !prevIsDrawerOpen)
              }
              edge="start"
              sx={{
                mr: 2,
                color: blueGrey[50],
                ...(isDrawerOpen && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box style={{ flexGrow: 1 }}>
            <Typography variant="h6" noWrap component="div" align="center">
              xxxxxxxx Board
            </Typography>
          </Box>
          <Box style={{ flexGrow: 1 }} />
          <Box sx={{ flexGrow: 0 }}>
            <UserMenu />
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: constant.HEADER_DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: constant.HEADER_DRAWER_WIDTH,
            boxSizing: 'border-box',
            background: blueGrey[500],
          },
        }}
        variant="persistent"
        anchor="left"
        open={isDrawerOpen}
      >
        <DrawerHeader>
          <IconButton
            onClick={() =>
              setIsDrawerOpen((prevIsDrawerOpen) => !prevIsDrawerOpen)
            }
          >
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon
                sx={{
                  color: blueGrey[50],
                }}
              />
            ) : (
              <ChevronRightIcon
                sx={{
                  color: blueGrey[50],
                }}
              />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {sidebarMenus.map((menu) => (
            <StyledLink key={menu.name} to={menu.path}>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>{menu.icon}</ListItemIcon>
                  <ListItemText primary={menu.name} />
                </ListItemButton>
              </ListItem>
            </StyledLink>
          ))}
        </List>
      </Drawer>
      <Main open={isDrawerOpen}>
        <DrawerHeader />
        <Suspense fallback={<AppLoading />}>
          <Outlet />
          <AppSnackbar />
        </Suspense>
      </Main>
    </Box>
  )
}

export default MainLayout
