import      express                 from    "express"           
import      bodyParser              from    "body-parser"       
import      cors                    from    "cors"             
import      log                     from    "./config/log"
import      cookieParser            from    "cookie-parser"
import      IndexRouter             from    "./routes"
import      PersonRouter            from    "./routes/person.route"
import      PropertyRouter          from    "./routes/property.route"
import      UserRouter              from    "./routes/user.route"

const router    = express.Router()
const port      = process.env.PORT || 5000

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())
router.use(cors())
app.use(router)
app.use(IndexRouter)
app.use(PersonRouter)
app.use(PropertyRouter)
app.use(UserRouter)

app.listen(port, ()=>{
    log("Server started", "INFO")
    log(`Running on port ${port}` , "INFO")
})

