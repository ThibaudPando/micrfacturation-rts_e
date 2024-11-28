"use server"

import { revalidatePath } from "next/cache"

import prisma from "@/lib/prisma"

export async function addClient(data: FormData) {
  const req = Object.fromEntries(data.entries()) as Record<string, string>
  // POST /database/clients 200 in 32ms
  // FormData {
  //   name: 'Colas',
  //   email: 'colas@colas.com',
  //   siret: '684642465846',
  //   'contacts.0.name': 'Yoann Guillemot',
  //   'contacts.0.email': 'y.gui@colas.com',
  //   'contacts.0.phone': '0665544558'
  // }
  await prisma.client.create({
    data: {
      name: req.name,
      email: req.email,
      siret: req.siret,
      Contacts: {
        create: Array.from(data.entries())
          .filter(([key]) => key.startsWith("contacts"))
          .reduce((acc, [key, value]) => {
            const [, index, subKey] = key.split(".")
            acc[index] = acc[index] || {}
            acc[index][subKey] = value
            return acc
          }, [] as Record<string, string>[])
          .map((contact) => ({
            name: contact.name,
            email: contact.email,
            phone: contact.phone,
          })),
      },
    },
  })
  revalidatePath("/database/clients")
}

export async function getClients() {
  return await prisma.client.findMany({
    include: { Contacts: true, Commande: true },
  })
}
