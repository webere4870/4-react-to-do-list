import React from 'react'

function Sidebar(props)
{
    let list = !props ? [] : props.list
    let listMap =[] 
    let counter = -1
    if(list)
    {
        listMap = list.map((temp)=>
        {
            counter++
            if(temp.editMode === false)
            {
                return (
                    <div className='rowFlex' key={counter}>
                        <h1>{temp.listTitle}</h1>
                        <button onClick={()=> props.deleteList(temp.id)}>Delete List</button>
                        <button onClick={()=> props.editList(temp.id)}>Edit</button>
                    </div>
                )
            }
            else{
                return(
                    <div key={counter}>
                        <input type="text" name={`editListInput${temp.id}`} onChange={(evt)=> props.changeListTitleState(evt, temp.id)} value={temp.listTitle}/>
                        <button onClick={()=> props.finalChangeState(temp.id)}>Submit</button>
                    </div>
                )
            }
        })
    }
    return (
        <div>
            {listMap}
            <input id='listTitle' type="text" value={props.listTitle} onChange={props.changeInput} name="listTitle" />
            <button onClick={props.addNewList}>Add to List</button>
        </div>
    )
}

export default Sidebar