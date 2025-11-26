import SearchContact from './Contacts/SearchContact';

import { useLocation } from 'react-router-dom';

import {Purple ,Background } from '../helpers/colors';

const Navbar = () =>{

    const location = useLocation();

    return(
        <>
        {
                        location.pathname === '/contacts' ? (
                            <nav className="navbar navbar-dark navbar-expand-sm shadow-lg" style={{backgroundColor:Background}}>
                            <div className="container">
                                <div className="row w-100">
                                    <div className="col">
                                        <div className="navbar-brand">
                                            <i className="fa fa-id-badge" style={{color:Purple}} />
                                                {" "}
                                                مدیریت 
                                                {" "}
                                                <span style={{color:Purple}}>
                                                مخاطبین
                                                </span>
                                        </div> 
                                    </div>
                
                                    
                                    <div className="col">
                                       <SearchContact />
                                    </div>
                                   
                                </div>
                            </div>
                        </nav>
                        ) : null
                    }
        </>
       
    )
}

export default Navbar;