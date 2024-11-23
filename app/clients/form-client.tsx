"use client";

import { clientAction } from "@/actions/action";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import * as z from "zod";

// Zod schema for form validation
const contactSchema = z.object({
	name: z.string().min(1, "Le nom est requis"),
	email: z.string().email("Email invalide"),
	phone: z
		.string()
		.min(10, "Le numéro de téléphone doit avoir au moins 10 chiffres"),
});

const formSchema = z.object({
	name: z.string().min(1, "Le nom est requis"),
	email: z.string().email("Email invalide"),
	siret: z.string().length(14, "Le numéro SIRET doit contenir 14 chiffres"),
	contacts: z.array(contactSchema).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function FormClient() {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			siret: "",
			contacts: [],
		},
	});

	const { fields, append, remove } = useFieldArray({
		control: form.control,
		name: "contacts",
	});

	return (
		<Form {...form}>
			<form
				action={clientAction}
				className="gap-8 p-4 grid   w-full grid-cols-2"
			>
				<Card>
					<CardHeader>
						<CardTitle>Ajouter un nouveau client</CardTitle>
						<CardDescription>
							Entrez les informations du client et de ses
							contacts.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nom du client</FormLabel>
									<FormControl>
										<Input
											placeholder="Nom du client"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email du client</FormLabel>
									<FormControl>
										<Input
											placeholder="email@example.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="siret"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Numéro SIRET</FormLabel>
									<FormControl>
										<Input
											placeholder="12345678901234"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Contacts</CardTitle>
						<CardDescription>
							Ajoutez les contacts associés à ce client.
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						{fields.map((field, index) => (
							<Card key={field.id}>
								<CardContent className="pt-6 space-y-4">
									<FormField
										control={form.control}
										name={`contacts.${index}.name`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Nom du contact
												</FormLabel>
												<FormControl>
													<Input
														placeholder="Nom du contact"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`contacts.${index}.email`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Email du contact
												</FormLabel>
												<FormControl>
													<Input
														placeholder="contact@example.com"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
									<FormField
										control={form.control}
										name={`contacts.${index}.phone`}
										render={({ field }) => (
											<FormItem>
												<FormLabel>
													Téléphone du contact
												</FormLabel>
												<FormControl>
													<Input
														placeholder="0123456789"
														{...field}
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</CardContent>
								<CardFooter>
									<Button
										type="button"
										variant="destructive"
										onClick={() => remove(index)}
									>
										<Trash2 className="mr-2 h-4 w-4" />
										Supprimer ce contact
									</Button>
								</CardFooter>
							</Card>
						))}
						<Button
							type="button"
							variant="outline"
							onClick={() =>
								append({ name: "", email: "", phone: "" })
							}
						>
							<PlusCircle className="mr-2 h-4 w-4" />
							Ajouter un contact
						</Button>
					</CardContent>
					<CardFooter></CardFooter>
				</Card>
				<Button
					type="submit"
					disabled={isSubmitting}
					className="w-8/12 col-span-2 mx-auto "
				>
					{isSubmitting
						? "Envoi en cours..."
						: "Ajouter le client et les contacts"}
				</Button>
			</form>
		</Form>
	);
}
