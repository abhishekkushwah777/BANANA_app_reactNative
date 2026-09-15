


export type AppStackParamList = {
  Home: undefined;
  Chat: {
    userId: string;
    username: string;
  };
  AddFriends: undefined;
  MyProfile: undefined;
  Requests: undefined;
  LocalSearch: undefined;
};

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register1: undefined;
  Register2: {
    email: string;
  }
};