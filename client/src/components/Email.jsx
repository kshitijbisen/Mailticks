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
    background:'#001f2a',
    color:'#FFFFFF',
    border:0.2,
    borderBottom:0.1,
    borderStyle: 'solid',
    borderColor: '#00658e',
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
    color:'#FFFFFF'
    
})
const Email=({email, selectedEmails,setSelectedEmails,setRefreshScreen,category})=>{
    const  navigate=useNavigate();
    const toggleStarredService=useApi(API_URLS.toggleStarredEmails);
    const categoryArray = category?.response || [];
    const categoryInfo = categoryArray.find(item => item.category === email.category);
    
    const handleChange = () => {
        if (selectedEmails.includes(email._id)) {
            setSelectedEmails(prevState => prevState.filter(id => id !== email._id));
        } else {
            setSelectedEmails(prevState => [...prevState, email._id]);
        }
    }
    const toggleStarredMails=()=>{
        toggleStarredService.call({id:email._id,value:!email.starred})
        setRefreshScreen(prevState=>!prevState);
    }
    return(
        <Wrapper>
            <Checkbox size='small' style={{color:"#FFFFFF"}}
            checked={selectedEmails.includes(email._id)}
            onChange={() => handleChange()} />
            {
                email.starred?
                    <Star fontSize='small' style={{marginRight:10,color:"#FFF200"}}  onClick={()=>toggleStarredMails()}/> :
                    <StarBorder size='small' style={{marginRight:10}} onClick={()=>toggleStarredMails()}/>
            }
            {/* color={col?col:"#"} */}
            <Box onClick={()=>navigate(routes.view.path,{state:{email:email}})}>
            <Typography style={{width:'300px', overflow:'hidden'}}>{email.name}</Typography>
            {/* <Indicator>inbox</Indicator> */}
            <Typography noWrap style={{width:'400px', overflow:'hidden'}}>{email.subject} {email.body && '-'} {email.body}</Typography>
            {
            email?.type==='inbox'?
            <Chip label={email.category} style={{background:categoryInfo.color||'#FFFFFF', minWidth:'100px',marginLeft:'100px'}}/>:<></>
            }       
        
            <Date>{new window.Date(email.Date).getDate()} {new window.Date(email.Date).toLocaleDateString('default', {month:'long'})}</Date>
            </Box>
        </Wrapper>
    )
}
export default Email;