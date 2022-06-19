import React from "react";
import CreateButtonComponent from "./CreateButton";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function ListComponent({ list, type, handleDelete }) {
  const { id } = useSelector((state) => state.users);
  const location = useLocation();
  
  const HandleNavigation = ({ item }) => {    
    let path = `${location.pathname}/${type}/${item._id}`;
    return (
      <Link to={path}>
        <li>{item.name}</li>
      </Link>
    );
  };

  return (
    <>
      <div>
        <h2>List {type}</h2>
      </div>
      <div>
        {list &&
          list.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                position: "relative",
              }}
            >
              <HandleNavigation key={i} item={item} />

              {id === item.user ? (
                <span
                  style={{
                    position: "absolute",
                    right: "30%",
                  }}
                  onClick={(e) => {
                    handleDelete(item._id, item.user);
                  }}
                >
                  -
                </span>
              ) : null}
            </div>
          ))}
      </div>
      <CreateButtonComponent type={type} />
    </>
  );
}
