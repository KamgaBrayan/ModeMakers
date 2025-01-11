interface Notification {
  id: number;
  user: {
    user_id: number;
    user_name: string;
  };
  content: string;
  date: string;
  readed: boolean;
  received: boolean;
}
