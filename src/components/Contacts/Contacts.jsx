import { CurrentLine, Pink, Purple , Orange ,Cyan ,Red } from "../../helpers/colors";
const Contacts = () =>{
    return(
        <>
        
            <section className="container">
                <div className="grid">
                    <div className="row">
                        <div className="col">
                            <p className="h3">
                                <button className="btn mx-2" style={{backgroundColor:Pink}}>
                                        ایجاد مخاطب جدید
                                        <i className="fa fa-plus-circle mx-2"></i>

                                </button>
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card my-2" style={{background:CurrentLine}}>
                            <div className="card-body">
                                <div className="row align-items-center d-flex justify-content-around">
                                    <div className="col-md-4 col-sm-4">
                                        <img src="https://placehold.co/200" alt="" 
                                        style={{border:`1px solid ${Purple}`}} className="img-fluid rounded" />
                                    </div>
                                    <div className="col-md-7 col-sm-7">
                                        <ul className="list-group">
                                            <li className="list-group-item list-group-item-dark">
                                                نام و نام خانوادگی: {' '}

                                                <span className="fw-bold mx-1">
                                                    زهرا ارشاد
                                                </span>

                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                 شماره تلفن  : {' '}

                                                <span className="fw-bold mx-1">
                                                    09123456789
                                                </span>

                                            </li>
                                            <li className="list-group-item list-group-item-dark">
                                                آدرس ایمیل: {' '}

                                                <span className="fw-bold mx-1">
                                                    zahra@gmail.com
                                                </span>

                                            </li>
                                        </ul>
                                    </div>
                                    <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
                                        <button className="btn my-1" style={{backgroundColor:Orange}}>

                                            <i className="fa fa-eye"/>
                                        </button>
                                        <button className="btn my-1" style={{backgroundColor:Cyan}}>

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
                </div>
            </section>
        </>

    )
}
export default Contacts;