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
import {getAllContacts,GetAllGroups ,createContact ,deletContact } from '../src/services/contactService';
import { confirmAlert } from 'react-confirm-alert';





const App =() => {

  const[loading,setLoading] = useState(false);
  const [query , setQuery] = useState([]);
  const [contact , setContact] = useState({
    fullName: "",
    photo: "",
    mobile: "",
    email: "",
    job: "",
    group: "" 
  });
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

    console.log('useEffect 😎');


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

 /*
     * NOTE
     * 1- forceRender -> setForceRender
     * 2- Server Request
     * 3- Delete Local State
     * 4- Delete State Before Server Request
     * در روش 4 قبل اینکه ب سرور درخواست بدیم از محلیها پاک میکنیم
     * 
     */

  const removeContact = async(contactId) =>{
    const allContacts = [...contacts];
    try{
      const updatedContact = contacts.filter(c =>c.id !== contactId);
      

      setContacts(updatedContact);
      setFilteredContact(updatedContact);

      // Sending delete request to server
      const { status } = await deletContact(contactId);

      if (status !== 200) {
        setContacts(allContacts);
        setFilteredContact(allContacts);
      }
    }
    catch(e){
      console.log(e.message);

      setContacts(allContacts);
      setFilteredContact(allContacts);
    }
  }
  
  // نکته:
  // ما دو روش داشتیم ک مخاطب جدید میسازیم بیاد تو مخاطببا و قابل دیدن باشه بدون رفرش:
  // 1. راه اول ریرندر کردن بود ک با فورس رندر و ست فورس رندر کارمیکرد اما حرفه ای نبود:
  // (rerender) => forceRender=> setForceRender
  // 2. ما حالا ی راه بهتر داریم همراه استاتوس دیتا روهم به کریت کانتکت میدیم و همه رو میریزیم تو ی ارایه کچون نمیشه  
  // استیت رو تکه تکه کد  وبعد همه رو تو فیلترد کانتکت نمایش میدیم





  const createContactForm= async (event) =>{
    event.preventDefault();
    const {status , data} = await createContact(contact);
    try{
      setLoading((prevLoading) => !prevLoading);
      if (status === 201){
       
        const allContacts =[...contacts , data];
        setContacts(allContacts);

        setFilteredContact(allContacts);

        setContact({
          fullName: "",
          photo: "",
          mobile: "",
          email: "",
          job: "",
          group: ""
        }); //این فرم خالی ارسال میشه تا بعد ثبت موفق مخاطب داده قبلی در اینپوتها پاک شه
        
        
        setLoading((prevLoading) => !prevLoading);
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
          filteredContact ,
          setContact ,
          contactQuery ,
          contacts ,
          groups ,
          setContacts: setContacts,
          onChangeContact ,
          deletContact: confirmDelet,
          creatContact : createContactForm ,
          contactSearch: searchContacts ,
          setFilteredContacts: setFilteredContact
        }}>
          <div className="App">
        <Navbar />
          <Routes>
            <Route path='/' element={<Navigate to='/contacts'/>} />
            <Route path='/contacts'  element={ <Contacts/>} />
            <Route path='/contacts/add/' element={<AddContact />} />
            <Route path='/contacts/edit/:contactId'  element={<EditContact/>} />
            <Route path='/contacts/:contactId' element={<ViewContact />} />
          </Routes>
      </div>
    </ContactContext.Provider>
   
  );
};

export default App;