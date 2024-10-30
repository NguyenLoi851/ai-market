
export type Model = {
    id: string;
    name: string;
    description: string,
    type: 'chat',
    date: string
  };
  
export type ModelView = {
    name: string;
    description: string,
    type: 'chat' | 'image'
}

export type ModelType = {
  type: 'chat' | 'image'
}