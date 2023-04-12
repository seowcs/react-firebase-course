import { useState, useEffect } from 'react';
import './App.css';
import Auth from './components/Auth';
import { db,auth,storage } from './config/firebase'; 
import { getDocs, collection, addDoc, deleteDoc,doc, updateDoc } from 'firebase/firestore';
import {ref,uploadBytes} from 'firebase/storage'

function App() {
  const [movieList, setMovieList] = useState([]);
  //New movie states
  const [newMovieTitle, setNewMovieTitle] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState(0);
  const [isNewMovieOscar, setIsNewMovieOscar] = useState(false);
  //update title state
  const [updatedTitle, setUpdatedTitle] = useState('');
  //File upload state
  const [fileUpload, setFileUpload] = useState(null);

  //gets the collection of movies
  const moviesCollectionRef = collection(db,"movies"); 
  const getMovieList = async () => {
      
      
      try {
        //READ DATA(R)
        const data = await getDocs(moviesCollectionRef);
        const filteredData = data.docs.map((doc) =>( { ...doc.data(), id: doc.id }) )
        //SET MOVIE LIST
        setMovieList(filteredData);
        } catch (error) {
          console.error(error);
        }
        
  }
  

  useEffect(() => {
    getMovieList();

  }, [])

  //(C)
  const onSubmitMovie = async () => {
    try {
      //(C)
      await addDoc(moviesCollectionRef, {
      title: newMovieTitle,
      releaseDate: newReleaseDate,
        receivedAnOscar: isNewMovieOscar,
      userId: auth?.currentUser?.uid
      })
      getMovieList();
    } catch (error) {
      console.error(error);
    }

  }

  //(D)
  const deleteMovie = async (id) => { 
    const movieDoc = doc(db,'movies', id);
    await deleteDoc(movieDoc);
    getMovieList();
  }

  //(U)
  const updateMovieTitle = async (id) => { 
    const movieDoc = doc(db, 'movies', id);
    await updateDoc(movieDoc, { title: updatedTitle });
    getMovieList();
  }
  
  const uploadFile = async () => { 
    if (!fileUpload) return;

    const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (error) {
      console.error(error);
    }
    
  }

  console.log(fileUpload);

  return (
    <div className="App">
      <Auth />
      <br />
      <div>
        <input type="text" placeholder='Movie title...' onChange={(e)=>setNewMovieTitle(e.target.value)}/>
        <input type="number" placeholder='Release Date...' onChange={(e) => setNewReleaseDate(Number(e.target.value))} />
        <input type="checkbox" checked={isNewMovieOscar} onChange={(e)=>setIsNewMovieOscar(e.target.checked)}/>
        <label >Received an Oscar</label>
        <br />
        <button onClick={onSubmitMovie}>Submit Movie</button>
      </div>

      <div>
        {movieList.map((movie) => (<div>
          <h1 style={{color:movie.receivedAnOscar ? "green" : "red"}}>{movie.title}</h1>
          <p>Date: {movie.releaseDate}</p>
          <button onClick={() => deleteMovie(movie.id)}>Delete Movie</button>
          <input placeholder='new title...' onChange={(e)=> setUpdatedTitle(e.target.value)}/>
          <button onClick={()=>updateMovieTitle(movie.id)}>Update Title</button>
        </div>))}
      </div>
          <br />
      <div>
        <input type="file" onChange={(e)=>setFileUpload(e.target.files[0])}/>
        <button onClick={uploadFile}>Upload File</button>
      </div>
    </div>
  );
}

export default App;
