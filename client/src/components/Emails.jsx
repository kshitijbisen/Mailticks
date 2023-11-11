 
import { useOutletContext, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {Checkbox, Box, List, ListItem} from '@mui/material'
import { DeleteOutline, Padding } from "@mui/icons-material";
import { API_URLS } from "../services/api.urls";
import Email  from './Email' 
import useApi from "../hooks/useApi";
const Emails=()=>{
    const {type}=useParams();
    const {openDrawer}=useOutletContext();
    const getEmailsService = useApi(API_URLS.getEmailFromType);
    const [selectedEmails, setSelectedEmails]=useState([]);
    const[refreshScreen,setRefreshScreen]=useState(false);
    const moveEmailsToBinService=useApi(API_URLS.moveEmailsToBin);
    
    useEffect(() => {
        getEmailsService.call({}, type);
    }, [type,refreshScreen])

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
        <Box style={openDrawer ? {marginLeft:250, width:'calc(100%-250px)'} : {width:'100%'}}>
            <Box style={
                {padding:"20px 10px 0 10px",display:'flex', alignItems:'center'}
                }>
                <Checkbox size="small" onChange={(e)=>selectAllEmails(e)}/>
                <DeleteOutline onClick={(e)=> deletedSelectedEmails(e)

                }/>
                </Box>
                <List>
                    {
                   getEmailsService?.response?.map(email=>
                   (<Email 
                    key={email._id}
                    email={email}
                    selectedEmails={selectedEmails}
                    setRefreshScreen={setRefreshScreen}
                   />)
                   )
}
                </List>
            
        </Box>
    )
}

export default Emails;