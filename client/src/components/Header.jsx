import {AppBar, Toolbar, styled,InputBase,Box,Button} from '@mui/material';
import {Menu as MenuIcon,Tune, Search, HelpOutlineOutlined,SettingsOutlined,AppsOutlined,AccountCircleOutlined,AddCircleOutline} from '@mui/icons-material';
import { API_URLS } from "../services/api.urls";
import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import shadows from '@mui/material/styles/shadows';
import logo from '../constants/logo_mailtics.png';
import CreateCategory from './CreateCategory';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {routes} from '../routes/routes'
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
    const getEmailsService = useApi(API_URLS.getEmailFromType);
    const [openCreteCategory,setOpenCreteCategory]=useState(false);
    const OnComposeClick=(e)=>{
        e.preventDefault();
        setOpenCreteCategory(true);
        console.log("hello")
    }

    useEffect(() => {
        getEmailsService.call({}, 'inbox');
    }, [])

    const [searchData,setSearchData]=useState({});
    const [searchResponse,setSearchResponse]=useState([]);
    const onValueChange=(e)=>{
        setSearchData({...searchData,[e.target.name]:e.target.value});
     }
    const navigate=useNavigate();
     const onSearchSubmit=async(e)=>{
        
        const bodiesOnly = getEmailsService?.response?.map(email => email.body);
        const idOnly = getEmailsService?.response?.map(email => email._id);
        console.log(bodiesOnly)
        try {
            const options = {
                method: 'POST',
                url: 'https://api.cohere.ai/v1/rerank',
                headers: {
                  accept: 'application/json',
                  'content-type': 'application/json',
                  authorization: 'Bearer qmbakF4ktFODP3sajXeCbqUGZv2IjspPLoda4Z2X'
                },
                data: {
                  return_documents: false,
                  max_chunks_per_doc: 10,
                  model: 'rerank-english-v2.0',
                  query: searchData.search,
                  documents:bodiesOnly
                }
              };
              axios
              .request(options)
              .then(function (response) {
                function sortByIndices(objectsArray, indicesArray) {
                    return indicesArray.map(index => objectsArray[index]);
                  }
                  const indexArray=response.data['results'].map(email=>email.index)
                 
                  const sortedObjects = sortByIndices(idOnly, indexArray);
               
                setSearchResponse(sortedObjects)
                console.log(searchResponse)
                window.localStorage.setItem("myObject", JSON.stringify(searchResponse));
                setTimeout(()=>{navigate(routes.search.path)})
              })
              .catch(function (error) {
                console.error(error);
              });
          } catch (error) {
            console.error('Error in search:', error);
          }
     }
     console.log(searchResponse)
    
    return(
        <StyledAppBar position='sticky' elevation={0}>
                <Toolbar>
                    <MenuIcon color='action' style={{color:"#FFFFFF"}} onClick={toggleDrawer}/>
                    <img src={logo} alt="MAILTICKS" style={{width:190 , marginLeft:15,marginTop:0}}/>
                    <SearchWrapper>
                        <Search color='action'/>
                        <InputBase placeholder='Search Mail' name='search' onChange={(e)=>onValueChange(e)} onMouseLeave={(e)=>onSearchSubmit(e)}/>
                        <Tune color='action'/>
                      
                    </SearchWrapper>
                    <OptionsWrapper>
                        {/* <HelpOutlineOutlined color='action'/> */}
                        <AddCircleOutline style={{color:"#FFFFFF"}} color='action' onClick={(e)=>OnComposeClick(e)}/>
                        {/* <AppsOutlined color='action'/>
                        <AccountCircleOutlined color='action'/> */}
                    </OptionsWrapper>
                </Toolbar>
                <CreateCategory openCreateCategory={openCreteCategory} setOpenCreateCategory={setOpenCreteCategory}/>
            </StyledAppBar>

    )
}
export default Header;