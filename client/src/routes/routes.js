import { lazy } from "react";
const Emails=lazy(()=>import("../components/Emails"));
const Main=lazy(()=> import("../pages/Main"));
const ViewEmail =lazy(()=>import("../components/ViewEmail"))
const Search =lazy(()=>import("../components/Search"))
const routes={
    main:{
        path:'/',
        element:Main
    },
    emails:{
        path:'/emails',
        element:Emails
    },
    view:{
        path:'/view',
        element:ViewEmail
    },
    search:{
        path:'/search',
        element:Search
    },
    invalid:{
        path:'/*',
        element:Emails
    }
    
}
export {routes};