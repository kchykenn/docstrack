import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { DataTableAddActType, ActType } from '../components/DataTableAddActType';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Add Type of Action Taken',
    href: '/addDocsType',
  },

];

const ActionIndex: React.FC = () => {
  const { props } = usePage<{ autoActCode: string, acttype: unknown[] }>();
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Document Type" />
      <div className="mt-4 p-4">
        <DataTableAddActType autoActCode={props.autoActCode}
          acttype={props.acttype as ActType[]}
        />
      </div>
    </AppLayout>
  );
};

export default ActionIndex;