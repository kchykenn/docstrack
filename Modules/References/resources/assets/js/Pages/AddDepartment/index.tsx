import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { DataTableAddDepartment, Department } from '../components/DataTableAddDepartment';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Add Departments',
    href: '/addDepartment',
  },

];

const DepartmentIndex: React.FC = () => {
  const { props } = usePage<{ divisions: { id: number, division_name: string }[], autoDepartCode: string, department: unknown[] }>();
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Departments" />
      <div className="mt-4 p-4">
        <DataTableAddDepartment divisions={props.divisions} autoDepartCode={props.autoDepartCode}
        department={props.department as Department[]}
        />
      </div>
    </AppLayout>
  );
};

export default DepartmentIndex;