import { Link } from "react-router-dom";

import {Spinner} from '../../assets/spinner.gif';
import {Register} from '../../assets/register.gif';
import {} from '../../helpers/colors';

import '../../App.css';

const AddContact= ({loading})=>{
    return(
        <>
        {
            loading?(<Spinner />):(
                <>
                <section className="p-3">
                    <img src={Register} className="regGif" alt="Regiter form" />
                </section>

                <div className="container">
                    <div className="rwo">
                        <div className="col">
                            <p className="h4 fw-bold text-center">
                                ایجاد مخاطب جدید
                            </p>

                        </div>
                    </div>
                    <hr className="bg-purple" />
                        <div className="row mt-5">
                            <div className="col-md-4">
                                <form>
                                    <div>
                                        <input type="text" name="fullName" placeholder="" id="" required={true} />
                                    </div>
                                    <div>
                                        <input type="text" name="photo" placeholder="" id="" required={true} />
                                    </div>
                                    <div>
                                        <input type="number" name="mobile" placeholder="" id="" required={true} />
                                    </div>
                                    <div>
                                        <input type="email" name="email" placeholder="" id="" required={true} />
                                    </div>
                                    <div>
                                        <input type="text" name="job" placeholder="" id="" required={true} />
                                    </div>
                                    <div>
                                        <select name="group" id="">
                                            <option value="">
                                                انتخاب گروه
                                            </option>
                                        </select>
                                    </div>
                                    <div>
                                        <input type="submit" value="createContact" />
                                        <Link to={'/contacts'}>
                                        بازگشت
                                        </Link>
                                    </div>
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