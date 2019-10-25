module.exports = dependencies => (req,res,next) => {
    dependencies.forEach(d=>req[d]=require(`../services/${d}`));
    next();
}