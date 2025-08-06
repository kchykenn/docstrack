import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { DataTableAddDocsType } from '../components/DataTableAddDocsType';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Add Document Type',
    href: '/addDocsType',
  },

];

const OtherIndex: React.FC = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Document Type" />
        <div className="mt-4 p-4">
          <DataTableAddDocsType />
        </div>
    </AppLayout>
  );
};

export default OtherIndex;