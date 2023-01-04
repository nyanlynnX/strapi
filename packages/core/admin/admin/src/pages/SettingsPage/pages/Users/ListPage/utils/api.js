import { axiosInstance } from '../../../../../../core/utils';
import { getFetchClient } from '../../../../../../utils/getFetchClient';

const fetchData = async (search, notify) => {
  const { get } = getFetchClient();
  const {
    data: { data },
  } = await get(`/admin/users${search}`);

  console.log(`/admin/users${search}`);

  notify();

  return data;
};

const deleteData = async (ids) => {
  await axiosInstance.post('/admin/users/batch-delete', { ids });
};

export { deleteData, fetchData };
