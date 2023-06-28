import { tv, VariantProps } from "tailwind-variants";

export interface InputProps extends VariantProps<typeof input>{}

export const input = tv({
  slots: {
    border: "none"
  },

  variants: {
    state: {
      error: {
        border: "border-2 border-red-800"
      },

      success: {
        border: "border-2 border-green-700"
      }
    }
  }
})