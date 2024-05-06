import { PatternFormat, PatternFormatProps } from "react-number-format"
import { Input } from "./input"

type PhoneInputType = {
  error?: boolean
} & Partial<PatternFormatProps>

const PhoneInput = ({ ...props }: PhoneInputType) => {
  return (
    <PatternFormat
      {...props}
      format="(##) #####-####"
      autoComplete="tel-national"
      defaultValue={""}
      customInput={Input}
      placeholder="(99) 99999-9999"
    />
  )
}

export default PhoneInput
