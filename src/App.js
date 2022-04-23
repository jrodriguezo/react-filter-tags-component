import { useState, useCallback } from "react";
import { Collapse } from "react-collapse";
import "./App.css";
import { SIDEBAR } from "./data/sidebar";
import { TAGS } from "./data/tags";

function App() {
  const [tags, setTags] = useState(["game"]);
  const stateForCollapse = {
    settings: [
      { id: "Collapse 1", open: false },
      { id: "Collapse 2", open: false },
      { id: "Collapse 3", open: false },
      { id: "Collapse 4", open: false },
      { id: "Collapse 5", open: false },
    ],
  };
  const [openCollapse, setOpenCollapse] = useState(stateForCollapse);

  const projects = [
    {
      title: "Example 0",
      description:
        "This is an example project item. You can sort through these using the tags. You can also click a tag to add it to the filter.",
      tags: ["react", "javascript", "game", "back-end"],
    },
    {
      title: "Game of Life",
      description: "React implementation of the game of life.",
      tags: ["react", "javascript", "game", "web", "front-end"],
    },
    {
      title: "Calculator",
      description: "Calculator written in Javascript",
      tags: ["javascript", "utility", "web"],
    },
    {
      title: "Tic Tac Toe",
      description: "A command-line Tic Tac Toe game written in Ruby",
      tags: ["ruby", "game", "cli"],
    },
    {
      title: "TodoList",
      description: "Full stack todo-list written in fullstack Javascript",
      tags: [
        "react",
        "javascript",
        "node",
        "fullstack",
        "front-end",
        "back-end",
        "web",
        "mvc",
      ],
    },
    {
      title: "Weather",
      description: "A Weather App with React Native ",
      tags: [
        "react",
        "javascript",
        "react-native",
        "front-end",
        "mobile",
        "android",
        "ios",
      ],
    },
    {
      title: "Markdown Editor",
      description: "Markdown Editor powered by Monaco and React",
      tags: ["react", "javascript", "monaco", "front-end"],
    },
    {
      title: "Bloggie",
      description: "Rails-powered blog with a React front-end",
      tags: [
        "react",
        "javascript",
        "ruby",
        "front-end",
        "back-end",
        "fullstack",
        "ruby-on-rails",
        "mvc",
      ],
    },
  ];

  const sidebarData = SIDEBAR;
  const tagsData = TAGS;

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
      setOpenCollapse(prev => ({
        ...prev,
        settings: prev.settings.map(item=> {
          return item.id === tagId ? {...item, open: !item.open } : item
        })}));
    },
    []
  );

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
                    {title}
                    <button onClick={openCollapsable(title)}>Open</button>
                    <ul>
                      {pageFiltered.map(({ title: name, content, tags }) => {
                        return (
                          <>
                            <Collapse isOpened={openCollapse.settings.find(item => item.id === title).open}>
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
