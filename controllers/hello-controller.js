
// controllers are functions, classes, or modules whose only role is to handle HTTP requests
// and participate in a client/server architecture
// In our case hello-controller handles HTTP requests for a hello greeting and
// responds with a friendly reply

const HelloController = (app) => {

    app.get('/hello', (req, res) => {
        res.send('Life is good!')
    });
    app.get('/', (req, res) => {
        res.send('Welcome to Full Stack Development!')
    });
}
export default HelloController;