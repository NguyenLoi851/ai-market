export type Message = {
  /**
  A unique identifier for the message.
     */
  id?: string;
  /**
The timestamp of the message.
   */
  createdAt?: Date;
  /**
Text content of the message.
   */
  content: string;

  /**
   * `function` and `tool` roles are deprecated.
   */
  role: "system" | "user" | "assistant" | "function" | "data" | "tool";
};

export type DbMessage = Omit<Message, 'content'> & {
  content: string | Array<string>
}

export type CreateMessage = Omit<Message, 'id'> & {
  id?: Message['id'];
};


