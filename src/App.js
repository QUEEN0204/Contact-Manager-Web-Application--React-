// import Navbar from './Components/Navbar';
// import Contacts from './Components/Contacts/Contacts';

import {Route , Routes , useNavigate , Navigate} from 'react-router';
import { useState ,useEffect} from 'react';


import{
  AddContact,
  Contacts,
  EditContact,
  ViewContact,
  Navbar
} from './Components';
import { ContactContext } from './context/contactContext';


import './App.css';
import {getAllContacts,GetAllGroups ,createContact , deletContact} from '../src/services/contactService';
import { confirmAlert } from 'react-confirm-alert';





const App =() => {

  const[loading,setLoading] = useState(false);
  const [query , setQuery] = useState([]);
  const [contact , setContact] = useState([]);
  const [contacts , setContacts] = useState([]);
  const [filteredContact , setFilteredContact] = useState([]);
  const [groups,setGroups] = useState([]);
  const[contactQuery , setContactQuery] =useState({
    fullName:"" ,
    photo:"" ,
    mobile:"",
    email:"",
    job:"",
    groups:""
  });

  const navigate= useNavigate();

  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        setLoading(true);

        const {data:contactsData} = await getAllContacts();
        const {data : groupsData} = await GetAllGroups();

        setContacts(contactsData);
        setFilteredContact(contactsData);
        setGroups(groupsData);

        setLoading(false);
      
      }
      catch(e){
        alert("Error!");
        console.log(e.message);
        setLoading(false);
      }

    }

    fetchData();
  },[]);



  


  const confirmDelet = ({contactId, contactFullName}) => {
    confirmAlert({
      customUI:({onClose})=>{
        return (
          <div className="confirm-alert-overlay">
            <div className="confirm-alert-container">
              <h4 className="confirm-alert-title">
                حذف مخاطب
              </h4>
              <h6 className="confirm-alert-message">
                آیا از حذف 
                <span> {contactFullName} </span>
                اطمینان دارید؟
              </h6>
              <div className="confirm-alert-actions">
                <button
                  className="confirm-alert-btn confirm-alert-delete-btn"
                  onClick={()=>{
                    removeContact(contactId);
                    onClose();
                  }}
                >
                  بله 
                </button>
                <button 
                  className="confirm-alert-btn confirm-alert-cancel-btn"
                  onClick={onClose}
                >
                  انصراف
                </button>
              </div>
            </div>
          </div>
        )
      }
    });
}

  const removeContact = async(contactId) =>{
    try{
      const response = await deletContact(contactId);
      if(response){
        setLoading(false);
        const {data:contactData} = await getAllContacts();

        setContacts(contactData);

        setLoading(false);
      }

    }
    catch(e){
      console.log(e.message);
      setLoading(false);
    }
  }
  

  const createContactForm= async (event) =>{
    event.preventDefault();
    const {status} = await createContact(contact);
    try{
      if (status === 201){
        setContact({
          fullName: "",
          photo: "",
          mobile: "",
          email: "",
          job: "",
          groups: ""
        }); //این فرم خالی ارسال میشه تا بعد ثبت موفق مخاطب داده قبلی در اینپوتها پاک شه
        navigate("/contacts");
        console.log(status.message);
        
      }
  }
  catch(e){
    console.log(e.message)
  }
}


  const onChangeContact = (event) =>{
    setContact({
    ...contact ,
    [event.target.name]: event.target.value});
  };


  const searchContacts = (event) =>{
    setContactQuery({...contactQuery , text: event.target.value});

    const allContacts = contacts.filter((contact)=>{
        return contact.fullName
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setFilteredContact(allContacts);
  };

  return (
    <ContactContext.Provider
        value={{
          loading,
          setLoading ,
          contact ,
          setContact ,
          contactQuery ,
          contacts ,
          filteredContact ,
          groups ,
          onChangeContact ,
          deletContact: confirmDelet,
          creatContact : createContactForm ,
          contactSearch: searchContacts
        }}>
          <div className="App">
        <Navbar />
          <Routes>
            <Route path='/' element={<Navigate to='/contacts'/>} />
            <Route path='/contacts'  element={ <Contacts/>} />
            <Route path='/contacts/add/' element={<AddContact />} />
            <Route path='/contacts/edit/:contactId' 
              element={<EditContact/>} />
            <Route path='/contacts/:contactId' element={<ViewContact />} />
          </Routes>
      </div>
    </ContactContext.Provider>
   
  );
};

export default App;