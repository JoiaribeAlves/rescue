'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, Loader2, SaveIcon, XIcon } from 'lucide-react'

import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from './ui/form'
import { Textarea } from "@/components/ui/textarea"
import { Input } from './ui/input'
import { Button } from './ui/button'

const formSchema = z.object({
  street: z.string().min(1, "Nome da rua é obrigatório"),
  number: z.string().min(1, "Núero da casa é obrigatório"),
  district: z.string().min(1, "Bairro é obrigatório"),
  referencePoint: z.string().min(1, "Ponto de referência é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  peopleNumber: z.string().min(1, "Número de pessoas é obrigatório"),
  priority: z.string({
    required_error: "Defina uma prioridade para o resgate"
  }),
  note: z.string().min(0),
})

export function HelpForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      street: "",
      number: "",
      district: "",
      referencePoint: "",
      city: "",
      peopleNumber: "",
      priority: "",
      note: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="bg-muted flex flex-col gap-6 rounded-lg p-3"
      >
        <div className="flex flex-col gap-2">
          <h1 className="font-medium">Endereço de resgate</h1>

          <fieldset className="grid grid-cols-2 gap-3">
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Nome da rua"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="number"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Número da casa"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input type="text" placeholder="Bairro" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="referencePoint"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Ponto de referência"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Cidade"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-medium">Quantidade de pessoas</h2>

          <fieldset>
            <FormField
              control={form.control}
              name="peopleNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Quantidade de pessoas"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-medium">Observações</h2>

          <fieldset>
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea placeholder="Digite uma observação (se houver)" className='h-[200px] resize-none' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </fieldset>
        </div>

        <Button type="submit">Pedir resgate</Button>
      </form>
    </Form>
  )
}
