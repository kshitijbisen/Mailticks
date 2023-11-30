import { Dialog, Button,Box,styled,Typography,TextField,MenuItem,FormControl,InputLabel,Select } from "@mui/material"
import { Close } from "@mui/icons-material"
import { useState } from "react"
import useApi from "../hooks/useApi"
import { API_URLS } from "../services/api.urls"
const Header=styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    padding:'10px 15px',
    background:'#f2f6fc',
    '$>p':{
       fontSize:14,
       fontWeight:500,
    }
  })
  const dialogStyle={
    height:'60%',
    width:'50%',
    maxWidth:'100%',
    maxHeight:'100%',
    boxShadow:'none',
    // padding:'10%',
    borderRadius:'10px'
 }

  const Footer=styled(Box)({
    display:'flex',
    justifyContent:'space-between',
    padding:'10px 15px',
    alignItems:'center'
 })
 
 
 const SendButton=styled(Button)({
    background:'#0B57D0',
    color:'#fff',
    fontWeight:500,
    textTransform:'none',
    borderRadius:'18px',
    width:'100px',
    // marginRight:'0',
    marginLeft:'auto'
 })
 
const CreateCategory=({openCreateCategory,setOpenCreateCategory})=>{
    const [color, setColor] = useState('');
    const [categoryData,setCategoryData]=useState({});
    const createCategory=useApi(API_URLS.createcategory);
    const closeCreteCategory=(e)=>{
        setOpenCreateCategory(false);
    }
    const colorOptions = [
        { value: '#3498db', label: 'Blue' },
        { value: '#2ecc71', label: 'Green' },
        { value: '#e74c3c', label: 'Red' },
        { value: '#f39c12', label: 'Orange' },
        { value: '#9b59b6', label: 'Purple' },
        { value: '#f1c40f', label: 'Yellow' },
        { value: '#1abc9c', label: 'Turquoise' },
        { value: '#e67e22', label: 'Caramel' },
        { value: '#7f8c8d', label: 'Gray' },
        { value: '#2c3e50', label: 'Charcoal' },
      ];
    const handleChange=(e)=>{
        setColor(e.target.value)
    }

    const saveCategory=(e)=>{
        e.preventDefault();
        const payload={
            category:categoryData.category,
            color:color,
            description:categoryData.description
        }
     createCategory.call(payload);
     setOpenCreateCategory(false);
     
  }
  const onValueChange=(e)=>{
    setCategoryData({...categoryData,[e.target.name]:e.target.value});
 }

    return(
        <Dialog open={openCreateCategory} PaperProps={{sx:dialogStyle}}>
             <Header>
            <Typography>Crete Category</Typography>
            <Close fontSize='small' onClick={(e)=>closeCreteCategory(e)}/>
        </Header>
        <Box style={{display:'grid',gap:'20px',padding:'20px'}}>
        <TextField id="standard-basic" label="Create Valid Category" variant="standard" size="small" name='category' onChange={(e)=>onValueChange(e)} />
        <TextField
            multiline
            placeholder='Add Description for the category'
            rows={3}
            name='description'
            onChange={(e)=>onValueChange(e)}
            />
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Choose Color</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={color}
                label="Color"
                onChange={handleChange}
            >
                 {colorOptions.map((color) => (
        <MenuItem key={color.value} value={color.value} style={{ color: color.value }}>
          {color.label}
        </MenuItem>
      ))}
      
               
            </Select>
        </FormControl>
        </Box>
        <Footer>
               <SendButton onClick={(e)=>saveCategory(e)}>ADD</SendButton>
            </Footer>
        </Dialog>
    )
}
export default CreateCategory