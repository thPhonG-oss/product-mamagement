const { prefixAdmin } = require("../../config/system");
const Product = require("../../model/product.model");

const filterStatusHelper = require("../../helpers/filterStatus"); // call den filter status
const searchHelper = require("../../helpers/search");
const paginationHelper = require("../../helpers/pagination");

// [GET] /admin/products
module.exports.product = async (req, res) => {
  // phan xu ly button status
  filterStatus = filterStatusHelper(req.query);

  let find = {
    deleted: false,
  }; // ham filter

  if (req.query.status) {
    if (req.query.status == "active") find.availabilityStatus = "In Stock";
    else find.availabilityStatus = "Low Stock";
  }

  // Phan tim kiem san pham
  objSearch = searchHelper(req.query);
  if (objSearch.regex) {
    find.title = objSearch.regex;
  }

  // Pagination
  const countProduct = await Product.countDocuments(find);
  let objPagination = paginationHelper(
    {
      currentPage: 1,
      limitItems: 5,
    },
    req.query,
    countProduct
  );
  // end pagination

  const products = await Product.find(find)
    .sort({ position: "desc" })
    .limit(objPagination.limitItems)
    .skip(objPagination.skip); // lay data tu db, dua tren bo loc la object find

  products.forEach((product) => {
    product.newPrice = (
      (product.price * (100 - product.discountPercentage)) /
      100
    ).toFixed(0);
  });

  // console.log(products);

  if (products.length > 0) {
    console.log("Read date success!");
  } else console.log("Read data fail.");

  res.render("admin/pages/products/index.pug", {
    title: "Products",
    products: products,
    filterStatus: filterStatus,
    keyword: objSearch.keyword,
    pagination: objPagination,
  });
};

// [PATCH] /admin/product/change-status/:status/:id
module.exports.changeStatus = async (req, res) => {
  const status = req.params.status;
  const id = req.params.id;

  await Product.updateOne(
    { _id: id },
    { availabilityStatus: status == "active" ? "In Stock" : "Low Stock" }
  );

  req.flash("success", "Updated status successfully !");
  res.redirect("back");
};

// [PATCH] /admin/products/change-multi
module.exports.changeMulti = async (req, res) => {
  const ids = req.body.ids.split(", ");
  const type = req.body.type;

  console.log(ids);
  switch (type) {
    case "active":
      await Product.updateMany(
        { _id: { $in: ids } },
        { availabilityStatus: "In Stock" }
      );
      req.flash("success", "Updated status successfully !");
      break;
    case "inactive":
      await Product.updateMany(
        { _id: { $in: ids } },
        { availabilityStatus: "Low Stock" }
      );
      req.flash("success", "Updated status successfully !");
      break;
    case "delete":
      await Product.updateMany(
        { _id: { $in: ids } },
        { deleted: true, deletedAt: new Date() }
      );
      req.flash("success", "Deleted successfully !");
      break;
    case "change-position":
      for (const item of ids) {
        let [id, position] = item.split("-");
        position = parseInt(position);

        await Product.updateOne({ _id: id }, { position: position });
      }
      req.flash("success", "Change position successfully !");
      break;
  }

  res.redirect("back");
};

// [DELETE] /admin/products/delete/:id : xóa vĩnh viễn
module.exports.deleteItem = async (req, res) => {
  const id = req.params.id;
  // await Product.deleteOne({_id: id});
  // xóa mềm:
  await Product.updateOne(
    { _id: id },
    {
      deleted: true,
      deletedAt: new Date(),
    }
  );
  req.flash("success", "Deleted successfully !");
  res.redirect("back");
};


// [POST] /admin/products/create
module.exports.createItem = async (req, res) => {
    res.render("admin/pages/products/createItem.pug", {
      title: "Create Product"
    });
}