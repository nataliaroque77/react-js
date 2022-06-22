export const postalCodeRegEx = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z]●?[0-9][A-Z][0-9]$/i;
export const postalCodeFSARegEx = /^(?!.*[DFIOQU])[A-VXY][0-9][A-Z][-,\s]?([0-9][A-Z][0-9])?$/;
export const postalCodeACRegEx =
    /^[abceghjklmnprstvxyABCEGHJKLMNPRSTVXY][0-9][abceghjklmnprstvwxyzABCEGHJKLMNPRSTVWXYZ][ ][0-9][abceghjklmnprstvwxyzABCEGHJKLMNPRSTVWXYZ][0-9]$/i;
export const passwordRegExp = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/i;
export const lettersRegExp = /^[aA-zZ\s]+$/;
export const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// TODO: when we implement the postal code input we should revisit this one
// Can we use one of these Regex for both form and location service?
