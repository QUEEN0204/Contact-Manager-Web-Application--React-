// import Navbar from './Components/Navbar';
// import Contacts from './Components/Contacts/Contacts';

import {Route , Routes , useNavigate , Navigate} from 'react-router';
import { useState } from 'react';
import{
  AddContact,
  Contacts,
  EditContact,
  ViewContact,
  Navbar
} from './Components';

import './App.css';


const App =() => {

  const[getLoading,setLoading] = useState(false);
  const [getContacts , setContacts] = useState([]);

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
