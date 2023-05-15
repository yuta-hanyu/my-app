import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import { blueGrey } from '@mui/material/colors'
import { signOut } from 'firebase/auth'
import React, { memo, useState } from 'react'
import { useRecoilValue, useResetRecoilState } from 'recoil'
import { signInUserState } from 'store/auth'
import { auth } from 'lib/firebase'
import ExitToAppIcon from '@mui/icons-material/ExitToApp'
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts'
import { User } from 'interface/User'
// NOTE 発火するボタンごと子にする必要がある
// https://stackoverflow.com/questions/70464786/mui-anchorel-prop-provided-is-invalid

const UserMenu = memo(() => {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const { displayName, avatarImageUrl } = useRecoilValue<User>(signInUserState)
  const resetAuth = useResetRecoilState(signInUserState)
  const userMenus = [
    // TODO ユーザー情報編集作成
    {
      name: 'ユーザー情報編集',
      clickFunc: () => setAnchorElUser(() => null),
      color: '',
      icon: <ManageAccountsIcon />,
    },
    {
      name: 'ログアウト',
      clickFunc: () => {
        signOut(auth).then(() => resetAuth())
        setAnchorElUser(() => null)
      },
      color: 'error.main',
      icon: <ExitToAppIcon />,
    },
  ]

  return (
    <>
      <IconButton
        onClick={(e) => setAnchorElUser(e.currentTarget)}
        sx={{ p: 0 }}
      >
        <Avatar alt={displayName} src={avatarImageUrl} />
        <Typography
          variant="subtitle1"
          component="span"
          noWrap
          sx={{ ml: 1, color: blueGrey[50] }}
        >
          {displayName}
        </Typography>
      </IconButton>
      <Menu
        sx={{ mt: '45px' }}
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        onClose={() => setAnchorElUser(() => null)}
        open={Boolean(anchorElUser)}
      >
        {userMenus.map((userMenu) => (
          <MenuItem key={userMenu.name} onClick={userMenu.clickFunc} dense>
            <Box component={'span'} mr={1}>
              {userMenu.icon}
            </Box>
            <Typography textAlign="center" sx={{ color: userMenu.color }}>
              {userMenu.name}
            </Typography>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
})

export default UserMenu
