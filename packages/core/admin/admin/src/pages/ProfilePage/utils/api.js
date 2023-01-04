import omit from 'lodash/omit';
import { axiosInstance } from '../../../core/utils';
import { getFetchClient } from '../../../utils/getFetchClient';

const fetchUser = async () => {
  const { get } = getFetchClient();
  const { data } = await get('/admin/users/me');

  return data.data;
};

const putUser = async (body) => {
  const dataToSend = omit(body, ['confirmPassword', 'currentTheme']);
  const { data } = await axiosInstance.put('/admin/users/me', dataToSend);

  return { ...data.data, currentTheme: body.currentTheme };
};

export { fetchUser, putUser };
