import * as React from "react";

/**
 * A simple hook for async data. e.g. Fetching from an API
 *
 * @remarks
 * Keeps state of an async request. e.g. fetching data from an API and
 * displaying a loading indicator before rendering the results.
 *
 * @param asyncFunction - Any function that returns a Promise.
 * @param immediate - Excecute the function immediately. Defaults to true.
 *
 * @public
 */
export function useAsync(asyncFunction, immediate = true) {
  const [status, setStatus] = React.useState("idle");
  const [data, setData] = React.useState();
  const [error, setError] = React.useState();

  // The execute function wraps asyncFunction and
  // handles setting state for pending, value, and error.
  // useCallback ensures the below useEffect is not called
  // on every render, but only if asyncFunction changes.
  const execute = React.useCallback(
    async (...args) => {
      setStatus("pending");
      setData(undefined);
      setError(undefined);

      return asyncFunction(...args)
        .then((response) => {
          setData(response);
          setStatus("success");
        })
        .catch((error) => {
          setError(error);
          setStatus("error");
        });
    },
    [asyncFunction]
  );

  // Call execute if we want to fire it right away.
  // Otherwise execute can be called later, such as
  // in an onClick handler.
  React.useEffect(() => {
    if (immediate) {
      execute().catch((error) => error);
    }
  }, [execute, immediate]);

  return { execute, status, data, error, setData };
}
