
// xu ly restore product
const btnRestore = document.querySelectorAll("[button-restore]");

console.log(btnRestore.length);

if(btnRestore.length > 0){
    const formRestore = document.querySelector("#form-restore");
    const path = formRestore.getAttribute("data-path");
    console.log(path);
    console.log(formRestore);

    btnRestore.forEach(btn => {
        btn.addEventListener("click", ()=>{

            const isConfirm = confirm("Are you sure to restore this product?");

            if(isConfirm){
                const id = btn.getAttribute("data-id");
                const action = path + `/${id}?_method=PATCH`;

                formRestore.setAttribute("action", action);
                formRestore.submit();
            }
        });
    });
}