import { Link } from "react-router-dom";

import Spinner from '../Spinner';
import Register from '../../assets/register.gif';
import {} from '../../helpers/colors';

import '../../App.css';


const AddContact = ({
     loading ,
     contact ,
     setContactInfo ,
     groups ,
     createContactForm
     }) => {
    return (
      <>
        {loading ? (
          
              <Spinner />
           
        ) : (
          <div className="add-contact-container">
            <div className="form-content">
              {/* سمت چپ - اسپینر */}
              <div className="spinner-side">
                <img src={Register} className="regGif" alt="Register form" />
              </div>
              
              {/* سمت راست - فرم */}
              <div className="form-side">
                <div className="container">
                  <div className="form-header">
                    <p className="h4 fw-bold text-center">
                      ایجاد مخاطب جدید
                    </p>
                  </div>
                  
                  <hr className="divider" />
                  
                  <div className="row justify-content-center">
                    <div className="col-12 col-md-8 col-lg-6">
                      <form className="contact-form" onSubmit={createContactForm}>
                        <div className="form-group">
                          <input 
                            type="text" 
                            name="fullName" 
                            value={contact.fullName}
                            onChange={setContactInfo}
                            placeholder="نام و نام خانوداگی" 
                            className="form-input"
                            required={true} 
                          />
                        </div>
                        
                        <div className="form-group">
                          <input 
                            type="text" 
                            name="photo"
                            value={contact.photo}
                            onChange={setContactInfo} 
                            placeholder="آدرس عکس" 
                            className="form-input"
                            required={true} 
                          />
                        </div>
                        
                        <div className="form-group">
                          <input 
                            type="number" 
                            name="mobile"
                            value={contact.mobile}
                            onChange={setContactInfo} 
                            placeholder="شماره موبایل" 
                            className="form-input"
                            required={true} 
                          />
                        </div>
                        
                        <div className="form-group">
                          <input 
                            type="email" 
                            name="email" 
                            value={contact.email}
                            onChange={setContactInfo}
                            placeholder="آدرس ایمیل" 
                            className="form-input"
                            required={true} 
                          />
                        </div>
                        
                        <div className="form-group">
                          <input 
                            type="text" 
                            name="job" 
                            value={contact.job}
                            onChange={setContactInfo}
                            placeholder="شغل" 
                            className="form-input"
                            required={true} 
                          />
                        </div>
                        
                        <div className="form-group">
                          <select 
                          name="group"
                          value={contact.group}
                          onChange={setContactInfo}
                          className="form-select">
                            {
                                groups.length > 0 && groups.map(group =>(
                                    <option value={group.id} key={group.id}>
                                        {group.name }
                                    </option>
                                ))
                            }
                          </select>
                        </div>
                        
                        <div className="form-actions">
                          <input 
                            type="submit" 
                            value="ایجاد مخاطب" 
                            className="submit-btn"
                          />
                          <Link to={'/contacts'} className="back-btn">
                            بازگشت به لیست
                          </Link>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  };
  
  export default AddContact;