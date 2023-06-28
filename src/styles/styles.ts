import { tv, VariantProps } from "tailwind-variants";

export interface InputProps extends VariantProps<typeof form>{}

export const form = tv({
  slots: {
    base: "flex w-80 flex-col items-center justify-center gap-4 text-white/40",
    input: "w-full p-2 bg-zinc-800 outline-none",
    button: "w-full p-2 bg-green-800 text-white cursor-pointer hover:bg-green-900"
  },

  variants: {
    state: {
      error: {
        input: "border-2 border-red-800",
        button: "bg-green-900 cursor-not-allowed text-white/50"
      }
    }
  }
})