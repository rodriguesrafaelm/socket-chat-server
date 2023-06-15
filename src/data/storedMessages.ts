import { Message } from "../interfaces/Message";

class MessageStorage {
    messages: Message[];
    constructor(){
        this.messages = [];
    }
    pushNewMessage = (message: Message) =>{
        this.messages.push(message);
    }
    getAllMessages = () => {
        return this.messages
    }
    clearMessages = () => {
      this.messages = [];
    }
}
export default new MessageStorage;