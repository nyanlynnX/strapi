import { getFetchClient } from '../../../../../utils/getFetchClient';
import prefixAllUrls from './prefixAllUrls';

const fetchProjectSettings = async () => {
  const { get } = getFetchClient();
  const { data } = await get('/admin/project-settings');

  return prefixAllUrls(data);
};

const postProjectSettings = async (body) => {
  const { post } = getFetchClient();
  const { data } = await post('/admin/project-settings', body);

  return prefixAllUrls(data);
};

export { fetchProjectSettings, postProjectSettings };
