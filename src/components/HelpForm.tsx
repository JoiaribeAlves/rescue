'use client'

import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CheckIcon, Loader2, Loader2Icon, SaveIcon, XIcon } from 'lucide-react'

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
import { createRescue } from '@/actions/createRescue'
import { toast } from 'sonner'

const formSchema = z.object({
  street: z.string().min(1, "Nome da rua é obrigatório"),
  number: z.string().min(1, "Núero da casa é obrigatório"),
  district: z.string().min(1, "Bairro é obrigatório"),
  referencePoint: z.string().min(1, "Ponto de referência é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  peopleNumber: z.string().min(1, "Número de pessoas é obrigatório"),
  note: z.string().min(0),
  phoneNumber: z.string().min(1, "Número de telefone é obrigatório"),
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
      note: "",
      phoneNumber: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    const result = await createRescue(data);

    if (result) {
      form.reset()

      toast.success("Seu pedido de resgate foi registrado com sucesso!", {
        position: "top-center",
        duration: 3500,
      })
    } else {
      toast.error("Falha ao criar pedido de resgate. Tente novamente.", {
        position: "top-center",
        duration: 3500,
      })
    }
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
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Número de telefone"
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

        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? (
            <>
              <Loader2Icon className="h-4 w-4 animate-spin" />{" "}
              Aguarde...
            </>
          ) : (
            <>
              Pedir resgate
            </>
          )}
        </Button>
      </form>
    </Form>
  )
}
