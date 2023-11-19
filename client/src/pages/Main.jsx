import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Suspense, useState } from "react";
import { Outlet } from "react-router-dom";
import SuspenseLoader from "../components/common/SuspenseLoader";
import { Box } from "@mui/material";

const Main = () =>{

    const [openDrawer, setOpenDrawer]=useState(true);

    const toggleDrawer = () => {
        setOpenDrawer(prevState => !prevState);
    }
    return(
        <Box style={{background:'#033431'}}>
        <Header toggleDrawer={toggleDrawer}/>
        <Box>
        <Sidebar openDrawer={openDrawer}/>
        <Suspense fallback={<SuspenseLoader/>}>
            <Outlet context={{openDrawer}}/>
        </Suspense>
        </Box>
        </Box>
    )
}
export default Main;