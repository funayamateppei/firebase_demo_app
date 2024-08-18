import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { onAuthStateChanged, signOut } from "firebase/auth"
import { auth, db, storage } from "../../firebase"
import { addDoc, collection, onSnapshot, query } from "firebase/firestore"

import { Post } from "../Post"
import { Add } from "../Add"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"

type Data = {
  id: string
  title: string
  text: string
  image: string
}

export function Success() {
  const navigate = useNavigate()

  const [data, setData] = useState<Data[]>([])

  const [titleValue, setTitleValue] = useState<string>("")
  const [textValue, setTextValue] = useState<string>("")
  const [image, setImage] = useState<File | null>(null)

  const onChangeImageHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      e.target.value = ""
    }
  }

  const addData = async () => {
    try {
      if (image) {
        const S =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" //ランダムな文字列を作るための候補62文字
        const N = 16
        const randomChar = Array.from(
          crypto.getRandomValues(new Uint32Array(N))
        ) //乱数を生成してくれるもので0からランダムな数字が16個選ばれる
          .map((n) => S[n % S.length])
          .join("")

        const fileName = randomChar + "_" + image.name

        const uploadImage = uploadBytesResumable(
          ref(storage, `images/${fileName}`),
          image
        )

        uploadImage.on(
          "state_changed",
          () => {},
          (err) => alert(err.message),
          async () => {
            await getDownloadURL(ref(storage, `images/${fileName}`)).then(
              async (url) => {
                addDoc(collection(db, "posts"), {
                  image: url,
                  title: titleValue,
                  text: textValue,
                })
              }
            )
          }
        )
      } else {
        await addDoc(collection(db, "posts"), {
          title: titleValue,
          text: textValue,
          image: "",
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setTitleValue("")
      setTextValue("")
      setImage(null)
    }
  }

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

  useEffect(() => {
    const q = query(collection(db, "posts")) //データにアクセス

    // 3.2
    const unsub = onSnapshot(q, (QuerySnapshot) => {
      setData(
        QuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          text: doc.data().text,
          image: doc.data().image,
        }))
      )
    })
    return () => unsub()
  }, [])

  return (
    <>
      {data.map((item) => (
        <Post
          key={item.id}
          id={item.id}
          editTitle={item.title}
          editText={item.text}
          image={item.image}
        />
      ))}

      <Add
        addData={addData}
        titleValue={titleValue}
        textValue={textValue}
        handleTitleChange={(title: string) => setTitleValue(title)}
        handleTextChange={(text: string) => setTextValue(text)}
        onChangeImageHandler={onChangeImageHandler}
      />

      <button onClick={googleLogOut}>ログアウト</button>
    </>
  )
}
