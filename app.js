const express = require('express');
const app = express();
const customerRoutes = require('./routes/customerRoute');
const PORT = 3000;

app.use(express.json());
app.use('/api/customers', customerRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});