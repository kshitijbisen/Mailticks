import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Checkbox, Box, List } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { API_URLS } from "../services/api.urls";
import Email from "./Email";
import useApi from "../hooks/useApi";

const Search = () => {
  const { type } = useParams();
  const getEmailsService = useApi(API_URLS.getEmailFromType);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [refreshScreen, setRefreshScreen] = useState(false);
  const moveEmailsToBinService = useApi(API_URLS.moveEmailsToBin);
  const getCategoryService = useApi(API_URLS.getCategory);
  const { openDrawer } = useOutletContext();

  useEffect(() => {
    getCategoryService.call({});
  }, []);

  useEffect(() => {
    getEmailsService.call({},'inbox');
  }, [type, refreshScreen]);

    const allmail=getEmailsService?.response
    const ids=JSON.parse(localStorage.getItem('myObject'))
   console.log("All Mails")
   console.log(allmail)
   console.log(ids)

    const sortByName=(objectsArray, namesArray)=> {
        return namesArray.map(name => objectsArray.find(obj => obj._id === name));
      }
      
     
      const sortedObjects = sortByName(allmail, ids);
      console.log(sortedObjects)



  const selectAllEmails = (e) => {
    const emails = getEmailsService?.response?.map((email) => email._id);
    setSelectedEmails(emails);
  };

  const deleteSelectedEmails = () => {
    if (type !== "bin") {
      moveEmailsToBinService.call(selectedEmails);
      setRefreshScreen((prevState) => !prevState);
    }
  };

  return (
    <Box
       style={
        openDrawer
          ? {
              marginLeft: 250,
              width: "calc(100%-250px)",
              background: "#001f2a",
              borderStyle: "solid",
              borderLeft: 0,
              borderTop: "500",
              borderRight: 0,
              borderBottom: 0,
              borderColor: "#00658e",
            }
          : {
              width: "100%",
              background: "#001f2a",
              borderStyle: "solid",
              borderLeft: 0,
              borderTop: "500",
              borderRight: 0,
              borderBottom: 0,
              borderColor: "#00658e",
            }
      }
    >
      <Box
        style={{
          padding: "20px 10px 0 10px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Checkbox
          size="small"
          style={{ color: "#FFFFFF" }}
          onChange={(e) => selectAllEmails(e)}
        />
        <DeleteOutline
          style={{ color: "#FFFFFF" }}
          onClick={(e) => deleteSelectedEmails(e)}
        />
      </Box>
      
        <List>
          {sortedObjects?.map((email) => (
            <Email
              key={email._id}
              email={email}
              selectedEmails={selectedEmails}
              setRefreshScreen={setRefreshScreen}
              category={getCategoryService}
            />
          ))}
        </List>
   
    </Box>
  );
};

export default Search;
