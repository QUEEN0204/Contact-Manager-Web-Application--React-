import { Link, useNavigate, useParams } from "react-router-dom";

import { useEffect, useState } from "react";

import { getContact, getGroup, updateContact} from '../../services/contactService';
import Spinner from '../Spinner';


const EditContact = () =>{
    const navigate= useNavigate();
    const {contactId} = useParams();

    const [state , setSate] = useState({
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
                setSate({...state, loading:true});

                const {data:contactData} = await getContact(contactId);
                const {data:groupData} = await getGroup(contactData.groups);

                setSate({
                    loading:false ,
                    ...state,
                    contact:contactData,
                    group: groupData.name
                });

            }
            catch(e){
                console.log(e.message);
            }

        }
        fetchData();
    },[]);

    const setContactInfo = (event) => {
        setSate({
            ...state,
            contact :{
                ...state.contact,
                [event.target.name]:[event.target.value]
            },
    });
    };

    const submitForm = async (event) =>{

        try{
            setSate({loading: true , ...state});

            const {data} = await updateContact( state.contact , contactId );

            setSate({ loading: false , ...state});
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
            <h1>
                {contact.id}
            </h1>
        )
        }
        </>
    )
}
export default EditContact;