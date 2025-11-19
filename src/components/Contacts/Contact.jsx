import { Link } from "react-router-dom";
import { Pink, Purple,Red} from "../../helpers/colors";



const Contact = ({contact}) =>{
    return(
        <div className="col-md-6">
        <div className="card my-2" style={{background:'#282a47db'}}>
            <div className="card-body">
                <div className="row align-items-center d-flex justify-content-around">
                    <div className="col-md-4 col-sm-4">
                        <img src={contact.photo}
                        alt={contact.fullName} 
                        style={{border:`1px solid ${Purple}`}} className="img-fluid rounded" />
                    </div>
                    <div className="col-md-7 col-sm-7">
                        <ul className="list-group">
                            <li className="list-group-item list-group-item-dark">
                                نام و نام خانوادگی: {' '}

                                <span className="fw-bold mx-1">
                                    {contact.fullName}
                                </span>

                            </li>
                            <li className="list-group-item list-group-item-dark">
                                 شماره تلفن  : {' '}

                                <span className="fw-bold mx-1">
                                    {contact.mobile}
                                </span>

                            </li>
                            <li className="list-group-item list-group-item-dark">
                                آدرس ایمیل: {' '}

                                <span className="fw-bold mx-1">
                                    {contact.email}
                                </span>

                            </li>
                        </ul>
                    </div>
                    <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
                        <Link to={`/contacts/${contact.id}`} className="btn my-1" style={{backgroundColor:Purple}}>

                            <i className="fa fa-eye"/>
                        </Link>
                        <button className="btn my-1" style={{backgroundColor:Pink}}>

                            <i className="fa fa-edit"/>
                        </button>
                        <button className="btn my-1" style={{backgroundColor:Red}}>

                            <i className="fa fa-trash"/>
                        </button>
                    </div>

                </div>
            </div>

        </div>

    </div>
    )
}
export default Contact;