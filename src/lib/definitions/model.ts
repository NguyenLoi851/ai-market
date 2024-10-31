
export type Model = {
    id: string;
    name: string;
    description: string,
    type: 'chat' | 'image',
    date?: string,
    label: string,
    endpoint: string,
    key: string,
    row_num?: number,
  };
  
export type ModelView = {
    name: string;
    description: string,
    type: 'chat' | 'image',
    row_num: number,
    blockchainId?: number,
    creator?: string,
    feePerPrompt?: number,
    usageCount?: number,
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
    type : "chat",
    endpoint: '',
    key: '',
    row_num: 1
  },
] as const;

