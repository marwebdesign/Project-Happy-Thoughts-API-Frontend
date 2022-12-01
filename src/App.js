import React, { useState, useEffect } from 'react';
import ThoughtList from 'components/ThoughtList';
import ThoughtForm from 'components/ThoughtForm';

// Original API:s
// const LIKES_URL = (thoughtId) => `https://happy-thoughts-technigo.herokuapp.com/thoughts/${thoughtId}/like`
// const API = 'https://happy-thoughts-technigo.herokuapp.com/thoughts'

const LIKES_URL = (thoughtId) => `https://project-happy-thoughts-api-ebt3b63p3a-lz.a.run.app/thoughts/${thoughtId}/like`
const API = 'https://project-happy-thoughts-api-ebt3b63p3a-lz.a.run.app/thoughts/'

export const App = () => {
  const [thoughtList, setThoughtList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newThought, setNewThought] = useState('');

  const fetchThoughts = () => {
    setLoading(true);
    fetch(API)
      .then((res) => res.json())
      .then((data) => setThoughtList(data.response))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  // fetchData

  useEffect(() => {
    fetchThoughts();
  }, []);

  const onNewThoughtChange = (event) => {
    setNewThought(event.target.value);
  }
  // what daniel calls onNewTaskChange

  const onFormSubmit = (event) => {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: newThought
      })
    }
    fetch(API, options)
      .then((res) => res.json())
      .then((data) => fetchThoughts(data.response))
      .catch((error) => console.error(error))
      .finally(() => setNewThought(''));
  }
  const onLikesIncrease = (thoughtId) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(LIKES_URL(thoughtId), options)
      .then((res) => res.json())
      .then((data) => {
        fetchThoughts(data.response)
      })
      .catch((error) => console.error(error))
  }

  return (
    <div className="outerContainer">
      <div className="innerContainter>">
        {/* <div className="thoughtFormContainer"> */}
        <ThoughtForm
          newThought={newThought}
          onNewThoughtChange={onNewThoughtChange}
          onFormSubmit={onFormSubmit} />
        {/* </div> */}
        {/* <div className="thoughtListContainer"> */}
        <ThoughtList
          loading={loading}
          thoughtList={thoughtList}
          setThoughtList={setThoughtList}
          onLikesIncrease={onLikesIncrease} />
        {/* </div> */}
      </div>
    </div>
  )
}