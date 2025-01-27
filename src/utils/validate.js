export const checkValidateData = (email, password) => {
    const isEmailValidate = /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/.test(email);
    const isPasswordValidate = /^(?=^.{6,}$)(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^A-Za-z0-9])/.test(password);

    if (!isEmailValidate) {
        return "Email Id is not valid";
    }
    if (!isPasswordValidate) {
        return "Password is not valid";
    }

    return null;
}
