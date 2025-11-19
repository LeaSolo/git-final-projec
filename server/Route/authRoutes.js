const express=require("express")
const router=express.Router()
const authComtroller=require("../Controller/authComtroller")

router.post("/login",authComtroller.login)
router.post("/register",authComtroller.register)




module.exports = router
