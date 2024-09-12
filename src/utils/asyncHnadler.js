const asyncHnadler = (requestHnadler) => {
    (req, res, next) => {
        Promise.resolve(requestHnadler(req, res, next)).
        catch((err) => next(err))
    }
}



export {asyncHnadler}

//const asyncHnadler = (func) => async () => {}


/*const asyncHnadler = (fn) => async (req,res,next) => {

    try{
        await fn(req, res, next)
    } catch (error){
        res.status(err.code || 500).json({
            success: false,
            message: err.message
        })
    }
}*/