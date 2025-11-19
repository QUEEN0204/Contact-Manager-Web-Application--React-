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
            <h1 style={{color:'white'}}>
                {contact.id? contact.mobile : "not"}
            </h1>
    
            </>
        )

       }

       </>
    )
}
export default ViewContact;