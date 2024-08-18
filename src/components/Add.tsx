type Props = {
  addData: () => Promise<void>
  handleTitleChange: (title: string) => void
  handleTextChange: (text: string) => void
  titleValue: string
  textValue: string
  onChangeImageHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export function Add({
  addData,
  handleTitleChange,
  handleTextChange,
  titleValue,
  textValue,
  onChangeImageHandler,
}: Props) {
  return (
    <div>
      <hr />

      <h1>登録の処理</h1>

      <p>{titleValue}</p>
      <p>{textValue}</p>

      <input
        type="text"
        value={titleValue}
        onChange={(e) => handleTitleChange(e.target.value)}
      />
      <input
        type="text"
        value={textValue}
        onChange={(e) => handleTextChange(e.target.value)}
      />

      <input type="file" onChange={onChangeImageHandler} />

      <button onClick={addData}>送信</button>
    </div>
  )
}
