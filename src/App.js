// import Navbar from './Components/Navbar';
// import Contacts from './Components/Contacts/Contacts';

import {Route , Routes , useNavigate , Navigate} from 'react-router';
import { useState ,useEffect} from 'react';
import axios from 'axios';
import{
  AddContact,
  Contacts,
  EditContact,
  ViewContact,
  Navbar
} from './Components';
import './App.css';
import {getAllContacts,GetAllGroups} from '../src/services/contactService';







const App =() => {

  const[getLoading,setLoading] = useState(false);
  const [getContacts , setContacts] = useState([]);
  const [getGroups,setGroups] = useState([]);
  useEffect(()=>{
    const fetchData = async ()=>{
      try{
        setLoading(true);

        const {data:contactsData} = await getAllContacts();
        const {data : groupsData} = await GetAllGroups();

        setContacts(contactsData);
        setGroups(groupsData);

        setLoading(false);
       // console.log(response);
        // if(response.status==200){
        //   setLoading(false);
        // }

      }
      catch(e){
        alert("Error!");
        console.log(e.message);
        setLoading(false);
      }

    }

    fetchData();
  },[]);


  return (
    <div className="App">
      <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to='/contacts'/>} />
          <Route path='/contacts'  element={
            <Contacts loading={getLoading} contacts={getContacts} />} />
          <Route path='/contacts/add/' element={<AddContact/>} />
          <Route path='/contacts/edit/:contactId' element={<EditContact/>} />
          <Route path='/contacts/viewcontacts' element={<ViewContact />} />
        </Routes>
    </div>
  );
};

export default App;
