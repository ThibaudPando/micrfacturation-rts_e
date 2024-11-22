"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Printer } from "lucide-react";
import { useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Devis } from "../Devis";
import { DevisForm } from "../DevisForm.ui";

export default function DevisPage() {
	const [formData, setFormData] = useState<any>(null);

	const contentRef = useRef<HTMLDivElement>(null);
	const handlePrint = useReactToPrint({ contentRef });

	return (
		<div className="flex flex-col items-center justify-center h-full">
			<div className="mt-4 w-8/12">
				<Card>
					<CardHeader>
						<CardTitle>Formulaire de Devis</CardTitle>
					</CardHeader>
					<CardContent className="flex flex-col ">
						<DevisForm data={setFormData} />
						<Button className="mt-4 " onClick={() => handlePrint()}>
							Imprimer <Printer />
						</Button>
					</CardContent>
				</Card>
			</div>
			<Devis
				{...formData}
				products={formData?.products.filter(
					(product) =>
						product.price || product.quantity || product.name
				)}
				contentRef={contentRef}
			/>
		</div>
	);
}
