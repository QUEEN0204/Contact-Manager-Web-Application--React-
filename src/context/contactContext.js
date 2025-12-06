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
    onChangeContact : ()=>{} ,
    deletContact : ()=>{} ,
    updateContact : ()=>{} ,
    creatContact : ()=>{} ,
    contactSearch : ()=>{} , 
});