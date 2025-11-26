import { createContext } from "react";

export const ContactContext = createContext({
    loading : false , 
    setLoading : ()=>{} ,
    contact : {} ,
    setContact : ()=>{} ,
    contacts : [] ,
    filteredContact : [] ,
    contactQuery : {} ,
    groups : [] ,
    onChangeContact : ()=>{} ,
    deletContact : ()=>{} ,
    updateContact : ()=>{} ,
    creatContact : ()=>{} ,
    contactSearch : ()=>{} , 
});