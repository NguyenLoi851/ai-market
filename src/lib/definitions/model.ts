
export type Model = {
    id: string;
    name: string;
    description: string,
    type: 'chat',
    date: string,
    label: string,
  };
  
export type ModelView = {
    name: string;
    description: string,
    type: 'chat' | 'image'
}

export type ModelType = {
  type: 'chat' | 'image'
}

export const DEFAULT_MODEL_NAME: Model['name'] = 'meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo';

export const models : Array<Model> = [
  {
    label: 'GPT 4o mini',
    name: 'gpt-4o-mini',
    description: 'Small model for fast, lightweight tasks',
    id: 'a',
    date: '',
    type : "chat"
  },
] as const;

