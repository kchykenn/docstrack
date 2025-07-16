import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { DataTableAddDtrack } from '../components/DataTableAddDtrack';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Add Documentation Track',
    href: '/dtracks/create',
  },

];

const OtherIndex: React.FC = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Documentation Track" />
        <div className="mt-4 p-4">
          <DataTableAddDtrack />
        </div>
    </AppLayout>
  );
};

export default OtherIndex;