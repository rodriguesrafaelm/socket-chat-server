import { Message } from "../interfaces/Message";

export let inMemoryMessages: Message[] = [];

export const pushNewMessage = (message: Message) =>{
    inMemoryMessages.push(message);
}