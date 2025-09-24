export interface Todo {
    Status: boolean;
    Thing: string;
    Editing: boolean;
    TodoId: string;
}

export enum TodoStatusType {
    All,
    Active,
    Completed
}