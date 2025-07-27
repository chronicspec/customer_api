const { getAll, saveAll } = require('../models/customerModel');

exports.getCustomers = (req, res) => {
    const customers = getAll();
    res.json(customers);
};

exports.getCustomerBy = (req, res) => {
    const customers = getAll();
    const { id, name } = req.query;

    if (id) {
        const customer = customers.find(c => c.id === parseInt(id));
        return customer
            ? res.json(customer)
            : res.status(404).send('Customer not found by ID');
    }

    if (name) {
        const matched = customers.filter(c =>
            c.name.toLowerCase().includes(name.toLowerCase())
        );
        return matched.length > 0
            ? res.json(matched)
            : res.status(404).send('Customer not found by name');
    }

    return res.status(400).send('Please provide id or name in query');
};

exports.createCustomer = (req, res) => {
    const { error } = require('../validators/customerValidator').validateCustomer.validate(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message });
    }

    const customers = getAll();
    const newCustomer = {
        id: customers.length + 1,
        name: req.body.name,
        email: req.body.email,
        create_at: new Date().toISOString()
    };
    customers.push(newCustomer);
    saveAll(customers);
    res.status(201).json(newCustomer);
};

exports.updateCustomer = (req, res) => {
    const customers = getAll();
    const index = customers.findIndex(c => c.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: "Not found" });
    }
    customers[index] = { ...customers[index], ...req.body };
    saveAll(customers);
    res.json(customers[index]);
};

exports.deleteCustomer = (req, res) => {
  const customers = getAll();
  const newList = customers.filter(c => c.id !== req.params.id);

  if (newList.length === customers.length) {
    return res.status(404).json({ message: "Not found" });
  }

  saveAll(customers);
  res.status(204).send();
};