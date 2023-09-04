export interface ITodo {
  id: number;
  content: string;
  isCompleted: boolean;
}

export type TodoListType = Array<ITodo>;

export const FILTER_KEYWORD = {
  ALL: "ALL",
  COMPLETED: "COMPLETED",
  IN_COMPLETED: "IN_COMPLETED",
};

export type FilterKeywordType = keyof typeof FILTER_KEYWORD;
