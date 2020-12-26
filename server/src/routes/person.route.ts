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

                    if( !req.body.name || !req.body.lastName || !req.body.cpf || !req.body.profile){
                        throw new Error("Missing fields!")
                    }

                    const person = new PersonEntity(
                        undefined,          req.body.name,      req.body.lastName,
                        req.body.profile,   req.body.cpf,       undefined,
                        undefined,          undefined
                    );

                    controller.insert_entity(person, ()=>{
                        log(`${entityName} inserted`, "DB")
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
                    
                    const person = new PersonEntity(
                        req.body.id,
                        req.body.name ? req.body.name : entities[0].name,
                        req.body.lastName ? req.body.lastName : entities[0].lastName,
                        req.body.cpf ? req.body.cpf : entities[0].cpf,
                        req.body.profile ? req.body.profile : entities[0].profile,
                        entities[0].created_at,
                        new Date,
                        req.body.deactivated_at ? req.body.deactivated_at : entities[0].deactivated_at
                    )
                    controller.update_entity(person.id + "", person, ()=>{
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
            
router.get (`${routeRootPath}/select_entity_one/:id`, 
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
