import { Message } from "./message";

type JSONValue = null | string | number | boolean | {
    [value: string]: JSONValue;
} | Array<JSONValue>;

export type ChatRequestOptions = {
    /**
  Additional headers that should be to be passed to the API endpoint.
   */
    headers?: Record<string, string> | Headers;
    /**
  Additional body JSON properties that should be sent to the API endpoint.
   */
    body?: object;
    /**
  Additional data to be sent to the API endpoint.
     */
    data?: JSONValue;

    /**
     * Allow submitting an empty message. Defaults to `false`.
     */
    allowEmptySubmit?: boolean;

};

export type Chat = {
    id: string,

    createdAt : Number,

    messages : Array<Message>,

    userId : string,

}

export type ChatDb = {
  id: string,

  createdAt : Number,

  content : string,

  userId : string,

}