"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Minus, Plus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

export function DevisForm({ data }: { data?: (values: any) => void }) {
	const { control, register, handleSubmit, watch } = useForm({
		defaultValues: {
			name: "",
			address: "",
			description: {
				titre: "Prestation de balayage",
				content: "Balayage avec chauffeur",
			},
			products: [
				{ name: "Balayage avec chauffeur", price: 125, quantity: 7 },
				{ name: "Frais de transfert", price: 100, quantity: 1 },
			],
			dureeValidite: "1 mois",
			numero: "",
			dateEmission: new Date().toISOString().split("T")[0],
		},
		mode: "onChange",
	});

	const { fields, append, remove } = useFieldArray({
		control,
		name: "products",
	});
	const onSubmit = (values) => {
		data(values);
	};

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className="grid  gap-4">
				<Input {...register("name")} placeholder="Nom du client" />
				<Input {...register("address")} placeholder="Adresse" />
				<Input
					{...register("description.titre")}
					placeholder="Titre"
					className="col-span-2"
				/>
				<Textarea
					{...register("description.content")}
					placeholder="Contenu"
					className="col-span-2"
				/>
				<Input
					{...register("dureeValidite")}
					placeholder="Durée de validité"
				/>
				<Input {...register("numero")} placeholder="Numéro" />
				<Input
					{...register("dateEmission")}
					placeholder="Date d'émission"
					type="date"
				/>
				{fields.map((product, index) => (
					<div key={product.id} className="flex flex-row  col-span-2">
						<Input
							{...register(`products.${index}.name`)}
							placeholder="Nom du produit"
							className="w-full rounded-e-none"
						/>
						<Input
							{...register(`products.${index}.price`)}
							placeholder="Tarifs"
							className="w-24 rounded-none"
						/>
						<Input
							{...register(`products.${index}.quantity`)}
							placeholder="Quantité"
							className="w-24 rounded-none"
						/>
						<Button
							type="button"
							variant="destructive"
							onClick={() => remove(index)}
							disabled={fields.length === 1}
							className="rounded-s-none"
						>
							<Minus />
						</Button>
					</div>
				))}
				<Button
					type="button"
					variant="outline"
					onClick={() => append({ name: "", price: 0, quantity: 0 })}
					className=" mx-auto col-span-2 "
					size="icon"
				>
					<Plus />
				</Button>
				<Button type="submit" className="col-span-2 ">
					Valider <Check />
				</Button>
			</form>
		</>
	);
}
