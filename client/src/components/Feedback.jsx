import { Box, Button, Typography,FormControl,InputLabel,Select,MenuItem,styled,Divider} from "@mui/material";
import { useEffect, useState } from "react";
import { API_URLS } from "../services/api.urls";
import useApi from "../hooks/useApi";
const Wrapper=styled(Box)({
    display:'flex',
    background:'#00658e',
    justifyContent:'center',
    width:'100%',
    padding:'5px',
    paddingRight:'10px'
})
const Feedback = ({email}) => {
    const [feedback, setFeedback] = useState(false);
    const [label,setLabel]=useState("");
    const [ShowCategory,setShowCatgory]=useState(false);
    const getCategoryService=useApi(API_URLS.getCategory);
    const updateLabel=useApi(API_URLS.updateLabel);
    const savefeedback=useApi(API_URLS.savefeedback);
    useEffect(() => {
        getCategoryService.call({});
    }, [])
    const handleChange=(e)=>{
        updateLabel.call({id:email._id,value:e.target.value});
        const payload={
            mail:email.body,
            category:e.target.value
        }
        savefeedback.call(payload)
        setFeedback(true);
        setShowCatgory(false);
    }
    return (
        <Wrapper> {
            feedback === false ? <Box  style={{ display:'flex',gap:'20px' }}>
                <Typography>Is the Displayed label Correct?</Typography>
                <Divider/>
                <Button style={{ background: "green", color: "black" }} onClick={() => setFeedback(true)}>Yes</Button>
                <Button style={{ background: "red", color: "black" }}onClick={()=>{setShowCatgory(true);setFeedback(true)}}>No</Button>
            </Box> : <></>
        }
        {
            ShowCategory?
            <FormControl fullWidth >
            <InputLabel id="demo-simple-select-label" style={{color:'#FFFFFF',padding:'2px'}}>Select Category</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={label}
                label="Category"
                onChange={handleChange}
            >
               {getCategoryService?.response?.map((c) => (
  <MenuItem key={c.category} value={c.category}>
    {`${c.category}`}
  </MenuItem>
))}
            </Select>
        </FormControl>:<></>
        }
        </Wrapper>
    )
}
export default Feedback;