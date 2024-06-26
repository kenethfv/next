import { WidgetItem } from "@/components"
import { auth } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/api/auth/signin')
  }

  return (
    <div className="grid gap-6 grid-cols-1 ">
      {/* <WidgetItem /> */}
      <WidgetItem title="Usuario Conectado S-side">
        <div className="flex flex-col">
        <span>{ session?.user.name }</span>
        <span>{ session?.user.email }</span>
        <span>{ session?.user.image }</span>
        <div>
          {
            JSON.stringify(session)
          }
        </div>
        </div>
      </WidgetItem>
    </div>
  )
}
