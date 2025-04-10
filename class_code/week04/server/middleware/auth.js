const auth = (req, res, next) => {
    if(req.query.username == "Lisa") {
        // Can only reach the page when the query matches
        // http://~?username=Lisa
        next();
    } else {
        res.send("You are not authorized for this page");
    }
}

export default auth;