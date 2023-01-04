import omit from 'lodash/omit';
import { getFetchClient } from '../../../utils/getFetchClient';

const fetchUser = async () => {
  const { get } = getFetchClient();
  const { data } = await get('/admin/users/me');

  return data.data;
};

const putUser = async (body) => {
  const dataToSend = omit(body, ['confirmPassword', 'currentTheme']);
  const { put } = getFetchClient();
  const { data } = await put('/admin/users/me', dataToSend);

  return { ...data.data, currentTheme: body.currentTheme };
};

export { fetchUser, putUser };
