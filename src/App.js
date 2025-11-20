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
import './App.css';
import {getAllContacts,GetAllGroups ,createContact , deletContact} from '../src/services/contactService';
import { confirmAlert } from 'react-confirm-alert';





const App =() => {

  const[getLoading,setLoading] = useState(false);
  const[forceRender, setForceRender]= useState(false);
  const [query , setQuery] = useState([]);
  const [getContacts , setContacts] = useState([]);
  const [getGroups,setGroups] = useState([]);
  const[getContact , setContact] =useState({
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



  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        setLoading(true);
        const {data:contactsData} = await getAllContacts();
        setContacts(contactsData);
        
        setLoading(false);
      }
      catch(e){
        alert("Error!");
        console.log(e.message);
        setLoading(false);
      }

    }

    fetchData();

  },[forceRender]);


  const confirm = ({contactId, contactFullName}) => {
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
    const {status} = await createContact(getContact);
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
        setForceRender(!forceRender);
        console.log(status.message);
        
      }
  }
  catch(e){
    console.log(e.message)
  }
}


  const setContactInfo = (event) =>{
    setContact({
    ...getContact ,
    [event.target.name]: event.target.value});
  };


  const searchContacts = (event) =>{
    setQuery({...query , text: event.target.value});

    const allContacts = getAllContacts.filter((contact)=>{
        return contact.fullName
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
  };

  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to='/contacts'/>} />
          <Route path='/contacts'  element={
            <Contacts
             loading={getLoading}
            contacts={getContacts}
            confirmDelet={confirm}
           
               />} />
          <Route path='/contacts/add/' element={<AddContact 
          loading={getLoading} 
          setContactInfo={setContactInfo}
          contact={getContact}
          groups={getGroups}
          createContactForm={createContactForm}

          />} />
          <Route path='/contacts/edit/:contactId' 
          element={
          <EditContact
            forceRender={forceRender}
            setForceRender={setForceRender}
          />} />
          <Route path='/contacts/:contactId' element={<ViewContact />} />
        </Routes>
    </div>
  );
};

export default App;