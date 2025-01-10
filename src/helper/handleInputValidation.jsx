export const handleInputValidation = (value, setStateValue, type, field) => {
  let alphabetOnly = /^[a-zA-Z]+$/;
  let alphabetAndSpace = /^[a-zA-Z\s]+$/;
  let numberOnly = /^[0-9]*$/;
  let numberAndSpace = /^[\d\s]+$/;
  let email = /^[a-zA-Z0-9@.]*$/;
  let decimal = /^[0-9.]*$/;
  let pincode = /^[0-9]$/;
  let textAndNumber = /^[a-zA-Z0-9\s]+$/;
  // let textAndNumber = /^[0-9.]*$/;


  //console.log(value, "value",field);

  switch (type) {
    case 0:
      if (alphabetOnly.test(value) || value === "") {
        if (field) {
          setStateValue((prevData) => ({
            ...prevData,
            [field]: value,
          }));
        } else {
          setStateValue(value);
        }
      }
      break;
    case 1:
      if (
        (alphabetAndSpace.test(value) && !value.startsWith(" ")) ||
        value === ""
      ) {
        if (field) {
          setStateValue((prevData) => ({
            ...prevData,
            [field]: value,
          }));
        } else {
          setStateValue(value);
        }
      }
      break;
    case 2:
      if ((numberOnly.test(value) && !value.startsWith("0")) || value === "") {
        if (value.length <= 10) {
          if (field) {
            setStateValue((prevData) => ({
              ...prevData,
              [field]: value,
            }));
          } else {
            setStateValue(value);
          }
        }
      }
      break;
    case 3:
      if (numberAndSpace.test(value) || value === "") {
        if (value.length <= 12) {
          if (field) {
            setStateValue((prevData) => ({
              ...prevData,
              [field]: value,
            }));
          } else {
            setStateValue(value);
          }
        }
      }
      break;
    case 4:
      if (email.test(value) || value === "") {
        if (field) {
          setStateValue((prevData) => ({
            ...prevData,
            [field]: value,
          }))
        } else {
          setStateValue(value);
        }
      }
      break;
    case 5:
      if (decimal.test(value) || value === "") {
        if (field) {
          setStateValue((prevData) => ({
            ...prevData,
            [field]: value,
          }))
        } else {
          setStateValue(value);
        }
      }
      break;
    case 6:
      if ((numberOnly.test(value) && !value.startsWith("0")) || value === "") {
        if (value.length <= 6) {
          if (field) {
            setStateValue((prevData) => ({
              ...prevData,
              [field]: value,
            }));
          } else {
            setStateValue(value);
          }
        }
      }
      break;
    case 7:
      if ((numberOnly.test(value) && !value.startsWith("0")) || value === "") {
        if (value.length <= 100) {
          if (field) {
            setStateValue((prevData) => ({
              ...prevData,
              [field]: value,
            }));
          } else {
            setStateValue(value);
          }
        }
      }
      break;
    case 8:
      if ((textAndNumber.test(value) && !value.startsWith(" ")) || value === "") {
        if (value === "") {

          if (field) {
            setStateValue((prevData) => ({
              ...prevData,
              [field]: "",
            }));
          } else {
            setStateValue("");
          }
        } else {
          if (field) {
            setStateValue((prevData) => ({
              ...prevData,
              [field]: value,
            }));
          } else {
            setStateValue(value);
          }
        }
      }
      break;

    default:
      if (field) {
        setStateValue((prevData) => ({
          ...prevData,
          [field]: value,
        }));
      } else {
        setStateValue(value);
      }
      break;
  }
};
