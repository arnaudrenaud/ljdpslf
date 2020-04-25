const callApi = async (
  path: string,
  method = 'GET',
  body = {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const response = await fetch(`/api/${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const responseText = await response.text();
  return responseText.length ? JSON.parse(responseText) : null;
};

export { callApi };
