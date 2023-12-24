import { useCallback, useEffect, useState } from "react";
import { boolean } from "yup";

const useSessionStorage = (
  key: string,
  defaultValue: string | Function | boolean,
) => {
  if (typeof window === "undefined") {
    // Return a default value and a no-op setter function
    return [defaultValue, () => {}];
  }
  return useStorage(key, defaultValue, window.sessionStorage);
};

const useStorage = (
  key: string,
  defaultValue: string | Function | boolean,
  storageObject: Storage,
) => {
  const [value, setValue] = useState(() => {
    const jsonValue = storageObject.getItem(key);
    if (jsonValue) return JSON.parse(jsonValue);

    if (typeof defaultValue === "function") {
      return defaultValue();
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    if (value === undefined) return storageObject.removeItem(key);
    storageObject.setItem(key, JSON.stringify(value));
  }, [key, value, storageObject]);

  const remove = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, remove];
};

export default useSessionStorage;
