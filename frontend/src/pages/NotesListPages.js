import React, {useState, useEffect} from 'react';
import ListItem from '../components/ListItem';
import AddButton from '../components/AddButton';

const NotesListPages = () => {

    const  [notes, setNotes] = useState([]);


    useEffect(()=>{
        // fetch('http://127.0.0.1:8000/api/notes/').then(data=>{
        //     data.json().then(response=>{ 
        //         console.log(response)
        //         setNotes(response)
        //     })
        // })
        getNotes()
    }, []);

    let getNotes = async ()=>{
        let response = await fetch('/api/notes/');
        let data = await response.json();
        setNotes(data);
    }

  return (
    <div className='notes'>
      <div className='notes-header'>
        <h2 className='notes-title'>&#9782; Notes</h2>
        <p className='notes-count'>{notes.length}</p>
      </div>
      <div className='notes-list'>
        {notes.map((note, index)=>(
            <ListItem key={index} note={note} />
        ))}
      </div>
      <AddButton />
    </div>
  )
}

export default NotesListPages