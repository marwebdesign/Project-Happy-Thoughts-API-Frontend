import React, { useState, useEffect } from 'react';
import ThoughtList from 'components/ThoughtList';
import ThoughtForm from 'components/ThoughtForm';

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
      .then((data) => setThoughtList(data.body.body))
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
      .then(() => fetchThoughts())
      .catch((error) => console.error(error))
      .finally(() => setNewThought(''));
  }
  const onLikesIncrease = (thoughtId) => {
    const options = {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    }

    fetch(LIKES_URL(thoughtId), options)
      .then((res) => res.json())
      .then((data) => {
        fetchThoughts(data.body)
      })
      .catch((error) => console.error(error))
  }

  return (
    <div className="outerContainer">
      <div className="innerContainter>">
        <ThoughtForm
          newThought={newThought}
          onNewThoughtChange={onNewThoughtChange}
          onFormSubmit={onFormSubmit} />
        <ThoughtList
          loading={loading}
          thoughtList={thoughtList}
          setThoughtList={setThoughtList}
          onLikesIncrease={onLikesIncrease} />
      </div>
    </div>
  )
}