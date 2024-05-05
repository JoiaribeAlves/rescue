import { format } from 'phone-fns'

export function phoneMask(phone: string) {
  if (phone.length === 10) {
    return format('(NN) NNNN-NNNN', phone)
  }

  return format('(NN) NNNNN-NNNN', phone)
}
