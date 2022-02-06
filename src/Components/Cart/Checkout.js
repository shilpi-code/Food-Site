import { useRef, useState } from 'react';

import classes from './Checkout.module.css';


const Checkout= (props)=>{
    const isEmpty = (value) => value.trim() === '';
    const isSixchars = (value) => value.trim().length === 6;

    const [formInputsValid, setformInputsValid]= useState({
        name:true,
        street:true,
        postal:true,
        city:true,
    });
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();

    

    const confirmHandler=(event)=>{
        event.preventDefault();
    
    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreetIsValid = !isEmpty(enteredStreet);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = isSixchars(enteredPostalCode);

    setformInputsValid({
        name:enteredNameIsValid,
        street:enteredStreetIsValid,
        postal:enteredPostalCodeIsValid,
        city:enteredCityIsValid,
    });

    const formIsValid =
    enteredNameIsValid &&
    enteredStreetIsValid &&
    enteredCityIsValid &&
    enteredPostalCodeIsValid;

    if(!formIsValid)
        return;

        props.onConfirm({
            name:enteredName,
            street:enteredStreet,
            postal:enteredPostalCode,
            city:enteredCity,
        })

    }
    
        const nameControlClasses= `${classes.control} ${formInputsValid.name ? '' : classes.invalid}`;
        const streetControlClasses= `${classes.control} ${formInputsValid.street ? '': classes.invalid}`;
        const postalControlClasses= `${classes.control} ${formInputsValid.postal ? '': classes.invalid}`;
        const cityControlClasses= `${classes.control} ${formInputsValid.city ? '': classes.invalid}`;


    return(
        <form className={classes.form} onSubmit={confirmHandler}>
           <div className={nameControlClasses}>
                <label htmlFor="name">Name </label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputsValid.name && <p>Please enter a valid name</p>}
           </div>

           <div className={streetControlClasses}>
                <label htmlFor="street">street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputsValid.street && <p>Please enter a street name</p>}
            </div>

            <div className={postalControlClasses}>
                <label htmlFor="postal">Postal Code</label>
                <input type='text' id='postal' ref={postalCodeInputRef}/>
                {!formInputsValid.postal && <p>Please enter a postal code</p>}
            </div>

            <div className={cityControlClasses}>
                <label htmlFor="city">City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputsValid.city && <p>Please enter a valid city name</p>}
            </div>
            <div className={classes.actions}>
                <button type='text' onClick={props.onCancel}>Cancel</button>
                <button type='submit' className={classes.submit}>Confirm</button>
            </div>
        </form>

    )
};
export default Checkout;