import { handleErrorMessage, handleSuccessMessage } from "@/utilities/helper";
import { useCallback, useState } from "react";

export default function useApi(baseUrl = process.env.NEXT_PUBLIC_API_URL) {
  const [processing, setProcessing] = useState(false);
  const [apiErrors, setApiErrors] = useState({});

  const request = useCallback(
    async (method, url, options = {}, onAction = {}) => {
      const { onSuccess, onError } = onAction;
      setProcessing(true);
      setApiErrors({});

      try {
        const isFormData = options.body instanceof FormData;
        const token = localStorage.getItem("token");

        const fetchOptions = {
          method,
          headers: {
            ...(token && { Authorization: `Bearer ${token}` }),
            ...(!isFormData &&
              method !== "GET" && {
                "Content-Type": "application/json",
                Accept: "application/json",
              }),
            ...options.headers,
          },
          ...options,
        };

        if (!isFormData && method !== "GET" && options.body) {
          fetchOptions.body = JSON.stringify(options.body);
        }

        const response = await fetch(`${baseUrl}${url}`, fetchOptions);

        const responseData = await response.json();

        if (!response?.ok) {
          if (responseData?.errors) {
            setApiErrors(responseData.errors);
            onError?.(responseData.errors);
          }
          if (responseData?.message) {
            handleErrorMessage({
              error: responseData,
              statusCode: response.status,
              method,
              url,
            });
          }
          return { error: responseData };
        }

        handleSuccessMessage(responseData, method, url);

        onSuccess?.(responseData);
        return responseData;
      } catch (error) {
        onError?.(error);
        handleErrorMessage({
          error,
          statusCode: error?.status || 500,
          method,
          url,
        });
        return { error: error?.message || "Something went wrong" };
      } finally {
        setProcessing(false);
      }
    },
    [baseUrl]
  );

  const post = useCallback(
    (url, options, onAction) => request("POST", url, options, onAction),
    [request]
  );

  const put = useCallback(
    (url, options, onAction) => request("PUT", url, options, onAction),
    [request]
  );

  const get = useCallback(
    (url, onAction) => request("GET", url, {}, onAction),
    [request]
  );

  return {
    processing,
    apiErrors,
    request,
    post,
    put,
    get,
  };
}
