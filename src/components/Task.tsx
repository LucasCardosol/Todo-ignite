import { useState } from 'react'
import style from './Task.module.css'
import {Trash , Check} from 'phosphor-react'

interface Task {
  id: number;
  name: string;
  checked: boolean;
  onDeleteTask: (id:number) => void;
  onAddChecked: (id:number,checked:boolean) => void;
}

function Task({name, checked, id , onDeleteTask , onAddChecked}: Task) {

  const [checkState , setCheckState] = useState(checked)

  return (
    <li className={style.li}>
      <div className='task'>
        <input type='checkBox' id={`myCheckbox${id}`} className={style.input} checked={checkState} onChange={() => {setCheckState(!checkState);onAddChecked(id,!checkState)}}>
          
        </input>
        <label htmlFor={`myCheckbox${id}`} className={style.checkboxlabel} >
          {checkState && <Check size={12} weight='bold' color='white'/>}
        </label>
        <p>{name}</p>
        <button onClick={() => onDeleteTask(id)}>
          <Trash size={18} weight='bold'/>
        </button>
      </div>
    </li>
  )
}

export default Task