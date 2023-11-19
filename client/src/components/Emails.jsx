 
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {Checkbox, Box, List, ListItem} from '@mui/material'
import { DeleteOutline, Padding } from "@mui/icons-material";
import { API_URLS } from "../services/api.urls";
import Email  from './Email' 
import useApi from "../hooks/useApi";
const Emails=()=>{
    const {type}=useParams();
    console.log(type)
    const {openDrawer}=useOutletContext();
    const getEmailsService = useApi(API_URLS.getEmailFromType);
    const [selectedEmails, setSelectedEmails]=useState([]);
    const[refreshScreen,setRefreshScreen]=useState(false);
    const moveEmailsToBinService=useApi(API_URLS.moveEmailsToBin);
    const getCategoryService=useApi(API_URLS.getCategory);
    // const[color,setColor]=useState("");
    useEffect(() => {
        getCategoryService.call({});
    }, [])
    useEffect(() => {
        getEmailsService.call({}, type);
    }, [type,refreshScreen])
    // const categoryInfo = getCategoryService?.response?.find(item => item.category === email.category);
    // setColor(categoryInfo?.color);
    
    const selectAllEmails=(e)=>{
        if(e.target.checked){
            const emails= getEmailsService?.response?.map(email=>email._id);
            setSelectedEmails(emails);
        }else{
            setSelectedEmails([]);
        }
    }
    const deletedSelectedEmails=(e)=>{
        if(type==="bin"){

        }
        else{
            moveEmailsToBinService.call(selectedEmails);
        }
    setRefreshScreen(prevState=>!prevState)

    }
    return (
        <Box style={openDrawer ? {marginLeft:250,width:'calc(100%-250px)',background:'#001f2a',borderStyle:'solid',
        borderLeft:0,
        borderTop:'500',
        borderRight:0,
        borderBottom:0,
        borderColor:'#00658e'} : {width:'100%',background:'#001f2a',borderStyle:'solid', borderLeft:0,
        borderTop:'500',
        borderRight:0,
        borderBottom:0,
        borderColor:'#00658e'}}>
            <Box style={
                {padding:"20px 10px 0 10px",display:'flex', alignItems:'center'}
                }>
                <Checkbox size="small" style={{color:"#FFFFFF"}} onChange={(e)=>selectAllEmails(e)}/>
                <DeleteOutline style={{color:"#FFFFFF"}} onClick={(e)=> deletedSelectedEmails(e)}/>
                </Box>
                <List>
                    {
                   getEmailsService?.response?.map(email=>
                   (<Email 
                    key={email._id}
                    email={email}
                    selectedEmails={selectedEmails}
                    setRefreshScreen={setRefreshScreen}
                    category={getCategoryService}
                   />)
                   )
}
                </List>
            
        </Box>
    )
}

export default Emails;