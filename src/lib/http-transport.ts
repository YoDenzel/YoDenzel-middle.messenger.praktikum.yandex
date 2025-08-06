const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

type Method = (typeof METHODS)[keyof typeof METHODS];

interface RequestOptions {
  headers?: Record<string, string>;
  data?: Record<string, unknown>;
  method?: Method;
  timeout?: number;
}

interface HTTPTransportOptions {
  headers?: Record<string, string>;
  data?: Record<string, unknown>;
  timeout?: number;
}

function queryStringify(data: Record<string, unknown>): string {
  let result = "?";
  Object.entries(data).forEach(([key, value], index, arr) => {
    result += `${key}=${value}${index < arr.length - 1 ? "&" : ""}`;
  });

  return result;
}

class HTTPTransport {
  get = (url: string, options: HTTPTransportOptions = {}): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.GET }, options.timeout);
  };

  put = (url: string, options: HTTPTransportOptions = {}): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.PUT }, options.timeout);
  };

  post = (url: string, options: HTTPTransportOptions = {}): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.POST }, options.timeout);
  };

  delete = (url: string, options: HTTPTransportOptions = {}): Promise<XMLHttpRequest> => {
    return this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);
  };

  request = (url: string, options: RequestOptions, timeout = 5000): Promise<XMLHttpRequest> => {
    const { headers = {}, data, method } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject("No method");
        return;
      }
      const xhr = new XMLHttpRequest();

      const isGet = method === METHODS.GET;

      xhr.open(method, isGet && !!data ? `${url}${queryStringify(data)}` : url);

      for (const [key, value] of Object.entries(headers)) {
        xhr.setRequestHeader(key, value as string);
      }

      xhr.onload = () => {
        resolve(xhr);
      };
      xhr.timeout = timeout;
      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
