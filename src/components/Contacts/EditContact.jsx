import { Link, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import { getContact, getGroup, updateContact} from '../../services/contactService';
import Spinner from '../Spinner';


const EditContact = () =>{
    const navigate= useNavigate();
    const {contactId} = useParams();

    const [state , setState] = useState({
        loading:false,
        contact:{
            fullName:'',
            photo:'',
            mobile:'',
            email:'',
            job:'',
            groups:''
        },
        group:[]

    });

    useEffect(()=>{
        const fetchData= async ()=>{
            try{
                setState({...state, loading:true});

                const {data:contactData} = await getContact(contactId);
                const {data:groupData} = await getGroup(contactData.groups);

                setState({
                    loading:false ,
                    ...state,
                    contact:contactData,
                    group: groupData
                });

            }
            catch(e){
                console.log(e.message);
            }

        }
        fetchData();
    },[]);

    const setContactInfo = (event) => {
        setState({
            ...state,
            contact :{
                ...state.contact,
                [event.target.name]:event.target.value
            },
    });
    };

    const submitForm = async (event) =>{

        try{
            setState({loading: true , ...state});

            const {data} = await updateContact( state.contact , contactId );

            setState({ loading: false , ...state});
            if(data){
                navigate('/contacts');
            }

        }
        catch(e) {
            console.log(e.message);
        }

    };

    const {contact , group , loading} = state;

    return(
        <>
        {loading? (<Spinner />) :(
            <>
            <div>
                ویرایش اطلاعات مخاطب
            </div>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <img src={contact.photo} alt="" />
                    </div>
                    <div className="col">
                        <form onSubmit={submitForm}>
                            <div>
                                <input 
                                    type="text"
                                    name="fullName"
                                    value={contact.fullName} 
                                    onChange={setContactInfo}
                                    required={true}
                                    placeholder="نام و نام خانوادگی"
                                />
                            </div>
                            <div>
                                <input 
                                    type="text"
                                    name="photo"
                                    value={contact.photo} 
                                    onChange={setContactInfo}
                                    required={true}
                                    placeholder="photo Url"
                                />
                            </div>
                            <div>
                                <input 
                                    type="number"
                                    name="mobile"
                                    value={contact.mobile} 
                                    onChange={setContactInfo}
                                    required={true}
                                    placeholder="شماره تلفن"
                                />
                            </div>
                            <div>
                                <input 
                                    type="email"
                                    name="email"
                                    value={contact.email} 
                                    onChange={setContactInfo}
                                    required={true}
                                    placeholder="ایمیل"
                                />
                            </div>
                            <div>
                                <input 
                                    type="text"
                                    name="job"
                                    value={contact.job} 
                                    onChange={setContactInfo}
                                    required={true}
                                    placeholder="شغل"
                                />
                            </div>
                            <div>
                                <select 
                                name="groups"
                                value={contact.groups}
                                onChange={setContactInfo}
                                required={true}
                                >
                                    {
                                        group.length > 0 &&
                                        group.map((group) =>(
                                         <option
                                            value={group.id}
                                            key={group.id}>
                                            {group.name}
                                         </option>
                                        ))

                                    }

                                </select>
                            </div>
                            <button type="submit">ثبت تغییرات</button>
                <Link to={'/contacts'}>
                بازگشت
                </Link>
                        </form>
                    </div>
                </div>
               
            </div>
            </>
            
        )
        }
        </>
    )
}
export default EditContact;