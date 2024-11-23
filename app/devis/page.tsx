"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function DevisPage() {
	return (
		<div>
			<h1 className="text-2xl font-bold">Devis </h1>
			<div className="grid grid-cols-3 gap-4">
				<Card>
					<CardHeader>
						<CardTitle>Devis</CardTitle>
					</CardHeader>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Devis</CardTitle>
					</CardHeader>
				</Card>
			</div>
		</div>
	);
}
