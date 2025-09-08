import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head, usePage } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
import { DataTableAddDtrack } from '../components/DataTableAddDtrack';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Home',
    href: '/dtracks',
  },
  {
    title: 'Add Documentation Track',
    href: '/dtracks/create',
  },
];

const AddDtrack: React.FC = () => {
  const { props } = usePage<{
    docstype: { id: number, docs_code: string, docs_name: string, docs_stat: string }[],
    autoRouteNo: string,
    autoDocsConNo: string,
    autoOfficeConNo: string,
    dtracks: {
      id: number;
      route_no: string;
      docs_con_no: string;
      office_con_no: string;
      docs_subject: string;
      docs_type: string;
      remarks: string;
      seq_no: string;
      depart_from: string;
      ts_created_at: string | null;
      docs_destin: string;
      date: string | null;
      from_office: string | null;
      to_office: string | null;
      due_date: string | null;
    }[],
    departments: { id: number, depart_name: string }[],
    departName: string;
    departUser: string;
  }>()

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Add Documentation Track" />
      <div className="mt-4 p-4">
        <DataTableAddDtrack
          docstype={props.docstype}
          autoRouteNo={props.autoRouteNo}
          autoDocsConNo={props.autoDocsConNo}
          autoOfficeConNo={props.autoOfficeConNo}
          dtracks={props.dtracks}
          departments={props.departments}
          departName={props.departName}
          departUser={props.departUser}
        />
      </div>
    </AppLayout>
  )
}


export default AddDtrack;