import { Box, Typography, styled } from "@mui/material";
import { useOutletContext, useLocation } from "react-router-dom";
import { ArrowBack, Delete } from "@mui/icons-material";
import { emptyProfilePic } from '../constants/constant';
import useApi from "../hooks/useApi";
import { API_URLS } from "../services/api.urls";
const IconWrapper = styled(Box)({
    padding: 15,


})
const Container = styled(Box)({
    marginLeft: 15,
    width:'100%',
    '&>div':{
        display: 'flex',
        '&>p>span': {
            fontSize: 12,
            color: '#5E5E5E'
        }
    }

})
const Date = styled(Box)({
    margin: "0 50px 0 auto",
    color: '#5E5E5E',

})

const Subject = styled(Typography)({
    fontSize: 22,
    margin: "10px 0 20px 75px",
    display: "flex"
})
const Indicator = styled(Box)({
    background: "#ddd",
    color: "#222",
    fontSize: 12,
    padding: "2px 4px",
    marginLeft: 6,
    borderRadius: 4,
    alignSelf: "center"
})
const Image=styled('img')({
    borderRadius:'50%',
    width:40,
    height:40,
    margin: "5px 10px 0px 5px",
    background:"#cccccc"
})
const ViewEmail = () => {
    const { openDrawer } = useOutletContext();
    const { state } = useLocation();
    const { email } = state;
    const moveEmailsToBinService=useApi(API_URLS.moveEmailsToBin);
    const deleteEmail=()=>{
        moveEmailsToBinService.call([email._id]);
        window.history.back();
    }
    return (
        <Box style={openDrawer ? { marginLeft: 250 } : { width: '100%' }}>

            <IconWrapper>
                <ArrowBack onClick={() => window.history.back()} color="action" fontSize="small" />
                <Delete color="action" fontSize="small" style={{ marginLeft: "40px" }} onClick={()=>deleteEmail()}/>
            </IconWrapper>


            <Subject>
                {email.subject} <Indicator component="span">Inbox/Label</Indicator>
            </Subject>


            <Box style={{ display:"flex"}}>
                <Image src={emptyProfilePic} alt="profile" />


                <Container >

                    <Box>

                        <Typography style={{ marginTop:11}}>{email.name}
                            <Box component="span">
                                &nbsp;&#60;{email.to}&#62;
                            </Box>
                        </Typography>

                        <Date>
                            {new window.Date(email.date).getDate()}&nbsp;
                            {new window.Date(email.date).toLocaleDateString('default', { month: 'long' })}&nbsp;
                            {new window.Date(email.date).getFullYear()}
                        </Date>

                    </Box>
                    <Typography style={{marginTop : 20}}>{email.body}</Typography>

                </Container>


            </Box>



        </Box>

    )
}

export default ViewEmail;