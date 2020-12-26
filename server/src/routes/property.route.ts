import  {   NextFunction, 
            Request, 
            Response, 
            Router              }   from "express"
import      log                     from "../config/log"
import  {   PropertyController  }   from "../controller/property.controller"
import  {   PropertyEntity      }   from "../entities/property.entity"

const entityName    : string            = "property"
const routeRootPath : string            = `/${entityName}`
const router        : Router            = Router()
const controller    : PropertyController  = new PropertyController()

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

            if( !req.body.name || !req.body.owner_id ){
                throw new Error("Missing fields!")
            }

            const property = new PropertyEntity(
                                                undefined,  req.body.name,  new Date, 
                                                new Date,   undefined,      req.body.owner_id
                                             ) 

            controller.insert_entity(property, ()=>{
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
            
            const property = new PropertyEntity(
                req.body.id,
                req.body.name ? req.body.name : entities[0].name,
                entities[0].created_at,
                new Date,
                req.body.deactivated_at ? req.body.deactivated_at : entities[0].deactivated_at,
                req.body.owner_id ? req.body.owner_id : entities[0].ownerID
            )

            controller.update_entity(property.id + "", property, ()=>{
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
