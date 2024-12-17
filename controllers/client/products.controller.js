const Product = require("../../model/product.model");

module.exports.index = async (req, res) => { 
    const products = await Product.find({
         availabilityStatus: 'In Stock'
    }).sort({position: "desc"});

    products.forEach((product) => {
       product.newPrice = (product.price*(100-product.discountPercentage)/100).toFixed(0);
    });

    // console.log(products);

    if(products.length > 0){
        console.log("Read date success!");
    }
    else console.log("Read data fail.");

    res.render("client/pages/products/index.pug",{
        title: "Products",
        products: products
    });
}

