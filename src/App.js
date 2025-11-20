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
          <div>
            <h4>
              حذف مخاطب
            </h4>
            <h6>
              آیا از حذف 
            {contactFullName}
              اطمینان دارید؟
            </h6>
            <div>
              <button
              onClick={()=>{
                removeContact(contactId);
                onClose();
              }}
               >
                بله 
              </button>
              <button onClick={()=>onClose()}>
                انصراف
              </button>
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
    if (event) {
      event.preventDefault();
    }
    const {status} = await createContact(getContact);
    try{
      if (status === 201){
        createContactForm({}); //این فرم خالی ارسال میشه تا بعد ثبت موفق مخاطب داده قبلی در اینپوتها پاک شه
        setForceRender(!forceRender);
        console.log(status.message);
        navigate("/contacts");
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