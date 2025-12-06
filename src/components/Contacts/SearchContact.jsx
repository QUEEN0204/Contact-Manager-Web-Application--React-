import { useContext } from 'react';

import { ContactContext } from '../../context/contactContext';

import {Purple} from '../../helpers/colors';



const SearchContact = () =>{
    const { contactSearch} = useContext(ContactContext);
    return(

        <div className="input-group mx-2 w-75" dir="ltr">
                            
        <span className="input-group-text" id="basic-addon1"  style={{backgroundColor:Purple}}>
                <i className="fa fa-search"></i>
        </span>
        <input aria-describedby="basic-addon1"
         aria-label="Search"
        placeholder="جستجوی مخاطب"
        className="form-control"
        dir="rtl"
        type="text"
         id=""
         onChange={(event)=> contactSearch(event.target.value)}

         />


    </div>

    )
}
export default  SearchContact;