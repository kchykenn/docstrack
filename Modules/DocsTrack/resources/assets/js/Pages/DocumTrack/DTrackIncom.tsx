import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { NavigationMenuDtrack } from '../components/NavigationMenuDtrack';
import { DataTableIncomDtrack } from '../components/DataTableIncomDtrack';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Hme', href: '/dtracks' },
  { title: 'Incomming Docs', href: '/dtracks/incomming' },
];

type Props = {
  dtracks: any[]
  depart_name: string
}

const DTrackIncom: React.FC<Props> = ({ dtracks }) => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Documentation Track" />
      <div className="relative z-0">
        <NavigationMenuDtrack />
        <div className="p-4">
          <DataTableIncomDtrack data={dtracks} />
        </div>
      </div>
    </AppLayout>
  );
};

export default DTrackIncom;
