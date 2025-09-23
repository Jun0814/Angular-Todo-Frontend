export interface Todo {
    Status: boolean;
    Thing: string;
    Editing: boolean;
}

export enum TodoStatusType {
    All,
    Active,
    Completed
}