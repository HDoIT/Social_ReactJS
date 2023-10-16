// const ErrorHander = require('../utils/errorHandler')

module.exports = (err,req, res, next) =>{
    err.statusCode = err.statusCode || 500
    err.message = err.message || "lỗi máy chủ nội bộ"

    if (err.name === "JsonWebTokenError") {
        const message = `Đăng nhập `;
        err = new ErrorHandler(message, 401);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    })
}