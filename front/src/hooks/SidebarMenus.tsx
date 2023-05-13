import InboxIcon from '@mui/icons-material/MoveToInbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import React, { useState } from 'react'
import { Menu } from 'interface/Menu'
import { blueGrey } from '@mui/material/colors'

const SidebarMenus = () => {
  const [menus] = useState<Menu[]>([
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
    {
      name: '設定',
      path: '/home/setting',
      icon: (
        <DraftsIcon
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
