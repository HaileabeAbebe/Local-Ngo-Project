export const handleResponse = async (response: Response) => {
  if (!response.ok) {
    let errorMessage = "An error occurred";
    const contentType = response.headers.get("Content-Type");

    if (contentType && contentType.includes("application/json")) {
      const errorData = await response.json();
      errorMessage = errorData.message;
    } else {
      errorMessage = await response.text();
    }

    throw new Error(errorMessage);
  }

  return response.json();
};
