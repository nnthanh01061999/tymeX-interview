import {
  FormControlProps,
  FormDescriptionProps,
  FormLabelProps,
  FormMessageProps
} from "@/components/ui/form"
import { FieldValues, Path, UseFormReturn } from "react-hook-form"

export type FormWrapperProps<T extends FieldValues> = {
  form: UseFormReturn<T, object>
  name: Path<T>
  label?: string
  description?: string
  labelProps?: FormLabelProps
  controlProps?: FormControlProps
  descriptionProps?: FormDescriptionProps
  messageProps?: FormMessageProps
}
