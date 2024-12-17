// xu ly button-status
const buttonStatus = document.querySelectorAll("[button-status]"); //các attribute tự định nghĩa phải để trong cặp ngoặc vuông.

if (buttonStatus.length > 0) {
  const url = new URL(window.location.href);

  buttonStatus.forEach((item) => {
    console.log(item);
    item.addEventListener("click", () => {
      buttonStatus.forEach((button) => {
        button.classList.remove("active");
      });
      item.classList.add("active");
      const status = item.getAttribute("button-status");
      // console.log(status);

      if (status) {
        url.searchParams.set("status", status);
      } else {
        url.searchParams.delete("status");
      }
      console.log(url.href);

      window.location.href = url.href;
    });
  });
}

// FORM SEARCH \
const formSearch = document.querySelector("#form-search");
if (formSearch) {
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    e.preventDefault(); // mặc định khi submit sẽ reload lại trang, preventDefault sẽ ngăn reload
    const keyword = e.target.elements.keyword.value;
    console.log(keyword);

    if (keyword) {
      url.searchParams.set("keyword", keyword);
    } else {
      url.searchParams.delete("keyword");
    }

    window.location.href = url.href;
    console.log(url);
  });
}
// END FORM SEARCH

// xu ly pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
console.log(buttonPagination);

if (buttonPagination) {
  let url = new URL(window.location.href);
  console.log(url);

  buttonPagination.forEach((button) => {
    console.log(button);
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      console.log(page);

      url.searchParams.set("page", page);

      window.location.href = url.href;
    });
  });
}

// end pagination

// checkbox multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
console.log(checkboxMulti);
if (checkboxMulti) {
  const checkAll = checkboxMulti.querySelector("input[name='check-all']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

  console.log(checkAll);
  console.log(inputsId);

  checkAll.addEventListener("click", () => {
    console.log(checkAll.checked);
    if (checkAll.checked) {
      inputsId.forEach((item) => {
        item.checked = true;
      });
    } else {
      inputsId.forEach((item) => {
        item.checked = false;
      });
    }
  });

  inputsId.forEach((input) => {
    const checkAll = checkboxMulti.querySelector("input[name='check-all']");
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
      );
      console.log(countChecked.length);
      console.log(inputsId.length);

      if (countChecked.length === inputsId.length) {
        checkAll.checked = true;
      } else {
        checkAll.checked = false;
      }
    });
  });
}
// end checkbox multi

// form change multi status
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault(); // prevent reload page
    const checkboxMulti = document.querySelector("[checkbox-multi]");
    const checkedInputs = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );

    console.log(checkedInputs);

    // xu ly xoa nhieu san pham
    const typeChange = e.target.elements.type.value;
    console.log(typeChange);

    if (typeChange == "delete") {
      const isConfirm = confirm("Are you sure to delete all item?");

      if (!isConfirm) {
        return;
      }
    }

    if (checkedInputs.length > 0) {
      let ids = [];

      checkedInputs.forEach((input) => {
        const id = input.value;
        if (typeChange == "change-position") {
          const tr = input.closest("tr");
          const position = tr.querySelector("input[name='position']").value;
          console.log(`${id}` + "-" + `${position}`);
          ids.push(`${id}` + "-" + `${position}`);
        } else {
          ids.push(id);
        }
      });

      console.log(ids.join(", "));

      const inputIds = formChangeMulti.querySelector("input[name='ids']");
      if (inputIds) {
        inputIds.value = ids.join(", ");
      }

      formChangeMulti.submit();
    } else {
      alert("Please select at least one product.");
    }
  });
}
// end form change multi

// delete item: Xóa vĩnh viễn/xóa mềm
const deleteButtons = document.querySelectorAll("[button-delete]");
if (deleteButtons.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isConfirm = confirm("Are you sure to delete this item?");

      if (isConfirm) {
        id = button.getAttribute("data-id");
        console.log(id);

        const action = `${path}/${id}?_method=DELETE`;
        console.log(action);

        formDeleteItem.setAttribute("action", action);
        formDeleteItem.submit();
      }
    });
  });
}

// Xử lý logic cho phần alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeButton = showAlert.querySelector("[close-alert]");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  closeButton.addEventListener("click", () => {
    showAlert.classList.add("d-none");
  });
}
// end show alert

// Upload image

// end upload image

// Xử lý logic cho phần modal

