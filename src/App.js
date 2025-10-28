import { useState } from 'react';

// import Navbar from './Components/Navbar';
// import Contacts from './Components/Contacts/Contacts';
import{
  Contacts,
  
  Navbar

} from './Components';

import './App.css';


const App =() => {

  const[getLoading,setLoading] = useState(false);
  const [getContacts , setContacts] = useState([]);

  return (
    <div className="App">
      <Navbar />
      <Contacts contacts={getContacts} loading={getLoading}  />
    </div>
  );
}

export default App;
