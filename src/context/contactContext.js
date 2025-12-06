import { createContext } from "react";

export const ContactContext = createContext({
    loading : false , 
    setLoading : ()=>{} ,
    contact : {} ,
    setContact : ()=>{} ,
    contacts : [] ,
    setFilteredContacts : () =>{} ,
    filteredContact : [] ,
    groups : [] ,
    errors : [] ,
    onChangeContact : ()=>{} ,
    deletContact : ()=>{} ,
    updateContact : ()=>{} ,
    creatContact : ()=>{} ,
    contactSearch : ()=>{} , 
});