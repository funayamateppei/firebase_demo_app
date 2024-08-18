import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { auth } from "../../firebase"
import { onAuthStateChanged } from "firebase/auth"

export function Login() {
  const navigate = useNavigate()

  const googleLogin = () => {
    const provider = new GoogleAuthProvider()
    signInWithPopup(auth, provider).catch((error) => console.log(error))
  }

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) =>
      user ? navigate("/") : navigate("/login")
    )
    return () => unSub()
  }, [navigate])

  return (
    <div>
      <h2>GoggleLogin</h2>

      <button onClick={googleLogin}>ログイン</button>
    </div>
  )
}
