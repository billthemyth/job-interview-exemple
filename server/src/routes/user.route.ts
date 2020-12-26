import  {   NextFunction, 
            Request, 
            Response, 
            Router              }   from "express"
import      log                     from "../config/log"
import  {   UserController      }   from "../controller/user.controller"
import  {   UserEntity          }   from "../entities/user.entity"

const entityName    : string            = "user"
const routeRootPath : string            = `/${entityName}`
const router        : Router            = Router()
const controller    : UserController  = new UserController()

router.all  ( `${routeRootPath}`,
            (   
                _req: Request, 
                res: Response, 
                next: NextFunction 
            )=>{
                log(`GET ${routeRootPath}`, "ROUTE")
                res.send({ 
                    "entity" : entityName,
                    "about" : `Is a route for CRUD operation for ${entityName}s`
                })
                res.end()
                next()
                }
            )

router.post (`${routeRootPath}/insert_entity`,
            (   
            req: Request, 
            res: Response, 
            next: NextFunction 
            )=>{

            log(`POST ${routeRootPath}/insert_entity`, "ROUTE")

            try {

                if( !req.body.person_id || !req.body.login || !req.body.password ){
                    throw new Error("Missing fields!")
                }

                const user = new UserEntity(
                                                undefined,          req.body.person_id, req.body.login, 
                                                req.body.password,  new Date,           new Date, 
                                                undefined
                                                )

                controller.insert_entity(user, ()=>{
                    log(`${entityName} Inserted`, "DB")
                })
                res.send({ status : "SUCCESS", message : `${entityName} selected with succcess!`})
            } catch (error) {
                res.send({ status : "FAIL", message : "invalid data", error })
            } 
            res.end()
            next()
            }
            )

router.post (`${routeRootPath}/update_entity`,
            (
            req: Request, 
            res: Response, 
            next: NextFunction 
            )=>{             

                log(`POST ${routeRootPath}/update_entity`, "ROUTE")

                try {

                    if(!req.body.id){
                        throw Error("ID dont sended")
                    }

                    const entities = controller.select_entity_one(req.body.id)
                    
                    if(entities.length == 0 ){                        
                        throw Error("ID dont exists!")
                    }
                    
                    const user = new UserEntity(
                        req.body.id,
                        req.body.person_id ? req.body.person_id : entities[0].personID,
                        req.body.login ? req.body.login : entities[0].login,
                        req.body.password ? req.body.password : entities[0].password,
                        entities[0].created_at,
                        new Date,
                        req.body.deactivated_at ? req.body.deactivated_at : entities[0].deactivated_at
                    )

                    controller.update_entity(user.id + "", user, ()=>{
                        log(`entity ${entityName} updated`, 'DB')
                    })

                    res.send({ status : "SUCCESS", message : `${entityName} updated with succcess!`})

                } catch (error) {
                    res.send({ status : "FAIL", message : "invalid data", error })
                }
                res.end()
                next()
                }
            )

router.get  (`${routeRootPath}/select_entity`, 
            (   req: Request, 
            res: Response, 
            next: NextFunction 
            )=>{         
            log(`POST ${routeRootPath}/select_entity`, "ROUTE")
            try {
                res.send({  
                            status  : "SUCCESS", 
                            message : `${entityName} selected with succcess!`, 
                            result  : controller.select_entity().filter( en => !en.deactivated_at )
                        })

            } catch (error) {
                res.send({ status : "FAIL", message : "Server with problem", error })
            }
            res.end()
            next()
            }
            )

router.post (`${routeRootPath}/auth`, 
            (   
            req: Request, 
            res: Response, 
            next: NextFunction 
            )=>{     

            log(`POST ${routeRootPath}/auth`, "ROUTE")
            try {
                const entities = controller.authenticate(req.body.login, req.body.password)
                if(entities.length == 0){
                    throw Error("Invalid Password!")
                }

                res.send({  
                            status  : "SUCCESS", 
                            message : `${entityName} selected with succcess!`, 
                            result  : controller.authenticate(req.body.login, req.body.password)
                        })

            } catch (error) {
                res.send({ status : "FAIL", message : "Server with problem", error })
                res.end()
            }
            res.end()
            next()
            }
            )

router.get  (`${routeRootPath}/select_entity_one/:id`, 
            (   req: Request, 
            res: Response, 
            next: NextFunction 
            )=>{                
            log(`GET ${routeRootPath}/select_entity_one/:id`, "ROUTE")
            try {

                if(controller.select_entity_one(req.params.id).length == 0 ){
                    throw Error("ID dont exists!")
                }

                res.send({  
                            status  : "SUCCESS", 
                            message : `${entityName} selected with succcess!`, 
                            result  : controller.select_entity_one(req.params.id ? req.params.id.toString() : "")[0]
                        })

            } catch (error) {
                res.send({ status : "FAIL", message : "Server with problem", error })
                res.end()
            }
            res.end()
            next()
            }
            )


export default router
