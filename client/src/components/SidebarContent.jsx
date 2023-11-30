import { Box ,Button,styled,List, ListItem, Divider, Typography} from "@mui/material";
import {CreateOutlined} from '@mui/icons-material';
import {SIDEBAR_DATA} from '../config/sidebar.config'
import ComposeMail from './ComposeMail';
import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { routes } from "../routes/routes";
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";

const ComposeButton=styled(Button)({
background:'#70f6bb',
color:'#001d35',
padding:15,
borderRadius:16,
minwidth:140,
width:140,
marginLeft:10,
marginTop:10,
textTransform:'none'
})
const Container=styled(Box)(
    {
        paddingLeft:8,
        '& > ul':{
            padding:'10px 0 0 5px',
            fontSize:14,
            fontWeight:500,
            cursor:'pointer',
            marginLeft:5,
            marginRight:5,
            '&>a':{
                textDecoration:'none',
                color:'inherit'
            }
        },

        '&>ul>a>li>svg':{
            marginRight:20
        }

    }
)



const SidebarContent=()=>{
    const {type}=useParams();
    const [openDialog,setOpenDialog]=useState(false);
    const OnComposeClick=()=>{
    setOpenDialog(true);
    }
    const getCategoryService = useApi(API_URLS.getCategory);

    useEffect(() => {
        getCategoryService.call({});
      }, []);
    
        
        const categoryData = getCategoryService?.response

    return(
        <Container>
        <ComposeButton onClick={()=>OnComposeClick()}>
                <CreateOutlined/>
                Compose
            </ComposeButton>
           <List>
            {
                SIDEBAR_DATA.map(data=>(
                    <NavLink key={data.name} to={`${routes.emails.path}/${data.name}`}>
                        <ListItem style={ type===data.name.toLowerCase()?{backgroundColor:'#033431', color:"#FFFFFF",borderRadius:'0px 16px 16px 0px'}:{color:"#FFFFFF"}}>
                           <data.icon fontSize="small"/> {data.title}
                        </ListItem>
                    </NavLink>
                    )
                )
            }
            <Divider/>
            <Typography variant="h6" style={{color:"#FFFFFF",paddingLeft:5,marginTop:10,fontWeight:500}}>Categories</Typography>
            {categoryData?.map((category) => (
                <NavLink key={category.category} to={`${routes.emails.path}/inbox/${category.category}`}>
                        <ListItem style={ type===category.category?{backgroundColor:'#033431', color:"#FFFFFF",borderRadius:'0px 16px 16px 0px', 'padding': '10px 15px'}:{color:"#FFFFFF"}}>
                           <CreateOutlined fontSize="small"/> {category.category}
                        </ListItem>
                    </NavLink>
            ))}
           </List>
           <ComposeMail openDialog={openDialog} setOpenDialog={setOpenDialog}/>
        </Container>
    )
}
export default SidebarContent;