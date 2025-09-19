export type Message = {
  id: string;
  text: string;
  sender: 'user' | 'model';
  isTyping?: boolean;
  json?: any;
};
