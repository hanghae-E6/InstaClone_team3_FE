import { useCallback, useState } from "react";

const useInputs = (initialState) => {
  const [value, setValue] = useState(initialState);
  const handler = useCallback(
    (event) => {
      setValue(event.target.value);
    },
    [value]
  );
  return [value, setValue, handler];
};

export default useInputs;
