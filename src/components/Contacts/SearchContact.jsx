import {Purple} from '../../helpers/colors';

const SearchContact = ({query , search}) =>{
    return(

        <div className="input-group mx-2 w-75" dir="ltr">
                            
        <span className="input-group-text" id="basic-addon1"  style={{backgroundColor:Purple}}>
                <i className="fa fa-search"></i>
        </span>
        <input aria-describedby="basic-addon1"
         aria-label="Search"
        placeholder="جستجوی مخاطب"
        className="form-control"
        dir="rtl"
        type="text"
         id=""
         value={query.text}
         onChange={search}

         />


    </div>

    )
}
export default  SearchContact;