import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { File, Folder, Monitor, LayoutGrid, Book } from 'lucide-react'; // Added Book icon
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },

    {
        title: 'DocsTrack',
        href: '/dtracks',
        icon: Monitor,
    },

    {
        title: 'CHD RPO',
        href: '/chdrpo',
        icon: File,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'References',
        href: '#',
        icon: Folder,
        isActive: false,
        items: [
            {
                title: 'Division',
                href: '/addDivision',
            },
            {
                title: 'Department',
                href: '/addDepartment',
            },
            {
                title: 'Document Type',
                href: '/addDocsType',
            },
            {
                title: 'Action Type',
                href: '/addActionType',
            },
        ],
    },
    {
        title: 'Identity Access Mgmt',
        href: '#',
        icon: Folder,
        isActive: false,
        items: [
            {
                title: 'Users',
                href: '/iam/users',
            },
            {
                title: 'Roles',
                href: '/iam/roles',
            },
            {
                title: 'Permissions',
                href: '/iam/permissions',
            },
        ],
    },
];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}