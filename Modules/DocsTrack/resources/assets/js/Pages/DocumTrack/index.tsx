import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem, Indexdata } from '@/types';
import { NavigationMenuDtrack } from '../components/NavigationMenuDtrack';
import { DataTableDtrack } from '../components/DataTableDtrack';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Documentation Track', href: '/dtracks' },
];

type Props = {
  dtracks: Indexdata[]
  depart_name: string
}

const DocumIndex: React.FC<Props> = ({ dtracks }) => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Documentation Track" />
      <div className="relative z-0 p-1">
        <NavigationMenuDtrack />
        <div className="p-4">
          <DataTableDtrack data={dtracks} />
        </div>
      </div>
    </AppLayout>
  );
};

export default DocumIndex;
