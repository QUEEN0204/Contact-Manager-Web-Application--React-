import { createContext } from "react";

export const ContactContext = createContext({
    loading : false , 
    setLoading : ()=>{} ,
    contact : {} ,
    setContact : ()=>{} ,
    contacts : [] ,
    filteredContacts : [] ,
    contactQuery : {} ,
    groups : [] ,
    onChangeContact : ()=>{} ,
    deletContact : ()=>{} ,
    updateContact : ()=>{} ,
    creatContact : ()=>{} ,
    contactSearch : ()=>{} , 
});