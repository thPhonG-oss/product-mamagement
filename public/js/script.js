// Xu ly button status
const buttonStatus = document.querySelectorAll("[button-status]");
// query đến một attribute tự định nghĩa phải để trong cặp dấu ngoặc vuông.

if (buttonStatus.length > 0) {
    let url = new URL(window.location.href);

    console.log(url);
    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");
            // console.log(status);

            if(status){
                url.searchParams.set("status", status);
            }
            else{
                url.searchParams.delete("status");
            }

            window.location.href = url.href;
        })
    });
}
//end button status

