module.exports = (query)=>{
    let filterStatus = [ // Mảng các button lọc status của sản phẩm.
        {
            name: "All",
            status: "",
            class: ""
        },
        {
            name: "In Stock",
            status: "active",
            class: ""
        },
        {
            name: "Low Stock",
            status: "inactive",
            class: ""
        }
    ];

    console.log(query.status);

    if (query.status) {
        const index = filterStatus.findIndex(item =>
            item.status == query.status);
        filterStatus[index].class = "active";
    }
    else {
        const index = filterStatus.findIndex(item => item.status == "");
        filterStatus[index].class = "active";
    }
    return filterStatus;
}