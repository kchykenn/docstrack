import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { DataTableAddDtrack } from '../components/DataTableAddDtrack';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Add Documentation Track',
    href: '/dtracks/create',
  },
];

const AddDtrack: React.FC = () => {
  const { props } = usePage<{ docstype: { id: number, docs_code: string, docs_name: string, docs_stat: string }[] }>();
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Documentation Track" />
      <div className="mt-4 p-4">
        <DataTableAddDtrack docstype={props.docstype} />
      </div>
    </AppLayout>
  );
};

export default AddDtrack;