import SearchContact from './Contacts/SearchContact';

const Navbar = () =>{
    return(
        <nav className="navbar navbar-light navbar-expand-sm shadow-lg">
            <div className="container">
                <div className="row w-100">
                    <div className="col">
                        <i className="fa fa-id-badge" />
                            مدیریت 
                             {" "}
                            <span style={{color:'purple'}}>
                               مخاطبین
                            </span>
                        
                    </div>
                    <div className="col">
                       <SearchContact />
                    </div>
                   
                </div>
            </div>
        </nav>
    )
}

export default Navbar;