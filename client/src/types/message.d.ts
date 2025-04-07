export type Message = {
  id: string,
  senderId: string,
  content: string,
  createdAt: string,
  optimistic: boolean,
  status,
}

export type MessagesData = {
  sender: User,
  receiver: User,
  messages: Message[],
}