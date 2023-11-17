import {Box, Typography, Checkbox, Chip} from '@mui/material'
import {Star, StarBorder} from '@mui/icons-material'
import styled from '@emotion/styled'
import { useNavigate } from "react-router-dom";
import {routes} from '../routes/routes'
import useApi from '../hooks/useApi';
import { API_URLS } from '../services/api.urls';
const Wrapper=styled(Box)({
    display:'flex',
    padding:'0 0 0 10px',
    background:'#f2f6fc',
    cursor:'pointer',
    alignItems:'center',
    '&>div':{
        display:'flex',
        width:'100%',
        '&>p':{
            fontSize:'14px'
        }
    }
})
const Indicator=styled(Typography)({
    background:'#ddd',
    fontSize:'12px !important',
    color:'#222',
    padding:'0 4px',
    borderRadius:4,
    marginRight: '6px'
})
const Date=styled(Typography)({
    marginLeft:'auto',
    marginRight:'20px',
    fontSize:'12px',
    color:'#5F6368'
})
const Email=({email, selectedEmails,setRefreshScreen,getCategoryService})=>{
    const  navigate=useNavigate();
    const toggleStarredService=useApi(API_URLS.toggleStarredEmails);
    
    const toggleStarredMails=()=>{
        toggleStarredService.call({id:email._id,value:!email.starred})
        setRefreshScreen(prevState=>!prevState);
    }
    return(
        <Wrapper>
            <Checkbox size='small' 
            checked={selectedEmails.includes(email._id)}/>
            {
                email.starred?
                    <Star fontSize='small' style={{marginRight:10,color:"#FFF200"}}  onClick={()=>toggleStarredMails()}/> :
                    <StarBorder size='small' style={{marginRight:10}} onClick={()=>toggleStarredMails()}/>
            }
            
            <Box onClick={()=>navigate(routes.view.path,{state:{email:email}})}>
            <Typography style={{width:'300px', overflow:'hidden'}}>{email.name}</Typography>
            <Indicator>inbox</Indicator>
            <Typography noWrap style={{width:'300px', overflow:'hidden'}}>{email.subject} {email.body && '-'} {email.body}</Typography>
            {
            email?.type==='inbox'?
            <Chip label={email.category} />:<></>
            }       
            <Date>{new window.Date(email.date).getDate()} {new window.Date(email.date).toLocaleDateString('default', {month:'long'})}</Date>
            </Box>
        </Wrapper>
    )
}
export default Email;