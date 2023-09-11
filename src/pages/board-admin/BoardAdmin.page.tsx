import React, { useState, useEffect } from 'react';

import { getAdminBoard } from 'services/user.service';
import EventBus from 'common/EventBus';

const BoardAdmin: React.FC = () => {
   const [content, setContent] = useState<string>('');

   useEffect(() => {
      getAdminBoard().then(
         (response) => {
            setContent(response.data as string);
         },
         (error) => {
            const _content =
               (error.response && error.response.data && error.response.data.message) ||
               error.message ||
               error.toString();

            setContent(_content);

            if (error.response && error.response.status === 401) {
               EventBus.dispatch('logout');
            }
         },
      );
   }, []);

   return (
      <div className="card">
         <h3>{content}</h3>
      </div>
   );
};

export default BoardAdmin;
