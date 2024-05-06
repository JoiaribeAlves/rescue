"use client";

import { Button } from '@/components/ui/button'
import { completeRescue } from '../actions/completeRescue';
import { toast } from 'sonner';

interface ICompleteRescueButton {
  rescueId: string;
  disabled: boolean;
}

export function CompleteRescueButton({ rescueId, disabled }: ICompleteRescueButton) {
  async function handleCompleteRescue() {
    const result = await completeRescue(rescueId);

    if (result) {
      toast.success("Pedido de resgate marcado como concluído!", {
        position: "top-center",
        duration: 3500,
      })
    } else {
      toast.error("Falha ao marcar pedido de resgate como concluído. Tente novamente.", {
        position: "top-center",
        duration: 3500,
      })
    }
  }

  return (
    <Button
      variant="default"
      className="w-full"
      disabled={disabled}
      onClick={handleCompleteRescue}
    >
      Marcar como resgatado
    </Button>
  )
}
