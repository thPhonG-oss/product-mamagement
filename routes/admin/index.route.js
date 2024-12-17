const dashboardRoutes = require('./dashboard.route');
const systemConfig = require("../../config/system");
const productRoutes = require("./product.route");
const trashRoutes = require("./trash.route");
module.exports = (app) => {
    const PATH_ADMIN = systemConfig.prefixAdmin;
    app.use(PATH_ADMIN + "/dashboard", dashboardRoutes);
    
    app.use(PATH_ADMIN + "/products", productRoutes);
    app.use(PATH_ADMIN + "/products/change-status/:status/:id", productRoutes);
    app.use(PATH_ADMIN + "/products/change-multi", productRoutes);
    app.use(PATH_ADMIN + "/trash", trashRoutes);
    app.use(PATH_ADMIN + "/trash/restore/:id", trashRoutes);
    app.use(PATH_ADMIN + "/products/create", productRoutes);
}