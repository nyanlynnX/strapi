import React, { useState } from 'react';
import { useIntl } from 'react-intl';
import {
  SettingsPageTitle,
  DynamicTable,
  useRBAC,
  useFocusWhenNavigate,
} from '@strapi/helper-plugin';
import { HeaderLayout, ContentLayout, ActionLayout } from '@strapi/design-system/Layout';
import { Main } from '@strapi/design-system/Main';
import adminPermissions from '../../../../../permissions';
import TableRows from './TableRows';
import tableHeaders from './utils/tableHeaders';
import PaginationFooter from './PaginationFooter';
import Modal from './Modal';
import Filters from '../../../components/Filters';
import getDisplayedFilters from './utils/getDisplayedFilters';
import getDefaultMessage, { actionTypes } from './utils/getActionTypesDefaultMessages';
import useAuditLogsData from './hooks/useAuditLogsData';

const ListView = () => {
  const { formatMessage } = useIntl();
  const {
    allowedActions: { canRead },
  } = useRBAC(adminPermissions.settings.auditLogs);
  const [modalLogId, setModalLogId] = useState(null);
  const { auditLogs, users, isLoading } = useAuditLogsData({ canRead });

  useFocusWhenNavigate();

  const actionOptions = Object.keys(actionTypes).map((action) => {
    return {
      label: formatMessage(
        {
          id: `Settings.permissions.auditLogs.${action}`,
          defaultMessage: getDefaultMessage(action),
        },
        { model: '' }
      ),
      customValue: action,
    };
  });

  const userOptions = users?.results.map((user) => {
    return {
      label: `${user.firstname} ${user.lastname}`,
      // Combobox expects a string value
      customValue: user.id.toString(),
    };
  });

  const displayedFilters = getDisplayedFilters({ actionOptions, userOptions });

  const title = formatMessage({
    id: 'global.auditLogs',
    defaultMessage: 'Audit Logs',
  });

  const headers = tableHeaders.map((header) => ({
    ...header,
    metadatas: {
      ...header.metadatas,
      label: formatMessage(header.metadatas.label),
    },
  }));

  return (
    <Main aria-busy={isLoading}>
      <SettingsPageTitle name={title} />
      <HeaderLayout
        title={title}
        subtitle={formatMessage({
          id: 'Settings.permissions.auditLogs.listview.header.subtitle',
          defaultMessage: 'Logs of all the activities that happened in your environment',
        })}
      />
      <ActionLayout startActions={<Filters displayedFilters={displayedFilters} />} />
      <ContentLayout canRead={canRead}>
        <DynamicTable
          contentType="Audit logs"
          headers={headers}
          rows={auditLogs?.results || []}
          withBulkActions
          isLoading={isLoading}
        >
          <TableRows
            headers={headers}
            rows={auditLogs?.results || []}
            onOpenModal={(id) => setModalLogId(id)}
          />
        </DynamicTable>
        <PaginationFooter pagination={auditLogs?.pagination} />
      </ContentLayout>
      {modalLogId && <Modal handleClose={() => setModalLogId(null)} logId={modalLogId} />}
    </Main>
  );
};

export default ListView;
