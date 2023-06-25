

import nodemailer from 'nodemailer'

export const sendEmail = async(options)=>{

    let transporter = nodemailer.createTransport({
        service:"gmail", 
        auth: {
          user:"noort.mohamed@gmail.com",
          pass:"jrdamjhcdphgdfey"
        },
      });


    let info = await transporter.sendMail({
        from: '"noor" <noort.mohamed@gmail.com>', // sender address
        to: options.email , // list of receivers
        subject: "Hello ✔", // Subject line
        html: options.html, // html body
        //html:"<h1>Hello World</h1>"
      });

      console.log(info);
    
}




