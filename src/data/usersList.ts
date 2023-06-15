export interface ConnectedUser {
    id: string;
    username: string;
  }
  
export let connectedUsers: ConnectedUser[] = [];

export const updateUsersList = (users: ConnectedUser[]) => {
    connectedUsers = users
}

export const addNewUser = (user: ConnectedUser) => {
    connectedUsers.push(user)
}
