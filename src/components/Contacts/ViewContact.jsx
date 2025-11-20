import { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";

import { getContact , getGroup } from "../../services/contactService";
import Spinner from '../Spinner';
import { Comment } from "../../helpers/colors";


const ViewContact = () =>{
    const {contactId}=useParams();

    const [state,setState] = useState({
        loading:false ,
        contact:{},
        group:{}
    });

    useEffect(()=>{
        const fetchData = async()=>{
            try{
                setState({ ...state, loading:true });
                const {data:contactData} = await getContact(contactId);
                const {data:groupData} = await getGroup(contactData.groups);

                setState({
                    ...state,
                    loading:false,
                    contact:contactData,
                    group:groupData
                });

            }
            catch(e){
                setState({ ...state, loading:false });
                console.log(e.message);
            }
        }

        fetchData();
    }, [contactId]);

    const{loading, contact , group} =state;

    return(
       <>
       <section>
            <div className="container">
                <div className="row">
                    <p>
                        اطلاعات مخاطب
                    </p>
                </div>
            </div>
       </section>

       <hr />
       {
        loading? (<Spinner />):(
            <>
            <div className="viewcontact">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <img src={contact.photo} alt="" />
                        </div>
                        <div className="col">
                            <div>
                                <h5>
                                    نام و نام خانوادگی
                                </h5>
                                <h4>
                                {contact.fullName}
                                </h4>
                            </div>
                             <div>
                                <h5>
                                    شماره تلفن
                                </h5>
                                <h4>
                                {contact.mobile}
                                </h4>
                            </div>
                             <div>
                                <h5>
                                    شغل
                                </h5>
                                <h4>
                                {contact.job}
                                </h4>
                            </div>
                             <div>
                                <h5>
                                   نسبت
                                </h5>
                                <h4>
                                {contact.groups}
                                </h4>
                            </div>
                        </div>
                        <Link to={'/contacts'}>
                        بازگشت به صفحه اصلی
                        </Link>
                    </div>
                </div>
            </div>
    
            </>
        )

       }

       </>
    )
}
export default ViewContact;