import {AppBar, Toolbar, styled,InputBase,Box} from '@mui/material';
import {Menu as MenuIcon,Tune, Search, HelpOutlineOutlined,SettingsOutlined,AppsOutlined,AccountCircleOutlined} from '@mui/icons-material';
import { useState } from 'react';

import shadows from '@mui/material/styles/shadows';
import logo from '../constants/logo_mailtics.png';
import CreateCategory from './CreateCategory';
const StyledAppBar=styled(AppBar)(
    {
        background:'#001f2a',
    }
)
const SearchWrapper=styled(Box)(
    {
        background:'#edf0f3',
        marginLeft:80,
        marginTop:10,
        borderRadius:8,
        minWidth:650,
        maxWidth:700,
        height:44,
        display:'flex',
        alignItems:'center',
    
        justifyContent:'space-between',
        padding: '0 20px',
        '& > div':{
            width:'100%',
            padding:'0 10px'
        }
        
    }
)
const OptionsWrapper=styled(Box)(
    {
        width:'100%',
        display:'flex',
        justifyContent:'end',
        '& > svg':{
            marginLeft:'20px'
        }

    })
const Header = ({ toggleDrawer }) =>{
    const [openCreteCategory,setOpenCreteCategory]=useState(false);
    const OnComposeClick=(e)=>{
        e.preventDefault();
        setOpenCreteCategory(true);
        console.log("hello")
    }
    return(
        <StyledAppBar position='sticky' elevation={0}>
                <Toolbar>
                    <MenuIcon color='action' style={{color:"#FFFFFF"}} onClick={toggleDrawer}/>
                    <img src={logo} alt="MAILTICKS" style={{width:190 , marginLeft:15,marginTop:0}}/>
                    <SearchWrapper>
                        <Search color='action'/>
                        <InputBase placeholder='Search Mail'/>
                        <Tune color='action'/>
                    </SearchWrapper>
                    <OptionsWrapper>
                        {/* <HelpOutlineOutlined color='action'/> */}
                        <SettingsOutlined style={{color:"#FFFFFF"}} color='action' onClick={(e)=>OnComposeClick(e)}/>
                        {/* <AppsOutlined color='action'/>
                        <AccountCircleOutlined color='action'/> */}
                    </OptionsWrapper>
                </Toolbar>
                <CreateCategory openCreateCategory={openCreteCategory} setOpenCreateCategory={setOpenCreteCategory}/>
            </StyledAppBar>

    )
}
export default Header;