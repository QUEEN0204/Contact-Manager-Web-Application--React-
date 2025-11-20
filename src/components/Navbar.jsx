import SearchContact from './Contacts/SearchContact';


import {Purple ,Background } from '../helpers/colors';

const Navbar = ({query , search}) =>{
    return(
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
                       <SearchContact query={query} search={search} />
                    </div>
                   
                </div>
            </div>
        </nav>
    )
}

export default Navbar;