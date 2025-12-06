import { Link } from "react-router-dom";
import { useContext } from "react";

import Spinner from '../Spinner';
import Register from '../../assets/register.gif';
import {} from '../../helpers/colors';
import { ContactContext } from "../../context/contactContext";

import '../../App.css';


const AddContact = () => {
      const {loading , contact , onChangeContact , groups , creatContact} = useContext(ContactContext);



    return (
      <>
        {loading ? (
          
              <Spinner />
           
        ) : (
          <div className="add-contact-container">
            <div className="form-content">
              
              <div className="spinner-side">
                <img src={Register} className="regGif" alt="Register form" />
              </div>
              
             
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
                      <form className="contact-form" onSubmit={creatContact}>
                        <div className="form-group">
                          <input 
                            type="text" 
                            name="fullName" 
                            value={contact.fullName}
                            onChange={onChangeContact}
                            placeholder="نام و نام خانوداگی" 
                            className="form-input"
                             
                          />
                        </div>
                        
                        <div className="form-group">
                          <input 
                            type="text" 
                            name="photo"
                            value={contact.photo}
                            onChange={onChangeContact} 
                            placeholder="آدرس عکس" 
                            className="form-input"
                             
                          />
                        </div>
                        
                        <div className="form-group">
                          <input 
                            type="number" 
                            name="mobile"
                            value={contact.mobile}
                            onChange={onChangeContact} 
                            placeholder="شماره موبایل" 
                            className="form-input"
                             
                          />
                        </div>
                        
                        <div className="form-group">
                          <input 
                            type="email" 
                            name="email" 
                            value={contact.email}
                            onChange={onChangeContact}
                            placeholder="آدرس ایمیل" 
                            className="form-input"
                             
                          />
                        </div>
                        
                        <div className="form-group">
                          <input 
                            type="text" 
                            name="job" 
                            value={contact.job}
                            onChange={onChangeContact}
                            placeholder="شغل" 
                            className="form-input"
                             
                          />
                        </div>
                        
                        <div className="form-group">
                          <select 
                          name="group"
                          value={contact.group}
                          onChange={onChangeContact}
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