import  {   NextFunction, 
            Request, 
            Response, 
            Router          }   from "express"
import      log                 from "../config/log";

const entityName    : string = ""
const routeRootPath : string = `/${entityName}`
const router        : Router = Router()

router.all(`${routeRootPath}`, (req: Request, res: Response, next: NextFunction )=>{
    log(`GET ${routeRootPath}`, "ROUTE")
    res.send({ 
        "server-status" : "Up",
        "nodejs-version" : process.version
    })
    res.end()
    next()
});

export default router;
    
