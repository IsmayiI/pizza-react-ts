import { Suspense } from "react"
import { Outlet } from "react-router-dom"

const SuspenseLayout = () => {
   return (
      <Suspense fallback={<div>Загрузка...</div>}>
         <Outlet />
      </Suspense>
   )
}

export default SuspenseLayout