import  {   NextFunction, 
            Request , 
            Response, 
            Router          }   from "express"

export class UserRoute {

public  router          : Router
private entityName      : string = "user"
private routeRootPath   : string = `/${this.entityName}`

constructor(router: Router){
this.router = router
this.initializeRoute();
}

protected initializeRoute(){
// this.router.get(`${this.routeRootPath}/get`, (req: Request, res: Response, next: NextFunction)=>{

// });

}
}