import React from "react";

const Pagination = ({ foods, foodsPerPage, pagination }) => {
  let pageNum = [];
  for (let i = 1; i <= Math.ceil(foods?.length / foodsPerPage); i++) {
    pageNum.push(i);
  }
  if (foods?.length <= 9 || !foods) {
    return (pageNum = null);
  }
  return (
    <div className="pagesHolder">
      <ul style={{ margin: "0", display: "contents" }}>
        {pageNum &&
          pageNum.map((number) => (
            // eslint-disable-next-line jsx-a11y/anchor-is-valid
            <a key={number} className="page" onClick={() => pagination(number)}>
              {number}
            </a>
          ))}
      </ul>
    </div>
  );
};

export default Pagination;
