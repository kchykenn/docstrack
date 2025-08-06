import * as React from 'react';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import type { BreadcrumbItem } from '@/types';
// import { NavigationMenuDtrack } from '../components/NavigationMenuDtrack';
// import { DataTableDtrack } from '../components/DataTableDtrack';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Documentation Track',
    href: '/dtracks',
  },

];

const OtherIndex: React.FC = () => {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Others" />
        edit here
    </AppLayout>
  );
};

export default OtherIndex;



