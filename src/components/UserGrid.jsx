import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const UserGrid = ({ userData }) => {
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(9);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    let filtered = userData.filter((ele) =>
      ele.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    filtered = filtered.sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });
    setFilteredUsers(filtered);
    setCurrentPage(1);
  }, [searchQuery, sortOrder, userData]);

  const paginateData = (data) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
  };

  const totalPages = Math.ceil(
    (filteredUsers.length > 0 ? filteredUsers : userData).length / itemsPerPage
  );

  const handlePageChange = (newPage) => {
    if (newPage < 1) newPage = 1;
    if (newPage > totalPages) newPage = totalPages;
    setCurrentPage(newPage);
  };

  const currentData = filteredUsers.length > 0 ? filteredUsers : userData;

  const handleUserClick = (userId) => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="user-grid-container">
      <Navbar onSearch={handleSearch} />
      <div className="user-grid-sort">
        <button
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
          className="user-grid-sort-button"
        >
          Sort by Name ({sortOrder === "asc" ? "A-Z" : "Z-A"})
        </button>
      </div>

      <div className="user-grid">
        {paginateData(currentData).map((ele) => (
          <div
            key={ele.id}
            className="user-card"
            onClick={() => handleUserClick(ele.id)}
          >
            <h1 className="user-card-title">{ele.name}</h1>
            <p className="user-card-info">
              <strong>Email:</strong> {ele.email}
            </p>
            <p className="user-card-info">
              <strong>City:</strong> {ele.address.city}
            </p>
          </div>
        ))}
      </div>

      <div className="pagination-container">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button pagination-button-prev"
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button pagination-button-next"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default UserGrid;
