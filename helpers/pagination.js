module.exports = (objPagination, query, countProduct)=>{
    if(query.page){
        objPagination.currentPage = parseInt(query.page);
    }
    // console.log(objPagination.currentPage);



    objPagination.skip = (objPagination.currentPage - 1)*objPagination.limitItems;
    // console.log(objPagination.skip); 

    
    const totalPage = Math.ceil(countProduct/objPagination.limitItems);

    objPagination.totalPage = totalPage;
    // console.log(countProduct);
    return objPagination;
}