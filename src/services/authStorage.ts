import * as Keychain from 'react-native-keychain';

export const saveToken = async (token: string) => {
  await Keychain.setGenericPassword('auth', token);
};

export const getToken = async () => {
  const credentials = await Keychain.getGenericPassword();

  if (!credentials) {
    return null;
  }

  return credentials.password;
};

export const removeToken = async () => {
  await Keychain.resetGenericPassword();
};