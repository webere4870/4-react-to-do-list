import React from 'react'

function App()
{
  let [list, setList] = React.useState(()=>
  {
    let string = localStorage.getItem("ToDoList")
    let data = JSON.parse(string)
    return data
  })
  let [currentItem, setCurrentItem] = React.useState(()=>
  {
    return list ? list[0] : []
  })

  let [date, setDate] = React.useState(()=>
  {
    let date = new Date().toLocaleTimeString()
    return date
  })

  
  setInterval(()=>
  {
    setDate(()=>
    {
      return new Date().toLocaleTimeString()
    })
  })


  return (
    <div>
      <h1>ReactJS</h1>
      <h1>{date}</h1>
    </div>
  )
}

export default App