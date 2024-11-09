"use client";

import { create } from "zustand";

export const useBreadcrumbStore = create<{
	breadcrumb: string[];
	setBreadcrumb: (breadcrumb: string[]) => void;
}>((set) => ({
	breadcrumb: ["Accueil"],
	setBreadcrumb: (breadcrumb) => set({ breadcrumb }),
}));
