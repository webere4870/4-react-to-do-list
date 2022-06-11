import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'

function App()
{
  let [list, setList] = React.useState(()=>
  {
    let string = localStorage.getItem("ToDoList")
    let data = JSON.parse(string)
    return data
  })
  let [currentList, setCurrentList] = React.useState(()=>
  {
    return list ? list[0] : []
  })

  let [date, setDate] = React.useState(()=>
  {
    let date = new Date().toLocaleDateString()
    return date
  })

  let [listTitle, setListTitle] = React.useState(()=>
  {
    return ""
  })

  
  setInterval(()=>
  {
    setDate(()=>
    {
      return new Date().toDateString()
    })
  }, 60000)


  function addNewList()
  {
    setList((prev)=>
    {
      let newArr = []
      let newNote = {id: prev.length, listTitle: listTitle, listItems: [], editMode: false}
      newArr = [newNote, ...prev]
      localStorage.setItem("ToDoList", JSON.stringify(newArr))
      return newArr
    })
  }

  function deleteList(id)
  {
    setList((prev)=>
    {
      let newArr = []
      newArr = prev.filter((temp)=> temp.id !== id)
      localStorage.setItem("ToDoList", JSON.stringify(newArr))
      return newArr
    })
  }

  function editList(id)
  {
    setList((prev)=>
    {
      let newArr = []
      newArr = prev.map((temp)=>
      {
        if(temp.id === id)
        {
          return {...temp, editMode: !temp.editMode}
        }
        else
        {
          return temp
        }
      })
      return newArr
    })
  }

  function changeInput(event)
  {
    event.target.name == "listTitle" ? setListTitle(event.target.value) : setListTitle(null) // Change
  }


  function changeListTitleState(evt, id)
  {
    setList((prev)=>
    {
      let newArr = []
      newArr = prev.map((temp) => temp.id === id ? {...temp, listTitle: evt.target.value} : temp)
      return newArr
    })
  }

  function finalChangeState(id)
  {
    console.log("here")
    setList((prev)=>
    {
      let newArr = []
      newArr = prev.map((temp) => temp.id === id ? {...temp, editMode: !temp.editMode} : temp)
      return newArr
    })
  }


  return (
    <div>
      <h1>ReactJS</h1>
      <Navbar date={date} />
      <Sidebar listTitle={listTitle} changeInput={changeInput} addNewList={addNewList} list={list} deleteList={deleteList} changeListTitleState={changeListTitleState} editList={editList} finalChangeState={finalChangeState}/>
    </div>
  )
}

export default App