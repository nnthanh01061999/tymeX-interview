import ScrollToTop from "@/components/layout/scroll-to-top"
import { LocaleSwitch } from "@/components/locale/locale-switch"

function FloatAction() {
  return (
    <div className="fixed z-50 bottom-4 right-4 grid gap-2">
      <LocaleSwitch />
      <ScrollToTop />
    </div>
  )
}

export default FloatAction
