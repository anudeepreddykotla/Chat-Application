import React from 'react';
import Convo from './convoComponent';
import useGetConersations from '../../hooks/useGetConersations';

function Conversation() {
  const { loading, conversations } = useGetConersations();

  return (
    <div className="flex-grow overflow-y-auto p-2">
      {conversations.map((chat, index) => 
        <Convo
          key={chat._id}
          chat={chat}
          lastItem={index === conversations.length - 1}
        />
      )}
      {loading ? <span className='loading loading-spinner mx-auto'></span> : null}
    </div>
  );
}

export default Conversation;