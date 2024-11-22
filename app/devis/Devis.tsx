"use client";
import { Logo } from "@/components/logo";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

export function Devis({
	numero,
	dateEmission,
	dureeValidite,
	name,
	adresse,
	products,
	description,
	infosClient,
	contentRef,
}) {
	const total =
		products?.reduce(
			(total, product) => total + product.price * product.quantity,
			0
		) ?? 0;

	const TableDevis = (
		<Table className=" ">
			<TableHeader>
				<TableRow>
					<TableHead className="font-bold text-foreground	">
						Description
					</TableHead>
					<TableHead className="font-bold text-center text-foreground">
						Quantité
					</TableHead>
					<TableHead className="font-bold text-center text-foreground">
						Prix U/HT
					</TableHead>
					<TableHead className="font-bold text-right text-foreground">
						Total HT
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{products?.map((product) => (
					<TableRow key={product.name}>
						<TableCell>{product.name}</TableCell>
						<TableCell className="text-right pe-8">
							{product.quantity.toLocaleString()}
						</TableCell>
						<TableCell className="text-center">
							{product.price.toLocaleString()} €
						</TableCell>
						<TableCell className="text-right">
							{(
								product.price * product.quantity
							).toLocaleString()}{" "}
							€
						</TableCell>
					</TableRow>
				))}
				<TableRow className="border-none text-right text-xl font-bold">
					<TableCell colSpan={2} />
					<TableCell className="pt-4">Total HT</TableCell>
					<TableCell className="pt-4">
						{total.toLocaleString()} €
					</TableCell>
				</TableRow>
				<TableRow className="border-none text-right text-sm">
					<TableCell colSpan={2} />
					<TableCell>TVA (20%)</TableCell>
					<TableCell>{(total * 0.2).toLocaleString()} €</TableCell>
				</TableRow>
				<TableRow className="border-none text-right text-sm">
					<TableCell colSpan={2} />
					<TableCell>Total TTC</TableCell>
					<TableCell>{(total * 1.2).toLocaleString()} €</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
	return (
		<div className="mt-8 mx-auto border">
			<Card className="rounded-none border-none w-[700px] h-[989px] ">
				<div ref={contentRef}>
					<HeaderDevis
						numeroDevis={numero}
						dateEmission={dateEmission}
						dureeValidite={dureeValidite}
						nomClient={name}
						adresseClient={adresse}
						infosClient={infosClient}
					/>
					<CardContent className={"h-full"}>
						<Card className="mt-4 text-md">
							<CardHeader>
								<CardTitle>{description?.titre}</CardTitle>
							</CardHeader>
							<CardContent>
								<pre className="prose prose-md font-sans">
									{description?.content}
								</pre>
								<Separator className="mt-4 " />

								{TableDevis}
							</CardContent>
						</Card>
						<Card className="  mt-4 ">
							<CardHeader className="pt-4">
								<CardTitle className="underline">
									Date de Signature : <br />
									<br />
									Bon pour accord d'execution :
								</CardTitle>
							</CardHeader>
							<CardContent className="  justify-end">
								<p className=" text-sm bottom-0  text-end ">
									Pour accord, merci de retourner cette
									proposition par mail à
									contact@rtsenvironnement.com
								</p>
							</CardContent>
						</Card>
					</CardContent>
				</div>
			</Card>
		</div>
	);
}
function HeaderDevis({
	numeroDevis,
	dateEmission,
	dureeValidite,
	nomClient,
	adresseClient,
	infosClient,
}: {
	numeroDevis: string;
	dateEmission: string;
	dureeValidite: string;
	nomClient: string;
	adresseClient: string;
	infosClient: string;
}) {
	return (
		<CardHeader className="grid grid-cols-2 justify-between items-center pb-2 gap-4">
			<div className="col-span-1	w-60 mx-auto	my-auto">
				<Logo />
			</div>
			<Card>
				<CardHeader>
					<CardTitle>Devis n°{numeroDevis} </CardTitle>
					<CardDescription className="flex flex-col justify-between">
						<span>Date d'émission : {dateEmission}</span>
						<span>Durée de validité : {dureeValidite}</span>
					</CardDescription>
				</CardHeader>
			</Card>
			<Card className="h-max grid grid-cols-2 px-8 pt-4 text-sm row-start-2 col-span-2">
				<div>
					<CardTitle>Fournisseur</CardTitle>
					<CardContent>
						<p>RTS Environnement</p>
						<p className="underline">
							19 rue Conan Meriadec <br /> 56400 PLUNERET
						</p>
						<p>02 97 57 78 00</p>
						<p>07 62 64 22 39</p>
						<p>contact@rts-environnement.com</p>
					</CardContent>
				</div>
				<div className=" border-l-2 ps-4 mb-4">
					<CardTitle>Client</CardTitle>
					<CardContent>
						<p>{nomClient}</p>
						<p>{adresseClient}</p>
						<p>{infosClient}</p>
					</CardContent>
				</div>
			</Card>
		</CardHeader>
	);
}
