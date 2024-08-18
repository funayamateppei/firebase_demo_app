import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged, signOut } from "firebase/auth"
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

  const googleLogOut = async () => {
    try {
      await signOut(auth)
      navigate("/login")
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <div>Success</div>

      <button onClick={googleLogOut}>ログアウト</button>
    </>
  )
}
