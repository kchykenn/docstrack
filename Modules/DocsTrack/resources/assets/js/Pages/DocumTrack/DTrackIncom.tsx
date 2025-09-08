import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { DataTableIncomDtrack } from '../components/DataTableIncomDtrack';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Home', href: '/dtracks' },
  { title: 'Incoming Docs', href: '/dtracks/incoming' },
];

export type Dtrack = {
    id: number
    route_no: string
    docs_con_no: string
    office_con_no: string
    docs_subject: string
    docs_type: string
    docs_destin: string
    depart_from: string | null
    ts_created_at: string | null  
}

type Props = {
  dtracks: Dtrack[]
  depart_name: string
}

const DTrackIncom: React.FC<Props> = ({ dtracks }) => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Incoming Documents" />
      <div className="relative z-0 p-4">
        <DataTableIncomDtrack data={dtracks} />
      </div>
    </AppLayout>
  );
};

export default DTrackIncom;
