import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useContext } from "react";

import { getContact, getGroup } from "../../services/contactService";
import Spinner from '../Spinner';
import { ContactContext } from "../../context/contactContext";

import "../../App.css";

const ViewContact = () => {
    const { contactId } = useParams();
    const [state, setState] = useState({
        contact: {},
        group: {}
    });
    const {loading} = useContext(ContactContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setState({ ...state, loading: true });
                const { data: contactData } = await getContact(contactId);
                const { data: groupData } = await getGroup(contactData.groups);

                setState({
                    ...state,
                    loading: false,
                    contact: contactData,
                    group: groupData
                });
            } catch (e) {
                setState({ ...state, loading: false });
                console.log(e.message);
            }
        }

        fetchData();
    }, [contactId]);

    const { contact, group } = state;
    

    return (
        <>
            <section style={{ backgroundColor: '#282A36', padding: '1rem 0' }}>
                <div className="container">
                    <div className="row">
                        <p style={{ 
                            color: '#F8F8F2', 
                            fontSize: '1.5rem', 
                            margin: 0,
                            fontWeight: '600'
                        }}>
                            اطلاعات مخاطب
                        </p>
                    </div>
                </div>
            </section>

            <hr style={{ borderColor: '#6272A4', margin: 0 }} />
            
            {
                loading ? (<Spinner />) : (
                    <>
                        <div className="viewcontact">
                            <div className="container">
                                <div className="row">
                                    <div className="col">
                                        <img src={contact.photo} alt={contact.fullName} />
                                    </div>
                                    <div className="col">
                                        <div className="contact-info">
                                            <div>
                                                <h5>نام و نام خانوادگی</h5>
                                                <h4>{contact.fullName}</h4>
                                            </div>
                                            <div>
                                                <h5>شماره تلفن</h5>
                                                <h4>{contact.mobile}</h4>
                                            </div>
                                            <div>
                                                <h5>شغل</h5>
                                                <h4>{contact.job}</h4>
                                            </div>
                                            <div>
                                                <h5>نسبت</h5>
                                                <h4>{group.name}</h4>
                                            </div>
                                        </div>
                                        <Link to={'/contacts'} className="back-button">
                                            بازگشت به صفحه اصلی
                                        </Link>
                                    </div>
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