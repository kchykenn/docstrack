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
  const { props } = usePage<{
    docstype: { id: number, docs_code: string, docs_name: string, docs_stat: string }[],
    autoRouteNo: string,
    autoDocsConNo: string,
    autoOfficeConNo: string,
    dtracks: {
      id: number,
      route_no: string,
      docs_con_no: string,
      office_con_no: string,
      docs_subject: string,
      docs_type: string,
      seq_no: string,
      docs_destin: string
      remarks: string
    }[],
    departments: { id: number, depart_name: string }[]
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
        />
      </div>
    </AppLayout>
  )
}


export default AddDtrack;