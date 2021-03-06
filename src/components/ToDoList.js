import React from 'react'

function ToDoList(props)
{
    let counter = -1
    let mappedList = props.currentList.listItems.map((temp)=>
    {
        counter ++
        if(temp.editMode==false)
        {
            return <div className='toDoRow' key={temp.id}>
                <h1>{temp.reminder}</h1>
                <button onClick={()=> props.changeReminder(temp.id)}>Edit</button>
                <button>Delete Uniquer</button>
            </div>
        }
        else{
            return <div className='toDoRow' key={temp.id}>
                <input type="text" name={`reminderInput${counter}`} value={temp.reminder} onChange={(evt)=>props.changeReminderState(evt, temp.id)}/>
                <button onClick={()=> props.submitReminderChange(temp.id)}>Submit</button>
            </div>
        }
    })
    console.log(props)
    return (<div id='zBoy'>
        {mappedList}
        <input type="text" name='newReminder' onChange={(evt)=>props.changeInput(evt)} value={props.currentReminder}/>
        <button onClick={props.addReminder}>Add Reminder</button>
    </div>)
}

export default ToDoList