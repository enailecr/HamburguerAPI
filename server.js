require('./src/configs/database');
const app = require('./src/configs/express')();

app.listen(app.get('port'), () => {            
    console.log(`Now listening on port ${app.get('port')}`); 
});
