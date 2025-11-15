import axios from "axios";

const SERVER_URL='http://localhost:9000';


//Get contacts from server
export const getAllContacts = () =>{
    const url = `${SERVER_URL}/contacts`;
    return axios.get(url);
};

//Get Groups  from server
export const GetAllGroups = () =>{
    const url = `${SERVER_URL}/groups`;
    return axios.get(url);
};

//Get Group from server
export const getGroup = (groupId)=>{
    const url = `${SERVER_URL}/groups/${groupId}`;
    return axios.get(url);
};

//Create Contact
export const createContact = (contact)=>{
    const url = `${SERVER_URL}/contacts`;
    return axios.post(url,contact);
}

//Edit contact
export const updateContact =(contact,contactId)=>{
    const url = `${SERVER_URL}/contacts/${contactId}`;
    return axios.put(url,contact);
}

//Delet contact
export const deletContact=(contactId)=>{
    const url =`${SERVER_URL}/contacts/${contactId}`;
    return axios.delete(url,contactId);
}

