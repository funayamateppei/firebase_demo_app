import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../firebase"

export function Success() {
  const navigate = useNavigate()

  useEffect(() => {
    const unSub = onAuthStateChanged(
      auth,
      (user) => !user && navigate("/login")
    )

    return () => unSub()
  }, [navigate])

  return <div>Success</div>
}
