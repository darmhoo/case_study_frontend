import { useContext, useEffect, useCallback, useState } from "react";
import { StoreContext } from "./storeContext";
import { decrypt, encrypt } from "../services/storageEncryption";

const useStore = <T>(
    key: string,
    initialValue?: T | null,
    storeInLocalStorage: boolean = true
): [T, (value: T) => void, boolean] => {
    const { store, setStore } = useContext(StoreContext);

    const initializeState = useCallback(() => {
        if (storeInLocalStorage && typeof window !== "undefined") {
            const storedValue = localStorage.getItem(key);
            return storedValue !== null ? JSON.parse(decrypt(storedValue)) : initialValue;
        }

        return initialValue || null;
    }, [key, initialValue, storeInLocalStorage]);

    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [localValue, setLocalValue] = useState<T | undefined>(initializeState);

    useEffect(() => {
        setIsLoading(true);

        if (storeInLocalStorage && localValue !== undefined) {
            const itemToStore = encrypt(JSON.stringify(localValue))
            localStorage.setItem(key, itemToStore);
        }
        setStore(prevStore => ({
            ...prevStore,
            [key]: localValue,
        }));

        setIsLoading(false);
    }, [key, localValue, storeInLocalStorage, setStore]);

    const setValue = useCallback(
        (value: T) => {
            setLocalValue(value);
            setStore(prevStore => ({
                ...prevStore,
                [key]: value,
            }));

            if (storeInLocalStorage) {
                const itemToStore = encrypt(JSON.stringify(value))

                localStorage.setItem(key, JSON.stringify(itemToStore));
            }
        },
        [key, storeInLocalStorage, setStore]
    );

    return [store[key] !== undefined ? (store[key] as T) : (localValue as T), setValue, isLoading];
};

export default useStore;
