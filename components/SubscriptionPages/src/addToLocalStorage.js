// TODO: place below utility inside utils module
/**
 Add an item to a localStorage() object
 @param {String} name of localStorage
 @param {String} key to add to localStorage
 @param {String} value of new key to add in localStorage
 @param {String} returnItem return localStorage value
 */
const addToLocalStorage = (name, key, value, returnItem = false) => {
    let item = localStorage.getItem(name);
    item = item ? JSON.parse(item) : {};
    item[key] = value;
    try {
        localStorage.setItem(name, JSON.stringify(item));
    } catch (err) {
        //throw new Error('localstorage has not been set');
    }
    if (returnItem) return item;
};

export default addToLocalStorage;
