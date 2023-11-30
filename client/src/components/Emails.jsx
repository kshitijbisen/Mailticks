import { useLocation, useOutletContext, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { Checkbox, Box, List } from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";
import { API_URLS } from "../services/api.urls";
import Email from "./Email";
import useApi from "../hooks/useApi";

const Emails = () => {
  const { type } = useParams();
  const moveEmailsToBin = useApi(API_URLS.moveEmailsToBin);
  const getEmailsService = useApi(API_URLS.getEmailFromType);
  const [selectedEmails, setSelectedEmails] = useState([]);
  const [refreshScreen, setRefreshScreen] = useState(false);
  const deleteEmailsService = useApi(API_URLS.deleteEmails);
  const getCategoryService = useApi(API_URLS.getCategory);
  const { openDrawer } = useOutletContext();

  useEffect(() => {
    getCategoryService?.call({});
  }, []);

  useEffect(() => {
    getEmailsService.call({}, type);
  }, [type, refreshScreen]);

  const location = useLocation();
  const currentLocation = location.pathname.split("/").pop();

  const AllEmails = getEmailsService?.response;
  let categorySet = new Set();
    AllEmails?.forEach((email) => {
        categorySet.add(email.category);
        });
    const categoryArray = Array.from(categorySet);
    console.log(categoryArray);
    localStorage.setItem("category", JSON.stringify(categoryArray));
  const [emailList, setEmailList] = useState(AllEmails);

  useEffect(() => {
    const filteredEmailList = currentLocation === "inbox" ||currentLocation === "allmail"||currentLocation === "bin"||currentLocation === "draft"||currentLocation === "starred" ||currentLocation === "sent"      ? getEmailsService?.response
      : getEmailsService?.response?.filter((email) => email.category === currentLocation);

    setEmailList(filteredEmailList);
  }, [currentLocation, getEmailsService?.response]);
  const selectAllEmails = (e) => {
    if (e.target.checked) {
        const emails = getEmailsService?.response?.map(email => email._id);
        setSelectedEmails(emails);
    } else {
        setSelectedEmails([]);
    }
}

const deleteSelectedEmails = () => {
    if (type === 'bin') {
        deleteEmailsService.call(selectedEmails);
    } else {
        moveEmailsToBin.call(selectedEmails);
    }
    setRefreshScreen(prevState => !prevState);
}
 

  
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
      {location && (
        <List>
          {emailList?.toReversed()?.map((email) => (
            <Email
              key={email._id}
              email={email}
              selectedEmails={selectedEmails}
              setSelectedEmails={setSelectedEmails}
              setRefreshScreen={setRefreshScreen}
              category={getCategoryService}
            />
          ))}
        </List>
      )}
    </Box>
  );
};

export default Emails;
