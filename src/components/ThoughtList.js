/* eslint-disable no-underscore-dangle */
import React from 'react';
import { formatDistance } from 'date-fns';

const ThoughtList = ({ loading, thoughtList, onLikesIncrease }) => {
  if (loading) {
    return <h1>Loading in progress...</h1>
  }
  return (
    <section>
      {thoughtList.map((thought) => (
        <div
          key={thought._id}
          className="thoughtList">
          <h4 className="thoughtMessage">{thought.message}</h4>
          <div className="likeContainer">
            <div className="buttonAndCounter">
              <button
                type="button"
                className={(thought.hearts === 0 ? 'like-btn' : 'no-like-btn')}
                onClick={() => onLikesIncrease(thought._id)}>❤️
              </button>
              <p className="counter">x {thought.hearts}</p>
            </div>
            <p className="date">{formatDistance(new Date(thought.createdAt), Date.now(), { addSuffix: true })}</p>
          </div>
        </div>

      ))}
    </section>
  );
}

export default ThoughtList;