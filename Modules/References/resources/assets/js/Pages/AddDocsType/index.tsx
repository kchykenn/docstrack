import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { DataTableAddDocsType, DocsType } from '../components/DataTableAddDocsType';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Add Document Type',
    href: '/addDocsType',
  },

];

const DocsIndex: React.FC = () => {
  const { props } = usePage<{ autoDocsCode: string, docstype: unknown[] }>();
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Document Type" />
      <div className="mt-4 p-4">
        <DataTableAddDocsType autoDocsCode={props.autoDocsCode}
          docstype={props.docstype as DocsType[]}
        />
      </div>
    </AppLayout>
  );
};

export default DocsIndex;