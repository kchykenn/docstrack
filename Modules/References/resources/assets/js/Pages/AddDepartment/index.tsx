import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { DataTableAddDepartment } from '../components/DataTableAddDepartment';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Add Departments',
    href: '/addDepartment',
  },

];

const OtherIndex: React.FC = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Departments" />
        <div className="mt-4 p-4">
          <DataTableAddDepartment />
        </div>
    </AppLayout>
  );
};

export default OtherIndex;