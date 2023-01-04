import { getFetchClient } from '../../../../../../utils/getFetchClient';

const fetchData = async (search, notify) => {
  const { get } = getFetchClient();
  const {
    data: { data },
  } = await get(`/admin/users${search}`);

  notify();

  return data;
};

const deleteData = async (ids) => {
  const { post } = getFetchClient();
  console.log('/admin/users/batch-delete');

  await post('/admin/users/batch-delete', { ids });
};

export { deleteData, fetchData };
