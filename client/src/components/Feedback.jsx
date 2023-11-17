import { Box, Button, Typography, colors } from "@mui/material";

const Feedback=()=>{
    return(
        <Box>
            <Typography>Is the Displayed label Correct?</Typography>
            <Button style={{background:"green",color:"black"}}>Yes</Button>
            <Button style={{background:"red",color:"black"}}>No</Button>
            
        </Box>
    )
}
export default Feedback;