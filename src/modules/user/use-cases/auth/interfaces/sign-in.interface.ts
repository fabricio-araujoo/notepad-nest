export type ISignInUseCaseInput = {
  email: string;
  password: string;
};

export type ISignInUseCaseOutput = {
  access_token: string;
};
