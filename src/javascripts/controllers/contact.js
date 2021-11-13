import {Contact} from '../models/contact'

export const contactAPI = (req, res, next) => {
    let contact = new Contact(req.body)
    contact.save(err => {
        if(err){
            res.json({sucess: false, messaged: "Unable to save to DB"})
            res.end
        }else {
            res.status(200)
            res.end
        }

    })
}