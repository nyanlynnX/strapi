import { axiosInstance } from '../../../../../core/utils';
import { getFetchClient } from '../../../../../utils/getFetchClient';
import prefixAllUrls from './prefixAllUrls';

const fetchProjectSettings = async () => {
  const { get } = getFetchClient();
  const { data } = await get('/admin/project-settings');

  return prefixAllUrls(data);
};

const postProjectSettings = async (body) => {
  const { data } = await axiosInstance.post('/admin/project-settings', body);

  return prefixAllUrls(data);
};

export { fetchProjectSettings, postProjectSettings };
