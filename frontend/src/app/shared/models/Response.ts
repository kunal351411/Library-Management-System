import { Book } from "./Book.model";
export interface Response
{
    success: boolean;
    message: string;
    data: Book[];
}