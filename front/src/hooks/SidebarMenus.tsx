import InboxIcon from '@mui/icons-material/MoveToInbox'
import ListAltIcon from '@mui/icons-material/ListAlt'
import React, { useState } from 'react'
import { Menu } from 'interface/Menu'
import { blueGrey } from '@mui/material/colors'

const SidebarMenus = () => {
  const [menus] = useState<Menu[]>([
    {
      name: 'タスク管理',
      path: '/tasks',
      icon: (
        <ListAltIcon
          sx={{
            color: blueGrey[50],
          }}
        />
      ),
    },
    {
      name: 'ホーム',
      path: '/home',
      icon: (
        <InboxIcon
          sx={{
            color: blueGrey[50],
          }}
        />
      ),
    },
  ])

  return menus
}

export default SidebarMenus
