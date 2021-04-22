// array.every(some condition) --> rerturn true or false
// object.values(obj) --> return array of values of key of the object

export const validateFields = (fieldsToValidate) => {
    return fieldsToValidate.every((field) => Object.values(field)[0] !== '');  
  };