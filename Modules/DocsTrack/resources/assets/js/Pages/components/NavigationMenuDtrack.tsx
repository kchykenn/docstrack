"use client";

import * as React from "react";
import { Link } from "@inertiajs/react";
import { CircleCheckIcon, CircleHelpIcon, CircleIcon } from "lucide-react"
import { FilePlus, Inbox, Send } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import AppLogoDTrack from '@/components/app-logoDTrack';


export function NavigationMenuDtrack() {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
            <Link href="/dtracks">Home</Link>
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Actions</NavigationMenuTrigger>
          <NavigationMenuContent className="absolute z-50 bg-white shadow-md border rounded-md p-4">
            <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium flex flex-col items-center">
                      <AppLogoDTrack />
                      CHD CARAGA
                    </div>
                    <p className="text-muted-foreground text-xs leading-tight text-center">
                      Department of Health - Caraga Region Documents Tracking System
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem
                href="/dtracks/create"
                title={
                  <span className="flex items-center gap-2">
                    <FilePlus className="w-4 h-4 text-primary" />
                    New Documents
                  </span>
                }
              >
                Adding of New Documents to the system.
              </ListItem>

              <ListItem
                href="/dtracks/incoming"
                title={
                  <span className="flex items-center gap-2">
                    <Inbox className="w-4 h-4 text-primary" />
                    Incoming Documents
                  </span>
                }
              >
                Show the list of all incoming documents.
              </ListItem>

              <ListItem
                href="/dtracks/outgoing"
                title={
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4 text-primary" />
                    Outgoing Documents
                  </span>
                }
              >
                Show the list of all outgoing documents.
              </ListItem>

              <ListItem
                href="/dtracks/received"
                title={
                  <span className="flex items-center gap-2">
                    <Inbox className="w-4 h-4 text-primary" />
                    Receive Documents
                  </span>
                }
              >
                Show the list of all received documents.
              </ListItem>


            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Reports</NavigationMenuTrigger>
          <NavigationMenuContent className="absolute z-50 bg-white shadow-md border rounded-md p-4">
            <ul className="grid w-[200px] gap-4">
              <li>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleHelpIcon />
                    Backlog
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleIcon />
                    To Do
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="#" className="flex-row items-center gap-2">
                    <CircleCheckIcon />
                    Done
                  </Link>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}

function ListItem({
  title,
  children,
  href,
  ...props
}: Omit<React.ComponentPropsWithoutRef<"li">, "title"> & { href: string; title: React.ReactNode }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
