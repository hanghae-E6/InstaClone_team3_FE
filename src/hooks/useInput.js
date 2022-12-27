import { useState, useEffect } from "react";

const useInput = (initValue, validationParam, randomStringParam) => {
  const [value, setValue] = useState(initValue);
  const [isValid, setValid] = useState(false);

  const numbers = "0123456789";

  const randomString = () => {
    let result = randomStringParam;
    if (result.indexOf("@") > 0) {
      result = result.split("@")[0];
    }
    for (let i = result.length; i < 16; ++i) {
      result += numbers[Math.floor(Math.random() * numbers.length)];
    }
    return result;
  };

  useEffect(() => {
    if (value !== initValue) {
      validate();
    }
  }, [value]);

  const validate = () => {
    if (validationParam.REGEX.test(value) === true) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const onChange = (e) => {
    setValue(e.target.value);
    validate();
  };

  const onClickRandomString = () => {
    setValue(randomString());
  };

  return [value, isValid, onChange, onClickRandomString];
};

export default useInput;
