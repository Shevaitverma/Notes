import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowLeft} from "../assets/leftArrow.svg";

const NotePage = () => {
    const history = useNavigate()
    const noteId = useParams()
    const [note, setNote] = useState(null);

    useEffect(()=>{
        getNote()
    }, [noteId.id])

    let getNote = async ()=>{
        if(noteId === 'new') return

        let response = await fetch(`/api/notes/${noteId.id}/`);
        let data = await response.json();
        setNote(data);
    }

    let createNote = async()=>{
      fetch(`/api/notes/create/`,{
        method:"POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify(note)
      })
    }

    let updateNote = async()=>{
      fetch(`/api/notes/${noteId.id}/update/`,{
        method:"PUT",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify(note)
      })
    }

    let deleteNote = async() =>{
      fetch(`/api/notes/${noteId.id}/delete/`,{
        method:"Delete",
        headers: {
          "Content-Type":"application/json",
        }
      })
      history('/')
    }

    let handleSubmit = ()=>{

      if(noteId.id !== "new" && !note.body){
        deleteNote()
      }else if(noteId.id !== 'new'){
        updateNote()
      }else if(noteId.id === 'new' && note !== null){
        createNote()
      }

      history('/')
    }
    
    return (
    <div className='note'>
      <div className='note-header'>
        <h3>
            <ArrowLeft onClick={handleSubmit} />
        </h3>
        {noteId.id !== 'new' ? (
            <button onClick={deleteNote}>Delete</button>
        ) : (
            <button onClick={handleSubmit}>Done</button>
        )}

        
      </div>
      <textarea onChange={(e)=>{ setNote({...note, 'body':e.target.value})}} defaultValue={note?.body}></textarea>
    </div>
  )
}

export default NotePage
