import { useState, useCallback } from "react";
import { Collapse } from "react-collapse";
import "./App.css";
import { SIDEBAR } from "./data/sidebar";
import { TAGS } from "./data/tags";
import { MdKeyboardArrowDown, MdKeyboardArrowRight } from "react-icons/md";
import getInitialStateOfCollapsablePages from "./services/getInitialStateOfCollapsablePages";

function App() {
  const [tags, setTags] = useState([]);

  const sidebarData = SIDEBAR;
  const tagsData = TAGS;

  const initialStateForOpenCollapse =
    getInitialStateOfCollapsablePages(sidebarData);

  const [openCollapse, setOpenCollapse] = useState(initialStateForOpenCollapse);

  const addTag = useCallback(
    (tag) => () => {
      if (!tags.includes(tag)) {
        return setTags((prevTags) => [...prevTags, tag]);
      }
    },
    [tags]
  );

  const deleteTag = useCallback(
    (tagId) => () => {
      const tagsFiltered = tags.filter((tag) => {
        return tag !== tagId;
      });
      setTags(tagsFiltered);
    },
    [tags]
  );

  const matchTags = (current, target) => {
    return target.every((tag) => current.includes(tag));
  };

  const isTrue = tags.length > 0 ? "atleast-one-tag" : "";

  const filteredPages = sidebarData.pages.map(({ title, subpages }) => {
    const pageFiltered = subpages.filter((subpage) => {
      return matchTags(subpage.tags, tags);
    });
    return { title, pageFiltered };
  });

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

  const isCollapseOpened = (titleId) => {
    return openCollapse.settings.find((item) => item.id === titleId).open;
  };

  return (
    <>
      {tags.length > 0 && (
        <div className="header">
          {tags.map((tag, key) => {
            return (
              <button
                key={`close-button-${key}`}
                className="close"
                onClick={deleteTag(tag)}
              >
                {tag} &nbsp; x
              </button>
            );
          })}
        </div>
      )}
      <div className="sidebar">
        <ul className={`card ${isTrue}`}>
          {filteredPages.map(({ title, pageFiltered }) => {
            if (pageFiltered.length > 0) {
              return (
                <>
                  <li>
                    <button onClick={openCollapsable(title)}>
                      <div className="menu">
                        <span className="nav-text">{title}</span>
                        {isCollapseOpened(title) ? (
                          <MdKeyboardArrowDown
                            size={20}
                            className="nav-text-logo"
                          />
                        ) : (
                          <MdKeyboardArrowRight
                            size={20}
                            className="nav-text-logo"
                          />
                        )}
                      </div>
                    </button>

                    <ul>
                      {pageFiltered.map(({ title: name, content, tags }) => {
                        return (
                          <>
                            <Collapse isOpened={isCollapseOpened(title)}>
                              {name}
                              <ul className="tag">
                                {tags.map((tag, key) => {
                                  const tagColor = tagsData.tags[tag];
                                  return (
                                    <button
                                      key={`add-button-${key}`}
                                      type="button"
                                      onClick={addTag(tag)}
                                      style={{
                                        color: tagColor?.color || "#222222",
                                      }}
                                    >
                                      #{tag}
                                    </button>
                                  );
                                })}
                              </ul>
                            </Collapse>
                          </>
                        );
                      })}
                    </ul>
                  </li>
                </>
              );
            }
            return null;
          })}
        </ul>
      </div>
      <div className={`docs ${isTrue}`}>
        <h1>Docs go here</h1>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum nam
          deserunt vel sed quidem blanditiis enim eligendi ab amet voluptatibus.
          Quo laudantium ut magnam maxime. Ipsam molestias dicta culpa dolorem.
        </p>
      </div>
    </>
  );
}

export default App;
