import Contact from "./Contact";
import Spinner from "../Spinner";
import { Background, Pink,Cyan} from "../../helpers/colors";
import { ContactContext } from "../../context/contactContext";

import NotFound from '../../assets/not_found.gif';
import { Link } from "react-router-dom";
import { useContext } from "react";



const Contacts = () =>{
    const {contacts , loading , deletContact} = useContext(ContactContext);
    return(
        <>
        
            <section className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3">
                                <Link to={'/contacts/add'} className="btn mx-2" style={{backgroundColor:Pink, float:'right' , marginTop: '15px'}}>
                                        ایجاد مخاطب جدید
                                        <i className="fa fa-plus-circle mx-2"></i>

                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            {
                loading ? (<Spinner /> )
                :
                (
                    <section className="container">
                    <div className="row">
                        {
                            contacts?.length > 0  ? contacts.map(c=>
                                <Contact
                                 key={c.id}
                                 contact={c}
                                 deletContact={() => deletContact({ contactId: c.id, contactFullName: c.fullName })}

                                   />
                            )
                            :
                            (
                                <div className="text-center py-5" style={{backgroundColor:Background}}>
                                    <p className="h3" style={{color:'#4c7dd6'}}>
                                        مخاطبی یافت نشد!
                                    </p>
                                    <img  className="w-25 rounded" src={NotFound} alt="notFound" />
    
                                </div>
                                
                            )
                        } 
                      
                    </div>
                </section>
                )

            }
           
        </>

    )
}
export default Contacts;