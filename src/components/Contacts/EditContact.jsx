import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getContact, getGroup, updateContact, GetAllGroups } from '../../services/contactService';
import Spinner from '../Spinner';
import '../../App.css';

const EditContact = ({forceRender , setForceRender}) => {
    const navigate = useNavigate();
    const { contactId } = useParams();

    const [state, setState] = useState({
        loading: false,
        contact: {
            fullName: '',
            photo: '',
            mobile: '',
            email: '',
            job: '',
            groups: ''
        },
        group: []
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                setState({ ...state, loading: true });
                const { data: contactData } = await getContact(contactId);
                const { data: groupData } = await GetAllGroups();

                setState({
                    loading: false,
                    contact: contactData,
                    group: groupData
                });
            } catch (e) {
                console.log(e.message);
                setState({ ...state, loading: false });
            }
        }
        fetchData();
    }, [contactId]);

    const setContactInfo = (event) => {
        setState({
            ...state,
            contact: {
                ...state.contact,
                [event.target.name]: event.target.value
            },
        });
    };

    const submitForm = async (event) => {
        event.preventDefault();
        try {
            setState({ ...state, loading: true });
            const { data } = await updateContact(state.contact, contactId);
            setState({ ...state, loading: false });
            if (data) {
                setForceRender( !forceRender);
                navigate('/contacts');
            }
        } catch (e) {
            console.log(e.message);
            setState({ ...state, loading: false });
        }
    };

    const { contact, group, loading } = state;

    return (
        <>
            <section style={{ backgroundColor: '#282A36', padding: '0.5rem 0' }}>
                <div className="container">
                    <p style={{ 
                        color: '#F8F8F2', 
                        fontSize: '1.2rem', 
                        margin: 0,
                        fontWeight: '600',
                        textAlign: 'center'
                    }}>
                        ویرایش اطلاعات مخاطب
                    </p>
                </div>
            </section>

            <hr style={{ borderColor: '#6272A4', margin: 0 }} />
            
            {loading ? (
                <Spinner />
            ) : (
                <div className="edit-contact-page">
                    <div className="edit-contact-container">
                        <div className="edit-contact-content">
                            <div className="edit-contact-image-col">
                                <div className="edit-contact-image-container">
                                    <img 
                                        src={contact.photo || '/default-avatar.png'} 
                                        alt={contact.fullName} 
                                        className="edit-contact-image"
                                    />
                                </div>
                            </div>
                            
                            <div className="edit-contact-form-col">
                           
                                <form onSubmit={submitForm} className="edit-contact-form">
                                <div className="edit-form-fields">
                                    <div className="edit-form-group full-width">
                                    <label className="edit-form-label">نام و نام خانوادگی</label>
                                    <input 
                                        type="text"
                                        name="fullName"
                                        value={contact.fullName} 
                                        onChange={setContactInfo}
                                        required={true}
                                        placeholder="نام و نام خانوادگی"
                                        className="edit-form-input"
                                    />
                                    </div>
                                    
                                    <div className="edit-form-group">
                                    <label className="edit-form-label">شماره تلفن</label>
                                    <input 
                                        type="number"
                                        name="mobile"
                                        value={contact.mobile} 
                                        onChange={setContactInfo}
                                        required={true}
                                        placeholder="شماره تلفن"
                                        className="edit-form-input"
                                    />
                                    </div>
                                    
                                    <div className="edit-form-group">
                                    <label className="edit-form-label">ایمیل</label>
                                    <input 
                                        type="email"
                                        name="email"
                                        value={contact.email} 
                                        onChange={setContactInfo}
                                        required={true}
                                        placeholder="ایمیل"
                                        className="edit-form-input"
                                    />
                                    </div>
                                    
                                    <div className="edit-form-group">
                                    <label className="edit-form-label">شغل</label>
                                    <input 
                                        type="text"
                                        name="job"
                                        value={contact.job} 
                                        onChange={setContactInfo}
                                        required={true}
                                        placeholder="شغل"
                                        className="edit-form-input"
                                    />
                                    </div>
                                    
                                    <div className="edit-form-group full-width">
                                    <label className="edit-form-label">آدرس عکس</label>
                                    <input 
                                        type="text"
                                        name="photo"
                                        value={contact.photo} 
                                        onChange={setContactInfo}
                                        required={true}
                                        placeholder="آدرس URL عکس"
                                        className="edit-form-input"
                                    />
                                    </div>
                                    
                                    <div className="edit-form-group full-width">
                                    <label className="edit-form-label">گروه</label>
                                    <select 
                                        name="groups"
                                        value={contact.groups}
                                        onChange={setContactInfo}
                                        required={true}
                                        className="edit-form-select"
                                    >
                                        <option value="">انتخاب گروه</option>
                                        {group.length > 0 &&
                                        group.map((groupItem) => (
                                            <option value={groupItem.id} key={groupItem.id}>
                                            {groupItem.name}
                                            </option>
                                        ))
                                        }
                                    </select>
                                    </div>
                                </div>
                                
                                <div className="edit-form-actions">
                                    <button type="submit" className="edit-submit-btn">ثبت تغییرات</button>
                                    <Link to={'/contacts'} className="edit-back-btn">بازگشت</Link>
                                </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default EditContact;