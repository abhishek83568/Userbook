import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import UserGrid from "./components/UserGrid";
import UserDetail from "./components/UserDetail";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../src/Redux/action.js";

export default function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const { data } = user;
  const url = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    dispatch(fetchData(url));
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<UserGrid userData={data} />} />
        <Route path="/user/:userId" element={<UserDetail userData={data} />} />
      </Routes>
    </Router>
  );
}
