import { PageProps as InertiaPageProps } from '@inertiajs/react';
import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export type PageProps<T = object> = InertiaPageProps<T> & SharedData;

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    [key: string]: unknown;
}

export interface User {
    id: number;
    username: string;
    full_name: string;
    email: string;
    avatar?: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    //[key: string]: unknown; // This allows for additional properties...
}

export interface Role {
    id: number;
    name: string;
    guard_name: string;
}

export interface Permission {
    id: number;
    name: string;
    module: string;
    guard_name: string;
}


export type IncomDTrack = {
    id: number
    route_no: string 
    docs_con_no: string
    office_con_no: string
    docs_subject: string
    docs_type: string
    act_taken: string | null
    status: number
    depart_from: string | null
    docs_destin: string
    ts_created_at: string | null  
}

export type Dtrack = {
    id: number
    route_no: string
    docs_con_no: string
    office_con_no: string
    docs_subject: string
    docs_type: string
    docs_destin: string
    act_taken: string | null
    status: number
    depart_from: string | null
    ts_created_at: string | null  
}

export type AddDtrack = {
  id: number;
  route_no: string;
  docs_con_no: string;
  office_con_no: string;
  docs_subject: string;
  docs_type: string;
  remarks: string;
  seq_no: string;
  docs_destin: string;
  act_taken: string;
  date: string | null;
  depart_user: string | null;
  depart_from: string | null;
  due_date: string | null;
  ts_created_at: string | null;
};

export type RecevDtrack = {
    id: number
    route_no: string
    docs_con_no: string
    office_con_no: string
    docs_subject: string
    docs_type: string
    docs_destin: string
    act_taken: string | null
    status: number
    depart_from: string | null
    depart_user: string | null
    remarks: string | null
    ts_created_at: string | null  
}

export type Indexdata = {
    id: number
    route_no: string
    docs_con_no: string
    office_con_no: string
    docs_subject: string
    docs_type: string
    docs_destin: string
    act_taken: string | null
    status: number
    depart_from: string | null
    ts_created_at: string | null  
}