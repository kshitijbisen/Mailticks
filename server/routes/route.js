import express from 'express';
import { saveSentEmails, getEmails,moveEmailsToBin,toggleStarredEmails,createcategory,getCategory, updateEmailLabel,savefeedback} from '../controller/email-controller.js';

const routes=express.Router();
routes.post('/save',saveSentEmails)
routes.get('/emails/:type',getEmails)
routes.post('/save-draft',saveSentEmails)
routes.post('/bin',moveEmailsToBin)
routes.post('/starred',toggleStarredEmails)
routes.get('/getcategory',getCategory)
routes.post('/createcategory',createcategory)
routes.post('/updatelabel',updateEmailLabel)
routes.post('/savefeedback',savefeedback)

export default routes;
