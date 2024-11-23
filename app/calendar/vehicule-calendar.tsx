"use client"

import React, { useState } from "react"
import moment from "moment"
import { Calendar, momentLocalizer } from "react-big-calendar"

import "react-big-calendar/lib/css/react-big-calendar.css"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Setup the localizer for react-big-calendar
const localizer = momentLocalizer(moment)

// Define the event type
type VehiculeEvent = {
  id: string
  title: string
  start: Date
  end: Date
  vehiculeId: string
}

// Sample vehicle data
const vehicules = [
  { id: "1", immatriculation: "AB-123-CD" },
  { id: "2", immatriculation: "EF-456-GH" },
  // Add more vehicles as needed
]

// Form schema
const formSchema = z.object({
  vehiculeId: z.string({
    required_error: "Veuillez sélectionner un véhicule.",
  }),
  start: z.date({
    required_error: "Veuillez sélectionner une date de début.",
  }),
  end: z.date({
    required_error: "Veuillez sélectionner une date de fin.",
  }),
})

export default function VehiculeCalendar() {
  const [events, setEvents] = useState<VehiculeEvent[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState<{
    start: Date
    end: Date
  } | null>(null)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const onSelectSlot = (slotInfo: { start: Date; end: Date }) => {
    setSelectedSlot(slotInfo)
    setIsDialogOpen(true)
    form.reset({
      start: slotInfo.start,
      end: slotInfo.end,
    })
  }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const selectedVehicule = vehicules.find((v) => v.id === values.vehiculeId)
    if (selectedVehicule) {
      const newEvent: VehiculeEvent = {
        id: Math.random().toString(36).substr(2, 9), // Generate a random ID
        title: `${selectedVehicule.immatriculation}`,
        start: values.start,
        end: values.end,
        vehiculeId: values.vehiculeId,
      }
      setEvents([...events, newEvent])
      setIsDialogOpen(false)
    }
  }

  return (
    <div className="h-screen flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Calendrier des Véhicules</h1>
      <div className="flex-grow">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%" }}
          selectable
          onSelectSlot={onSelectSlot}
        />
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Affecter un véhicule</DialogTitle>
            <DialogDescription>
              Choisissez un véhicule pour cette plage horaire.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="vehiculeId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Véhicule</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez un véhicule" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vehicules.map((vehicule) => (
                          <SelectItem key={vehicule.id} value={vehicule.id}>
                            {vehicule.immatriculation}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="start"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de début</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        {...field}
                        value={
                          field.value
                            ? moment(field.value).format("YYYY-MM-DDTHH:mm")
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="end"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date de fin</FormLabel>
                    <FormControl>
                      <Input
                        type="datetime-local"
                        {...field}
                        value={
                          field.value
                            ? moment(field.value).format("YYYY-MM-DDTHH:mm")
                            : ""
                        }
                        onChange={(e) =>
                          field.onChange(new Date(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Affecter le véhicule</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
