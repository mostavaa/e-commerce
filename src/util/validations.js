export default {
  input: (value, form, fieldName) => {
    let formInput = form[fieldName];
    formInput.value = value;
    formInput.touched = true;
    formInput.validations.forEach((element) => {
      element.valid = element.rule(formInput.value);
    });
    formInput.valid = formInput.validations.every((o) => o.valid);
    return formInput;
  },
  required: (value) => value,
  exactLength: (value, length) =>
    typeof value === "string" && value.length === length,
  alphaNumericSpaceEnglish: (value) =>
    value && /^[A-Za-z0-9 ]{3,32}$/.test(value),
  validName: (value) =>
    /^[A-Za-z \d\u0600-\u065F\u066A-\u06EF\u06FA-\u06FF]+$/.test(value) ||
    /^[A-Za-z ]{3,32}$/.test(value),
    isArabic:(value)=>/^[\u0621-\u064A\u0660-\u0669\u0621-\u064A0-9 ]+$/.test(value),
  isValidDate: (value) => value instanceof Date && !isNaN(value),
  isActualDate: (year, month, day) => {
    var d = new Date(year, month - 1, day);
    return (
      d.getFullYear() == year && d.getMonth() == month - 1 && d.getDate() == day
    );
  },
  isEmail: (value) => {
    let isEmail = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return isEmail.test(value);
  },
  validNumber: (value) =>
    /^[0-9]/i.test(value) && !isNaN(parseFloat(value) && !isFinite(value)),
  match: (value, candidate) => value == candidate,
  exactMatch: (value, candidate) => value === candidate,
  validMobileNumber: (value) =>
    /^01[0-5]{1}[0-9]{8}/i.test(value) &&
    value.length === 11 &&
    !isNaN(parseFloat(value) && !isFinite(value)),
};
