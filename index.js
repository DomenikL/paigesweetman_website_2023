const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('/api/artpieces', async (req, res) => {
    const response = [
        { id: 10, description: "Alternate Cover", filename: "piece1.png" },
        { id: 20, description: "Final Cover", filename: "piece2.png"},
        { id: 30, description: "Alternate Cover", filename: "piece3.png" },
        { id: 40, description: "Final Cover", filename: "piece4.png"},
        { id: 50, description: "Alternate Cover", filename: "piece5.png" },
        { id: 60, description: "Final Cover", filename: "piece6.png"},
        { id: 70, description: "Alternate Cover", filename: "piece7.png" },
        { id: 80, description: "Final Cover", filename: "piece8.png"},
    ]
    res.json(response)
})

const server = app.listen(8080, () => {
    console.log('Server is running on port 8080')   
})