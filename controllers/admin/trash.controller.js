const { prefixAdmin } = require("../../config/system");
const Product = require("../../model/product.model");

const paginationHelper = require("../../helpers/pagination");

module.exports.trash = async (req, res) => {
  let find = {
    deleted: true,
  };
  // pagination
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

  delProducts = await Product.find(find)
    .limit(objPagination.limitItems)
    .skip(objPagination.skip);

  res.render("admin/pages/trash/trash.pug", {
    title: "Trash",
    delProducts: delProducts,
    pagination: objPagination,
  });
};

module.exports.restore = async (req, res) => {
  const id = req.params.id;

  await Product.updateOne({ _id: id }, { deleted: false });
  res.redirect(`back`); 
};
