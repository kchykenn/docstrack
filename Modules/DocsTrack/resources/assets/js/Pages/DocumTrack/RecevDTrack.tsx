import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem, RecevDtrack } from '@/types';
import { DataTableRecevDtrack } from '../components/DataTableRecevDtrack';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Home', href: '/dtracks' },
  { title: 'Received Docs', href: '/dtracks/recev' },
];

interface Props {
  dtracks: RecevDtrack[];

  docstype?: string;
  autoRouteNo?: string;
  autoDocsConNo?: string;
  autoOfficeConNo?: string;
  departments?: { id: number; depart_name: string }[];
  acttype?: { id: number; act_name: string }[];
  departName?: string;
  departUser?: string;
}

const RecevDTrack: React.FC<Props> = ({
  dtracks,
  docstype,
  autoRouteNo,
  autoDocsConNo,
  autoOfficeConNo,
  departments,
  acttype,
  departName,
  departUser
}) => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Received Documents" />
      <div className="relative z-0 p-4">
        <DataTableRecevDtrack
          data={dtracks}
          docstype={docstype}
          autoRouteNo={autoRouteNo}
          autoDocsConNo={autoDocsConNo}
          autoOfficeConNo={autoOfficeConNo}
          departments={departments}
          acttype={acttype}
          departName={departName}
          departUser={departUser}
        />
      </div>
    </AppLayout>
  );
};

export default RecevDTrack;
