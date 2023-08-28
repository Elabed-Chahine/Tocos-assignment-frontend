export const registerFormValidator = (email,password,lastName,firstName,errors) => {
    let validated = true;

    let error ={...errors} ;
    if (email.length === 0) {
        error.email.message = "Please write your email address";
        validated = false;
    }
    if ( password.length === 0) {
        error.password.message = "Please write your password";
        validated = false;
    }
    if ( firstName.length === 0) {
        console.log(firstName);
        error.firstName.message = "First name shouldn't be empty";
        validated = false;
    }
    if (lastName.length === 0) {
        error.lastName.message = "Last name shouldn't be empty";
        validated = false;
    }
    if (
        email?.length > 0 &&
        (email.indexOf("@") == -1 || email.indexOf(".") == -1)
    ) {
        error.email.message = "Please correct your email address";
        validated = false;
    }
    if (password.length < 6) {
        error.password.message = "Password should be atleast 6 characters";
        validated = false;
    }
    
    return {validated,error};
};



export const loginFormValidator = (email, password, errors) => {
    let validated = true;

    let error = { ...errors };
    if (email.length === 0) {
        error.email.message = "Please write your email address";
        validated = false;
    }
    if (password.length === 0) {
        error.password.message = "Please write your password";
        validated = false;
    }
    if (
        email?.length > 0 &&
        (email.indexOf("@") == -1 || email.indexOf(".") == -1)
    ) {
        error.email.message = "Please correct your email address";
        validated = false;
    }
    if (password.length < 6) {
        error.password.message = "Password should be atleast 6 characters";
        validated = false;
    }

    return { validated, error };
};

export  function mongoDBDateToYMDHMS(mongoDBDate) {
    // Convert the MongoDB date string to a JavaScript Date object.
    const date = new Date(mongoDBDate);

    // Get the year, month, day, hours, minutes, and seconds from the Date object.
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Return the year, month, day, hours, minutes, and seconds in a formatted string.
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}