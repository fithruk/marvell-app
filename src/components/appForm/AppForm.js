import "../appForm/appForm.css";

import { useState, useEffect } from "react";
import { useFormik } from 'formik';
import { Link } from "react-router-dom";
import UseService from "../service/service";
import { CSSTransition } from "react-transition-group";


const AppForm = () => {

    const [inProp, setInProp] = useState(false);

    const {getCharByName} = UseService();
    const [loaderBtn, setloaderBtn] = useState(false);
    const [charSuccess, setCharSuccess] = useState(false);
    
    useEffect(()=> {
        setInProp(true)
    }, [])
    
    const validate = (values) => {
        setCharSuccess(false);
        const errors = { };

        if (!values.name) {
            errors.name = "This field is requaired"
        }
        else if (values.name.length < 2) {
            errors.name = "name must be greater than two"
        }
    
        return errors;
    }

    const formic = useFormik({
        initialValues: {
            name: '',
        }, 
        validate,
        onSubmit: (values) => {
            setloaderBtn(true)
            getCharByName(values.name)
            .then(char => {
                setloaderBtn(false);
                setCharSuccess(true);
            })
            .catch(() => {
                setloaderBtn(false)
                formic.errors.wrong_name = "The character was not found, check the name and try again."
            })
        },
        
    })
    const button = loaderBtn ? "Finding..." : "FIND";
    const buttonSuccess = charSuccess ? <button className="form_button_to_char"><Link className="to_char_link" to={`/AppCharApart/${formic.values.name}`}>to page</Link></button> : null;
    return (
        <CSSTransition in={inProp} timeout={200} classNames="form_wrapper">
            <div className="form_wrapper">
            <form className="form" onSubmit={formic.handleSubmit}>
            <div className="form_item">
                <label 
                className="form_label" 
                htmlFor='char_name'>Find a character by name or choose one</label>
                <input 
                className="form_input" 
                id='char_name' 
                name="name" 
                type="text" 
                onChange={formic.handleChange} 
                onBlur={formic.handleBlur}
                value={formic.values.name} 
                placeholder='name'/>
                {formic.errors.name && formic.touched.name ? <div className="form_error">{formic.errors.name}</div> : null}
                {formic.errors.wrong_name ? <div className="form_error">{formic.errors.wrong_name}</div> : null}
                {charSuccess ? <div className="form_success">There is! Visit {formic.values.name} page? </div> : null}
            </div>
            <div className="form_btn_box">
                <button className="form_button" type='submit'>
                    {button}
                </button>
                {buttonSuccess}
            </div>
            </form>
        </div>
        </CSSTransition>
    );
}

export default AppForm;