var conn = require('./db');

module.exports = {

    //o metodo render, renderiza as informaçoes na tela
    render(req, res, error){

        res.render('admin/login', {
            body: req.body,
            error
        });


    },

    login(email, password){

        return new Promise((resolve, reject)=>{

            conn.query(`
                SELECT * FROM tb_users WHERE email = ? 
            `, [
                email
            ], (error, results)=>{

                if(error) {
                    reject(error);
                }else{

                    if(!results.length > 0) {
                        reject("Usuario ou senha incorretos.");
                    }else{

                        let row = results[0];

                        if(row.password !== password){

                            reject("Usuario ou senha incorretos.");

                        }else{
                            resolve(row);
                        }

                    } 

                    //retorna um array de varias linhas, mas pegamos so a primeira linha
                    

                }

            });

        })

    },

    getUsers(){

        return new Promise((resolve, reject)=>{

            //conn.query faz uma consulta no banco de dados
            conn.query(`
            SELECT * FROM tb_users ORDER BY name
            `, (err, results)=>{
            if(err){
                reject(err);
            } 

            resolve(results);    

            });

        });

    },

    save(fields, files){

        return new Promise((resolve, reject)=>{

            let query, queryPhoto = '', params = [
                fields.name,
                fields.email       
            ];

            if(parseInt(fields.id) > 0) {

                params.push(fields.id);

                query = `
                    UPDATE tb_users
                    SET name = ?, 
                        email = ?
                    WHERE id = ?    
                `;

            }else{

                query = `
                    INSERT INTO tb_users (name, email, password)
                    VALUES(?, ?, ?) 
                `;

                params.push(fields.password);
            
            }

            conn.query(query, params, (err, results)=>{

                if(err){
                    reject(err);
                }else{
                    resolve(results);
                }

            })

        });

    },

    delete(id){

        return new Promise((resolve, reject)=>{

            conn.query(`
                DELETE FROM tb_users WHERE id = ?
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
        
    },

    changePassword(req){

        return new Promise((resolve, reject)=>{

            if (!req.fields.password){

                reject("Preencha a senha.");

            }else if(req.fields.password !== req.fields.passwordConfirm){
                reject("Confirme a senha corretamente.");
            }else{
                conn.query(`
                    UPDATE tb_users
                    SET password = ?
                    WHERE id = ?    
              `, [
                req.fields.password,
                req.fields.id
              ], (err, results)=>{

                if(err){
                    reject(err.message);
                }else{
                    resolve(results);
                }

              });

            }

        });

    }
}