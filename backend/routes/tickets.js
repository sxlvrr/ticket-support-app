// backend/routes/tickets.js
const express = require('express');
const router = express.Router();
const db = require('../db');

// ➤ POST /tickets: create a ticket
router.post('/', (req, res) => {
  const { title, description, priority, employee_id } = req.body;
  if (!title || !description || !priority || !employee_id) {
    console.log(req.body)
    return res.status(400).json({ message: 'Missing required fields ❌' });
  }
  const sql = `
    INSERT INTO tickets (title, description, priority, employee_id)
    VALUES (?, ?, ?, ?)
  `;
  db.query(sql, [title, description, priority, employee_id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error creating ticket ❌' });
    }
    res.status(201).json({ message: 'Ticket created successfully ✅', ticket_id: result.insertId });
  });
});

// ➤ GET /tickets: get all tickets
router.get('/', (req, res) => {
  const sql = `
    SELECT t.id, t.title, t.description, t.status, t.priority,
           t.creation_date, t.update_date,
           u.name AS employee_name, u.email AS employee_email
    FROM tickets t
    JOIN users u ON t.employee_id = u.id
    ORDER BY t.creation_date DESC
  `;
  db.query(sql, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving tickets ❌' });
    }
    res.status(200).json(results);
  });
});

// ➤ PATCH /tickets/:id: update a ticket partially
router.patch('/:id', (req, res) => {
  const ticketId = req.params.id;
  const { title, description, status, priority, technician_id, employee_id } = req.body;
  
  // Log incoming request data
  console.log("Updating ticket:", ticketId);
  console.log("Request body:", req.body);
  
  if (!title && !description && !status && !priority && technician_id === undefined && employee_id === undefined) {
    return res.status(400).json({ message: 'No fields to update ❌' });
  }
  
  // Build query dynamically
  const fields = [];
  const values = [];
  
  if (title) {
    fields.push('title = ?');
    values.push(title);
  }
  if (description) {
    fields.push('description = ?');
    values.push(description);
  }
  if (status) {
    fields.push('status = ?');
    values.push(status);
  }
  if (priority) {
    fields.push('priority = ?');
    values.push(priority);
  }
  if (technician_id !== undefined) {
    fields.push('technician_id = ?');
    values.push(technician_id);
  }
  if (employee_id !== undefined) {
    fields.push('employee_id = ?');
    values.push(employee_id);
  }
  
  // Add ticket ID as the last parameter
  values.push(ticketId);
  
  // Generate the SQL query
  const sql = `UPDATE tickets SET ${fields.join(', ')}, update_date = NOW() WHERE id = ?`;
  console.log("Generated SQL:", sql);
  console.log("SQL parameters:", values);
  
  // Execute the query
  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: 'Error updating ticket ❌', error: err.message });
    }
    
    console.log("Update result:", result);
    
    // Check if anything was updated
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Ticket not found or no changes made ❌' });
    }
    
    res.status(200).json({ 
      message: 'Ticket updated successfully ✅',
      ticketId: ticketId,
      fieldsUpdated: fields.length,
      affectedRows: result.affectedRows
    });
  });
});

// ➤ GET /tickets/:id: get a single ticket
router.get('/:id', (req, res) => {
  const ticketId = req.params.id;
  const sql = `
    SELECT t.id, t.title, t.description, t.status, t.priority,
           t.creation_date, t.update_date,
           u.name AS employee_name, u.email AS employee_email,
           tech.name AS technician_name, tech.email AS technician_email
    FROM tickets t
    JOIN users u ON t.employee_id = u.id
    LEFT JOIN users tech ON t.technician_id = tech.id
    WHERE t.id = ?
  `;
  db.query(sql, [ticketId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error retrieving ticket ❌' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Ticket not found ❌' });
    }
    res.status(200).json(results[0]);
  });
});

// ➤ DELETE /tickets/:id: delete a ticket
router.delete('/:id', (req, res) => {
  const ticketId = req.params.id;
  const sql = 'DELETE FROM tickets WHERE id = ?';
  db.query(sql, [ticketId], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Error deleting ticket ❌' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Ticket not found ❌' });
    }
    res.status(200).json({ message: 'Ticket deleted successfully ✅' });
  });
});

module.exports = router;