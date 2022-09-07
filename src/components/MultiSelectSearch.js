import { Multiselect } from 'multiselect-react-dropdown';
import { useState } from 'react';
const MultiSelectSearch = ({tasks}) => {
    return (
        <div className='multi-select'>
            <h3 style={{color:'red'}}>Search Task</h3>
            <Multiselect 
            options={tasks}
            displayValue="text"
            closeOnSelect={true}
            />
        </div>
    )
}

export default MultiSelectSearch
