import { useCallback, useState  } from "react";

const useHttp = () => {

    const request = useCallback(async (url, method = "GET", headers = {"Content-Type" : "Application/json"}, body = null) => {

        try {
            const respounse = await fetch(url, {method, body, headers});

            if (!respounse.ok) {
                throw new Error(`Could not get data ${url}, status${respounse.status}`)
            }

            const data = await respounse.json();
            return data
        } catch (e) {
            throw new Error(e);
        }

    },[])

    return request
}

export default useHttp;