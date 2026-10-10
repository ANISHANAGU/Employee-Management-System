require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Employee = require('./models/Employee');

const app = express();
app.use(express.json());
app.get('/', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Employee Management System</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background: #f0f4f8;
                margin: 0;
                padding: 30px;
            }
            .container {
                max-width: 750px;
                margin: auto;
                background: white;
                padding: 25px;
                border-radius: 12px;
                box-shadow: 0 4px 12px #ccc;
            }
            h1 {
                text-align: center;
                color: #173b67;
            }
            h2 {
                color: #173b67;
                border-bottom: 1px solid #ddd;
                padding-bottom: 8px;
            }
            label {
                display: block;
                margin-top: 12px;
                font-weight: bold;
            }
            input, select {
                width: 100%;
                box-sizing: border-box;
                padding: 10px;
                margin-top: 5px;
                border: 1px solid #bbb;
                border-radius: 5px;
            }
            button {
                background: #1769aa;
                color: white;
                border: none;
                padding: 11px 16px;
                margin: 8px 5px 0 0;
                border-radius: 5px;
                cursor: pointer;
            }
            button:hover {
                background: #104d80;
            }
            .status {
                text-align: center;
                color: green;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Employee Management System</h1>
            <p class="status">MongoDB Employee Database</p>

            <h2>Employee Details</h2>

            <form id="employeeForm">
                <label>Employee ID</label>
                <input type="text" id="employeeId" placeholder="Enter employee ID" required>

                <label>Employee Name</label>
                <input type="text" id="name" placeholder="Enter employee name" required>

                <label>Department</label>
                <input type="text" id="department" placeholder="Enter department" required>

                <label>Designation</label>
                <input type="text" id="designation" placeholder="Enter designation" required>

                <label>Salary</label>
                <input type="number" id="salary" placeholder="Enter salary" min="0" required>

                <label>Experience (years)</label>
                <input type="number" id="experience" placeholder="Enter experience" min="0" required>

                <label>Skills (comma-separated)</label>
                <input type="text" id="skills" placeholder="Java, SQL, Node.js">

                <label>Status</label>
                <select id="status">
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                </select>

                <button type="submit">Save Employee</button>
                <button type="reset">Clear Form</button>
            </form>

            <h2>Other Operations</h2>
            <p>Use the terminal output to verify the database operations.</p>
            <button type="button" onclick="alert('Find operations are available in the Node.js application terminal.')">Find Employee</button>
            <button type="button" onclick="alert('Update operations are available in the Node.js application terminal.')">Update Employee</button>
            <button type="button" onclick="alert('Delete operations are available in the Node.js application terminal.')">Delete Employee</button>
        </div>

        <script>
            document.getElementById('employeeForm').addEventListener('submit', function(event) {
                event.preventDefault();
                alert('Form validation successful! Database saving will be connected in the next step.');
            });
        </script>
    </body>
    </html>
    `);
});


async function runOperations() {
    // 1. Insert at least 4 employee records
    await Employee.deleteMany({
        employeeId: { $in: ['EMP101', 'EMP102', 'EMP103', 'EMP104'] }
    });

    await Employee.insertMany([
        {
            employeeId: 'EMP101',
            name: 'Arun',
            department: 'IT',
            designation: 'Developer',
            salary: 50000,
            experience: 3,
            skills: ['Java', 'Node.js'],
            status: 'Active'
        },
        {
            employeeId: 'EMP102',
            name: 'Priya',
            department: 'HR',
            designation: 'HR Executive',
            salary: 40000,
            experience: 2,
            skills: ['Communication', 'Recruitment'],
            status: 'Active'
        },
        {
            employeeId: 'EMP103',
            name: 'Kavin',
            department: 'IT',
            designation: 'Tester',
            salary: 45000,
            experience: 4,
            skills: ['Testing', 'SQL'],
            status: 'Active'
        },
        {
            employeeId: 'EMP104',
            name: 'Divya',
            department: 'Finance',
            designation: 'Accountant',
            salary: 55000,
            experience: 5,
            skills: ['Excel', 'Accounting'],
            status: 'Active'
        }
    ]);
    console.log('\\n1. Four employee records inserted.');

    // 2. Retrieve employees by department and minimum experience
    const departmentEmployees = await Employee.find({
        department: 'IT',
        experience: { $gt: 2 }
    });
    console.log('\\n2. IT employees with experience greater than 2:');
    console.log(departmentEmployees);

    // 3. Find one employee using employeeId
    const employee = await Employee.findOne({ employeeId: 'EMP101' });
    console.log('\\n3. Employee with ID EMP101:');
    console.log(employee);

    // 4. Display only selected fields
    const selectedFields = await Employee.find(
        {},
        { _id: 0, name: 1, designation: 1, salary: 1, department: 1 }
    );
    console.log('\\n4. Selected employee fields:');
    console.log(selectedFields);

    // 5. Update designation and salary using employeeId
    await Employee.updateOne(
        { employeeId: 'EMP101' },
        { $set: { designation: 'Senior Developer', salary: 60000 } }
    );
    console.log('\\n5. Updated EMP101 designation and salary.');

    // 6. Increase IT employees' salary by 10%
    await Employee.updateMany(
        { department: 'IT' },
        { $mul: { salary: 1.10 } }
    );
    console.log('\\n6. Increased IT department salaries by 10%.');

    // 7. Find employees within a salary range
    const salaryRange = await Employee.find({
        salary: { $gte: 40000, $lte: 65000 }
    });
    console.log('\\n7. Employees with salary between 40000 and 65000:');
    console.log(salaryRange);

    // 8. Delete one employee using employeeId
    await Employee.deleteOne({ employeeId: 'EMP104' });
    console.log('\\n8. Deleted employee EMP104.');

    // 9. Display remaining employees by salary descending
    const remainingEmployees = await Employee.find().sort({ salary: -1 });
    console.log('\\n9. Remaining employees sorted by salary (descending):');
    console.log(remainingEmployees);
}

mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log('MongoDB Connected Successfully');
        await runOperations();
    })
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log('\\nServer is running.');
        });
    })
    .catch((err) => {
        console.error('Error:', err.message);
    });
