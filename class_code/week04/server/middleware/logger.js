// The correct order: (request, response, next)
// "next" allows the next function to be run
const logger = (req, res, next) => {
    console.log(req.url);
    console.log(req.method);
    console.log(req.headers);
    // console.log(Data())
    next();
}

export default logger;