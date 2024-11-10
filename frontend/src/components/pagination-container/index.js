import { useState } from "react";
import "./index.css"

const PaginationContainer = ({pageState}) => {
    const {currentPage,setCurrentPage,maxPages} = pageState;
    console.log(maxPages)
    return (
        <div className="pagination-container">
                {currentPage != 1 &&
                <div
                className="pagination-back"
                onClick={() => setCurrentPage(currentPage - 1)}
                >{"<"}</div>
                }
                <div className="pagination-page">{currentPage}</div>
                {currentPage < maxPages &&
                <div
                className="pagination-front"
                onClick={() => setCurrentPage(currentPage + 1)}
                >{">"}</div>
                }
        </div>
    )
}

export default PaginationContainer;