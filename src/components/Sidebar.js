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
            return (
            <div className='rowFlex' key={counter}>
                <h1>{temp.listTitle}</h1>
                <button>Delete List</button>
                <button>Edit</button>
            </div>)
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