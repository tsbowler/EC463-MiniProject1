import React from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";
//import ""./styles.scss";
//We don't end up using the file itslef.

const Register = () => {
    return(
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">FindMyFriends</span>
                <form>
                    <GoogleLoginButton />
                </form>
            </div>
        </div>

    );
};

export default Register;