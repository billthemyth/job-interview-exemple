import  {   NextFunction, 
            Request, 
            Response, 
             Router             }   from "express"
import      log                     from "../config/log"
import {    PersonController    }   from "../controller/person.controller"
import {    PersonEntity        }   from "../entities/person.entity"

const entityName    : string            = "person"
const routeRootPath : string            = `/${entityName}`
const router        : Router            = Router()
const controller    : PersonController  = new PersonController()

router.all  ( `${routeRootPath}`,
            (   req: Request, 
                res: Response, 
                next: NextFunction 
            )=>{
                log(`GET ${routeRootPath}`, "ROUTE")
                res.send({ 
                    "entity" : "person",
                    "about" : `Is a route for CRUD operation for ${entityName}`
                })
                res.end()
                next()
                }
            )

router.post (`${routeRootPath}/insert_entity`,
            (   req: Request, 
                res: Response, 
                next: NextFunction 
            )=>{
                log(`POST ${routeRootPath}/insert_entity`, "ROUTE")

                try {
                    const person = new PersonEntity(
                        undefined,          req.body.name,      req.body.lastName,
                        req.body.cpf,       req.body.perfil,    undefined,
                        undefined,          undefined
                    );

                    controller.insert_entity(person, ()=>{
                        log("Person Inserted", "DB")
                    })
                    res.send({ status : "SUCCESS", message : `${entityName} selected with succcess!`})
                    res.end()

                } catch (error) {
                    res.send({ status : "FAIL", message : "invalid data", error })
                    res.end()
                } 
                }
            )
// NT
router.get (`${routeRootPath}/deactivate_entity/:id`,
            (   req: Request, 
                res: Response, 
                next: NextFunction 
            )=>{
                log(`POST ${routeRootPath}/deactivate_entity`, "ROUTE")

                try {

                    if(!controller.select_entity_one(req.params.id)){
                        throw Error("ID dont exists!")
                    }

                    controller.deactivate_entity(req.params.id, ()=>{
                        log(`${entityName} entity deactivated`, "DB")
                    })
                    
                    res.send({ status : "SUCCESS", message : `${entityName} deactivated with succcess!`})
                    res.end()

                } catch (error) {
                    res.send({ status : "FAIL", message : "invalid data", error })
                    res.end()
                } 
                }
            )

router.post (`${routeRootPath}/update_entity`, 
            (   req: Request, 
                res: Response, 
                next: NextFunction 
            )=>{                
                log(`POST ${routeRootPath}/update_entity`, "ROUTE")

                try {
                    
                    if(!controller.select_entity_one(req.params.id)){
                        throw Error("ID dont exists!")
                    }

                    const person = new PersonEntity(
                        undefined,          req.body.name,      req.body.lastName,
                        req.body.cpf,       req.body.perfil,    undefined,
                        undefined,          undefined
                    );

                    // controller.update_entity( req.body.id, person, ()=>{
                    //     log("Person Updated", "DB")
                    // })
                    res.send({ status : "SUCCESS", message : `${entityName} updated with succcess!`})
                    res.end()

                } catch (error) {
                    res.send({ status : "FAIL", message : "invalid data", error })
                    res.end()
                } 
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
                                result  : controller.select_entity()
                            })
                    res.end()

                } catch (error) {
                    res.send({ status : "FAIL", message : "Server with problem", error })
                    res.end()
                } 
                }
            )
            
router.get (`${routeRootPath}/select_entity_one/:id`, 
            (   req: Request, 
                res: Response, 
                next: NextFunction 
            )=>{                
                log(`POST ${routeRootPath}/select_entity_one`, "ROUTE")
                try {
                    res.send({  
                                status  : "SUCCESS", 
                                message : `${entityName} selected with succcess!`, 
                                result  : controller.select_entity_one(req.params.id ? req.params.id.toString() : "")
                            })

                    res.end()

                } catch (error) {
                    res.send({ status : "FAIL", message : "Server with problem", error })
                    res.end()
                } 
                }
            )

export default router
