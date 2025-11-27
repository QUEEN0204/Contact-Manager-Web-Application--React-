import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";

import { getContact, updateContact , GetAllGroups  } from '../../services/contactService';
import { ContactContext } from "../../context/contactContext";
import Spinner from '../Spinner';
import '../../App.css';
import { all } from "axios";

const EditContact = () => {
    const {loading , setLoading ,groups , contacts , setContact , setFilteredContacts} = useContext(ContactContext);
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

    const onChangeContact = (event) => {
        setState({
            ...state,
            contact: {
                ...contact,
                [event.target.name]: event.target.value
            },
        });
    };

    const submitForm = async (event) => {
        event.preventDefault();
        try {
            setLoading(true);
            //setState({ ...state, loading: true });
             // نکته:
            // ما دو روش داشتیم ک مخاطب جدید میسازیم بیاد تو مخاطببا و قابل دیدن باشه بدون رفرش:
            // 1. راه اول ریرندر کردن بود ک با فورس رندر و ست فورس رندر کارمیکرد اما حرفه ای نبود:
            // (rerender) => forceRender=> setForceRender
            // 2. ما حالا ی راه بهتر داریم همراه استاتوس دیتا روهم به کریت کانتکت میدیم و همه رو میریزیم تو ی ارایه کچون نمیشه  
            // استیت رو تکه تکه کد  وبعد همه رو تو فیلترد کانتکت نمایش میدیم
            // 3. ی راه سومی هم برای ادیت مخاطب داریم چون دیتا مقادیر ویرایش شده مخاطبو بر میگردونه همینجا جایگذاری کنیمو نمایش بدیم جای ارسال درخاوست مجدد  ب سرور
          
    const { data , status } = await updateContact(contact, contactId);
            setState({ ...state, loading: false });
            if (status === 200) {
                setLoading(false);
                const allContacts = [...contacts];
                const contactIndex = allContacts.findIndex(c => c.id === contactId);
                console.log(allContacts[contactIndex]);
                allContacts[contactIndex] = {...contact};
                console.log(allContacts[contactIndex]);
                setContact(allContacts);
               // setFilteredContacts(allContacts);
                
                navigate('/contacts');
            }
        } catch (e) {
            console.log(e.message);
            setState({ ...state, loading: false });
        }
    };

    const { contact, group } = state;

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
                                        onChange={onChangeContact}
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
                                        onChange={onChangeContact}
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
                                        onChange={onChangeContact}
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
                                        onChange={onChangeContact}
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
                                        onChange={onChangeContact}
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
                                        onChange={onChangeContact}
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