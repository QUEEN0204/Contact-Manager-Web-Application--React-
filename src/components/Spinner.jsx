import spinnerGif from '../assets/spinner.gif';

const Spinner = ()=>{
    return(
        <img src={spinnerGif} alt="isLoading" className="d-block m-auto my-4" style={{width:'300px'}} />
    )
}
export default Spinner;