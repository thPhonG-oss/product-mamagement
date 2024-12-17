// change status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");

if(buttonChangeStatus.length > 0){
    const formChangeStatus = document.querySelector("#form-change-status");
    const path = formChangeStatus.getAttribute("data-path");

    console.log("current path: ", path);

    buttonChangeStatus.forEach(item =>{
        item.addEventListener("click",()=> {
            const statusCurrent = item.getAttribute("data-status");
            const id = item.getAttribute("data-id");

            console.log("statusCurrent: ", statusCurrent);
            console.log("id: ", id);

            let statusChange = (statusCurrent == "active") ? "inactive" : "active";
            console.log("statusChange: ", statusChange);

            const action = path + `/${statusChange}/${id}?_method=PATCH`;
            console.log("action: ", action);

            formChangeStatus.setAttribute("action", action); // or formChangeStatus.action = action;

            formChangeStatus.submit();
        });
    });
}

// delete product
// end delete product

