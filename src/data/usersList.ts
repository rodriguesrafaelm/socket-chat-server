import { ConnectedUser } from "../interfaces/ConnectedUser";

class UsersList {
  private connectedUsers: ConnectedUser[] = []
  constructor() {
    this.connectedUsers = [];
  }
  
  addNewUser = (user: ConnectedUser) => {
    this.connectedUsers.push(user)
  }

  updateUsersList = (users: ConnectedUser[]) => {
    this.connectedUsers = users
  }

  getAllConnectedUsers(){
    return this.connectedUsers
  }

  removeUserBySocketId(socketId: string){
    const newList = this.connectedUsers.filter((user) => user.id !== socketId);
    this.updateUsersList(newList);
  }
}

export default new UsersList;