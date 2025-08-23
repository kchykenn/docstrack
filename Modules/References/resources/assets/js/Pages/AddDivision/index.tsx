import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { DataTableAddDivision, Division } from '../components/DataTableAddDivision';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Add Division',
    href: '/addDivision',
  },

];

const DivisionIndex: React.FC = () => {
  const { props } = usePage<{ autoDivisionCode: string, divisions: unknown[] }>();
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="References Division" />
      <div className="mt-4 p-4">
        <DataTableAddDivision
          autoDivisionCode={props.autoDivisionCode}
          divisions={props.divisions as Division[]}
        />
      </div>
    </AppLayout>
  );
};;

export default DivisionIndex;