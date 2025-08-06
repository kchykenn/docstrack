import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { DataTableAddDivision } from '../components/DataTableAddDivision';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Add Division',
    href: '/addDivision',
  },

];

const OtherIndex: React.FC = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Division" />
        <div className="mt-4 p-4">
          <DataTableAddDivision />
        </div>
    </AppLayout>
  );
};

export default OtherIndex;