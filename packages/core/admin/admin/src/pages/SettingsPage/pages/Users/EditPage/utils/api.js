import { getFetchClient } from '../../../../../../utils/getFetchClient';

const fetchUser = async (id) => {
  const { get } = getFetchClient();
  const { data } = await get(`/admin/users/${id}`);

  return data.data;
};

const putUser = async (id, body) => {
  const { put } = getFetchClient();

  const { data } = await put(`/admin/users/${id}`, body);

  return data.data;
};

export { fetchUser, putUser };
