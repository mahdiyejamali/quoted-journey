const processFetchRequest = async (url: any, timeout = 2000) => {  
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(timeout) });
    if (response.ok) {
      return response.json();
    }
    throw response.json();
  } catch (err: any) {
    if (err.name === "TimeoutError") {
      console.error("Fetch TimeoutError.");
    } else if (err.name === "AbortError") {
      console.error("Fetch AbortError.");
    } else if (err.name === "TypeError") {
      console.error("Fetch AbortSignal.timeout() method is not supported");
    } else {
      console.error(`Fetch Error: type: ${err.name}, message: ${err.message}`);
    }
  }
};

AbortSignal.timeout ??= function timeout(ms) {
  const abortController = new AbortController();
  setTimeout(() => abortController.abort(), ms);
  return abortController.signal;
}
  
export default processFetchRequest;