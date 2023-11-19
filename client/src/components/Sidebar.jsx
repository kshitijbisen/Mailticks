import { Margin } from '@mui/icons-material';
import {Drawer,styled} from '@mui/material'
import SidebarContent from './SidebarContent';

const Sidebar=( { openDrawer } )=>{
    return(
           <Drawer  anchor='left' 
           open={ openDrawer }  
           hideBackdrop={true} 
           ModalProps={{
            keepMounted:true
           }}
           variant='persistent'
           sx={{
            '& .MuiDrawer-paper':{
                marginTop: '64px',
                width: '250px',
                background:'#102732',
                borderRight:'none',
                height:'calc(100vh-64px)',
                borderStyle:'solid',
                borderLeft:0,
                borderBottom:0,
                borderTop:0,
                borderRight:"10px",
                borderColor:'#00658e'
            }
           }}
           >
           <SidebarContent/>
           </Drawer>
    )
}
export default Sidebar;