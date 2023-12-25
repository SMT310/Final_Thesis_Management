const authRouter = require('./auth')
const userRouter = require('./user')
const thesisRouter = require('./thesis');
const majorRouter = require('./major');
const scheduleRouter = require('./schedule');
const taskRouter = require('./task')
function route (app) {
    app.use('/api/auths', authRouter);
    app.use('/api/users', userRouter);
    app.use('/api/theses', thesisRouter);
    app.use('/api/majors', majorRouter);
    app.use('/api/schedules', scheduleRouter);
    app.use('/api/tasks', taskRouter);

    app.use('/*',(req, res)=>{
       res.status(404).json('Endpoint not found !');
    });
}

module.exports = route;