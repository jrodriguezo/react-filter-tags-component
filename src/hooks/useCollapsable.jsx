import React, {useCallback, useState} from 'react'
import getInitialStateOfCollapsablePages from '../services/getInitialStateOfCollapsablePages';

function useCollapsable(sidebarData) {
    
    const initialStateForOpenCollapse =
    getInitialStateOfCollapsablePages(sidebarData);

    const [openCollapse, setOpenCollapse] = useState(initialStateForOpenCollapse);

    const openCollapsable = useCallback(
        (tagId) => () => {
          setOpenCollapse((prev) => ({
            ...prev,
            settings: prev.settings.map((item) => {
              return item.id === tagId ? { ...item, open: !item.open } : item;
            }),
          }));
        },
        []
      );

    const isCollapseOpened = (tagId) => {
        return openCollapse.settings.find((item) => item.id === tagId).open;
    };

    return [openCollapsable, isCollapseOpened]
}

export default useCollapsable