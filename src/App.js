import React from 'react'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import ToDoList from './components/ToDoList'
import './stylesheet.css'

function App()
{
  let [list, setList] = React.useState(()=>
  {
    let string = localStorage.getItem("ToDoList")
    let data = JSON.parse(string)
    return data
  })
  let [currentList, setCurrentList] = React.useState(list ? list[0] : {})


  let [date, setDate] = React.useState(()=>
  {
    let date = new Date().toLocaleDateString()
    return date
  })

  let [listTitle, setListTitle] = React.useState(()=>
  {
    return ""
  })


  let [addReminder, setAddReminder] = React.useState(()=>
  {
    return ""
  })


  React.useEffect(()=>
  {
    if(list)
    {
      setCurrentList((prev)=>
      {
        return list[0]
      })
    }
  }, [list])

  
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
    event.target.name == "listTitle" ? setListTitle(event.target.value) : setListTitle("") // Change 
    event.target.name == "newReminder" ? setAddReminder(event.target.value) : setAddReminder("")
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

  function changeReminderState(evt, id)
  {
    setList((prev)=>
    {
      let newArr = []
      let newObj = {}
      let newReminders = []
      for(let temp of prev[currentList.id].listItems)
      {
        temp.id == id ? newReminders.push({...temp, reminder: evt.target.value}) : newReminders.push(temp)
      }
      newObj = {...prev[currentList.id], listItems: newReminders}
      console.log(newObj)
      for(let temp of prev)
      {
        temp.id == currentList.id ? newArr.unshift(newObj) : newArr.push(temp)
      }
      return newArr
    })
  }

  function finalChangeState(id)
  {
    setList((prev)=>
    {
      let newArr = []
      newArr = prev.map((temp) => temp.id === id ? {...temp, editMode: !temp.editMode} : temp)
      return newArr
    })
  }

  function changeCurrent(id)
  {
    let current = {}
    setList((prev)=>
    {
      let newArr = []
      for(let temp of prev)
      {
        if(temp.id==id)
        {
          current = temp
        }
        temp.id == id ? newArr.unshift(temp) : newArr.push(temp)
      }
      return newArr
    })
    
  }

  function createReminder()
  {
    setList((prev)=>
    {
      let newArr =[]
      for(let counter = 0; counter < prev.length; counter++)
      {
        if(prev[counter].id == currentList.id)
        {
          let subArr = [{id: prev[counter].listItems.length, reminder: addReminder, editMode: false}, ...prev[counter].listItems]
          let fullItem = {...prev[counter], listItems: subArr}
          console.log(fullItem)
          newArr.push(fullItem)
        }
        else{
          newArr.push(prev[counter])
        }
      }
      return newArr
    })
  }

  function changeReminder(id)
  {
    setList((prev)=>
    {
      let newArr = []
      let newObj = {}
      for(let counter = 0; counter < prev.length; counter++)
      {
        if(prev[counter].id == currentList.id)
        {
          let mapped = currentList.listItems.map((temp)=> temp.id == id? {...temp, editMode: !temp.editMode}: temp)
          newArr.unshift({...prev[counter], listItems: mapped})
        }
        else
        {
          newArr.push(prev[counter])
        }
      }
      return newArr
    })
  }

  function submitReminderChange(id)
  {
    setList((prev)=>
    {
      let newArr = []
      for(let counter = 0; counter < prev.length; counter++)
      {
        if(prev[counter].id == currentList.id)
        {
          let mapped = currentList.listItems.map((temp)=> temp.id == id? {...temp, editMode: !temp.editMode}: temp)
          newArr.unshift({...prev[counter], listItems: mapped})
        }
        else
        {
          newArr.push(prev[counter])
        }
      }
      return newArr
    })
  }

  return (
    <div>
      <h1>ReactJS</h1>
      <Navbar date={date} />
      <Sidebar listTitle={listTitle} changeInput={changeInput} addNewList={addNewList} list={list} deleteList={deleteList} changeListTitleState={changeListTitleState} editList={editList} finalChangeState={finalChangeState} changeCurrent={changeCurrent}/>


      {currentList && <ToDoList currentList={currentList} changeInput={changeInput} currentReminder={addReminder} addReminder={createReminder} changeReminder={changeReminder} changeReminderState={changeReminderState} submitReminderChange={submitReminderChange}/>}
    </div>
  )
}

export default App