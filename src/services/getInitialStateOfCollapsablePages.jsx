import React from 'react'

function getInitialStateOfCollapsablePages(data) {
    
    const settings = [];

    data.pages.map(({ title }) => {
      return settings.push({
        id: title,
        open: false,
      });
    });
  
    const initialState = {
      settings: settings,
    };

    return initialState;
}

export default getInitialStateOfCollapsablePages