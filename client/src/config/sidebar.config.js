import {Photo,StarBorderOutlined,SendOutlined, InsertDriveFileOutlined, DeleteOutlined, MailOutline,Dashboard} from '@mui/icons-material'
export const SIDEBAR_DATA=[
    {
        name:'inbox',
        title:'Inbox',
        icon:Photo
    },
    {
        name:'starred',
        title:'Starred',
        icon:StarBorderOutlined
    },
    {
        name:'sent',
        title:'Sent',
        icon:SendOutlined
    },
    {
        name:'draft',
        title:'Draft',
        icon:InsertDriveFileOutlined
    },
    {
        name:'bin',
        title:'Bin',
        icon:DeleteOutlined
    },
    {
        name:'allmail',
        title:'All Mail',
        icon:MailOutline
    }
]