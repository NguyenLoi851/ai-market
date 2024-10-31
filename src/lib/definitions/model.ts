
export type Model = {
    id: string;
    name: string;
    description: string,
    type: 'chat',
    date: string,
    row_num: number,
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