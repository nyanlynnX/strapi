import { axiosInstance } from '../../../../../../core/utils';
import { getFetchClient } from '../../../../../../utils/getFetchClient';

const fetchUser = async (id) => {
  const { get } = getFetchClient();
  const { data } = await get(`/admin/users/${id}`);

  return data.data;
};

const putUser = async (id, body) => {
  const { data } = await axiosInstance.put(`/admin/users/${id}`, body);

  return data.data;
};

export { fetchUser, putUser };
