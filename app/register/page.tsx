
import { RegisterForm } from "@/components/register-form"
import { ModeToggle } from "@/components/ui/mode-toggle"

export default function Page() {
  return (
    <div className="relative flex flex-col gap-2 min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className=" w-full h-full max-w-sm flex flex-col gap-6">

        <RegisterForm/>
      </div>
        <ModeToggle />

    </div>
  )
}
