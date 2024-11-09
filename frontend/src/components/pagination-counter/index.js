import "./index.css"

const PaginationCounter = (itemsProps) => {
    const {total_items,items_per_page,setCurrentPage,currentPage} = itemsProps;
    const lastPostIndex = currentPage * items_per_page;
    const firstPostIndex = lastPostIndex - items_per_page;
    let pages = [];

    for(let i = 1;i <= Math.ceil(total_items/items_per_page);i++){
        pages.push(i)
    }
    return (
        <div className="pagination-container">
                {pages.map((page,index) => (
                    currentPage == page ? 
                    <div
                    className="pagination-button current-page"
                    key={index}
                    onClick={() => setCurrentPage(page)}>{page}</div>
                    :
                    <div
                    className="pagination-button"
                    key={index}
                    onClick={() => setCurrentPage(page)}>{page}</div>
                ))}
        </div>
    )
}

export default PaginationCounter;