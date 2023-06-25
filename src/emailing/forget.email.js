import nodemailer from 'nodemailer'

export const sendCodeEmail = async(to,subject,html)=>{

    let transporter = nodemailer.createTransport({
        service:"gmail", 
        auth: {
          user: "maryamkhaled2445@gmail.com",
          pass: "pbgtzxnessefkbfx", 
        },
      });


    let info = await transporter.sendMail({
        from: '"mariam" <maryamkhaled2445@gmail.com>', // sender address
        to, // list of receivers
        subject, // Subject line
        html, // html body
        //html:"<h1>Hello World</h1>"
      });

      console.log(info);
    
}
