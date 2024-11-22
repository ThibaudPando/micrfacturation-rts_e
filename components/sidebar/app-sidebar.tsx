"use client";

import {
	Database,
	FileText,
	Frame,
	GalleryVerticalEnd,
	HomeIcon,
	Plus,
} from "lucide-react";
import * as React from "react";

import { NavMain } from "@/components/sidebar/nav-main";
import { NavUser } from "@/components/sidebar/nav-user";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

// This is sample data.
const data = {
	user: {
		name: "Thibaud Cadoret",
		email: "thibaud.cadoret@gmail.com ",
		avatar: "/avatars/shadcn.jpg",
	},
	teams: [
		{
			name: "RTS",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
	],
	navMain: [
		{
			title: "Accueil",
			url: "/",
			icon: HomeIcon,
			isActive: true,
		},
		{
			title: "Devis",
			url: "/devis/new",
			icon: FileText,
			isActive: true,
			action: (
				<Link href="/devis/new">
					<Plus />
				</Link>
			),
		},
		{
			title: "Base de Données",
			url: "/database",
			icon: Database,
			items: [
				{
					title: "Clients",
					url: "/database/clients",
				},
			],
		},
	],
	projects: [
		{
			name: "Design Engineering",
			url: "#",
			icon: Frame,
		},
	],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarContent>
				<NavMain items={data.navMain} />
				{/* <NavProjects projects={data.projects} /> */}
			</SidebarContent>
			<SidebarFooter>
				<NavUser user={data.user} />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
