const mysql = require("mysql2");
const http = require("http");
  
function run(){
    const connection = mysql.createConnection({
    host: "mysql",
    user: "root",
    database: "apidb",
    password: "pass"
    });

    connection.connect(function(error){
        if (error) {
            console.error("Connection error: " + error.message);
            check = true;
        } else{
            console.log("Mysql connected.");
            check = false;
        }
    });

    http.createServer(function(request, response){
        if (request.url == "/message") {
            if (request.method == "POST"){
                let data = "";
                request.on("data", chunk => {
                    data += chunk;
                });
                request.on("end", () => {
                    data = JSON.parse(data);
                    data = [data.name,data.email,data.message];
                    connection.query("INSERT INTO messages(user_name, user_email, user_message) VALUES(?,?,?)", data,
                    function (error, results, fields){
                        if (error) {
                            console.log("Saving data error: " + error.message);
                            response.statusCode = 500;
                            response.end("Internal error.");
                        } else {
                            response.statusCode = 201;
                            response.end("Message saved.");
                        }
                    });
                });
            } else if (request.method == "GET") {
                connection.execute("SELECT * FROM messages",
                function (error, results, fields){
                    if (error) {
                        console.log("Saving data error: " + error.message);
                        response.statusCode = 500;
                        response.end("Internal error.");
                    } else {
                        response.statusCode = 200;
                        response.write(JSON.stringify(results));
                        response.end();
                    }
                });
            } else {
                response.statusCode = 404;
                response.end("There is nothing.");
            }
        } else {
            response.statusCode = 404;
            response.end("There is nothing.");
        }
    }).listen(8000);
}

setTimeout(run, 120 * 1000);