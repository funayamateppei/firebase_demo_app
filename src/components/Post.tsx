import { useState } from "react"
import { db } from "../firebase"
import { doc, collection, setDoc, deleteDoc } from "firebase/firestore"
import { ImBin, ImPencil } from "react-icons/im"

type Props = {
  id: string
  editTitle: string
  editText: string
  image: string
}

export function Post({ id, editTitle, editText, image }: Props) {
  const [title, setTitle] = useState<string>(editTitle)
  const [text, setText] = useState<string>(editText)

  const data = collection(db, "posts")

  const edit = async () =>
    await setDoc(doc(data, id), { title: title, text: text }, { merge: true })

  const deleteTask = async () => await deleteDoc(doc(data, id))

  return (
    <div>
      <div>
        <p>{title}</p>
        <p>{text}</p>
        <div>{image && <img src={image} />}</div>
        {/* <ImHome /> */}

        <p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </p>
      </div>

      <button onClick={edit}>
        <ImPencil />
        更新
      </button>

      <button onClick={deleteTask}>
        <ImBin />
        削除
      </button>
    </div>
  )
}
