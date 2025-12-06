import * as  yup from 'yup';


export const contactSchema =  yup.object().shape({
    fullName : yup.string().required(' نام و نام خانوداگی الزامی است') ,
    photo: yup.string().url('آدرس وارد شده نامعتبر است').required('آدرس عکس الزامی است') ,
    mobile: yup.string().required('شماره تلفن الزامی است') ,
    email: yup.string().email('ایمیل وارد شده نامعتبر است') ,
    job: yup.string().nullable() ,
    group: yup.string().required('انتخاب گروه الزامی است') ,
});