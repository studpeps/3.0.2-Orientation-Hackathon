exports.catchErrors = (fn) => {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => {
            if (typeof err === "string") {
                console.log("Error populated: " + err);
                res.status(400).json({
                    message: err,
                });
            } else {
                next(err);
            }
        });
    };
};
