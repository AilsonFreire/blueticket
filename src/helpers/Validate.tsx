export const validateEmail = (email: string) => {
	if (email !== '') {
		if ((email.indexOf('.com') !== -1) && (email.indexOf('@') !== -1)) {
			return true;
		} else {
            return false;
        }
	}
};

export const validatePassword = (password: string) => {
    if (password.length < 6 ) return false;
    else return true;
}