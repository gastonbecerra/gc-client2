import React from "react";
import CreateButtonComponent from "./CreateButton";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { deleteVar } from "../store/slices/vars";
import { useSelector, useDispatch } from "react-redux";

export default function ListComponent({ list, type }) {
  const { id } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const location = useLocation();

  const HandleNavigation = ({ item }) => {
    let path;
    if (location.pathname.includes("data")) {
      path = `${location.pathname}/${type}/${item._id}`;
    } else {
      path = `${location.pathname}/${item._id}`;
    }
    return (
      <Link to={path}>
        <li>{item.name}</li>
      </Link>
    );
  };

  const handleDelete = (e, item_user) => {
    e.preventDefault();
    alert('td delete functions');
  };
  return (
    <>
      <div>
        <h2>lo que sea que listamos</h2>
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
                    handleDelete(e, item.user);
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
