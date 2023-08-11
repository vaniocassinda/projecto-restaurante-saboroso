var conn = require('./db');

module.exports = {

    
    render(req, res, error, success){
        
        res.render('emails', {
            title: 'Contato - Restaurante Saboroso!',
            background: 'images/img_bg_3.jpg',
            h1: 'Diga um oi!',
            body: req.body,
            error,
            success
          }); 

    },

    save(req){

       return new Promise((resolve, reject)=>{

        if(!req.fields.email){
            reject("Preencha o email.");
        }else{
      
          conn.query(`
              INSERT INTO tb_emails (email) VALUES(?)
          `, [
            req.fields.email
          ], (err, results)=>{
      
              if(err){
                reject(err.message);
              }else{
                resolve(results);
              }
      
          });
      
        }

       });  

    },

    getEmails(){

        return new Promise((resolve, reject)=>{

            //conn.query faz uma consulta no banco de dados
            conn.query(`
            SELECT * FROM tb_emails ORDER BY register DESC
            `, (err, results)=>{
            if(err){
                reject(err);
            } 

            resolve(results);    

            });

        });

    },

    delete(id){

        return new Promise((resolve, reject)=>{

            conn.query(`
                DELETE FROM tb_contacts WHERE id = ?
            `, [
                id
            ], (err, results)=>{

                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }

            });


        });
        
    }

}

