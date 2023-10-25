export const publicAcces = (req,res,next) => {
    if(req.session.user) return res.redirect('/profile');
    next();
}

export const privateAcces = (req,res,next) => {
    if(!req.session.user) return res.redirect('/login');
    next();
}