import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/AdminDashboard.css';
import Header from "../components/Header";
import AddBookForm from '../components/AddBookForm';
import ManageBooksTable from "../components/ManageBooksTable";

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState('add-books');

    return (
        <div className="admin-dashboard">
            <Header />
            <div className="dashboard-container">
                <div className="sidebar">
                    <ul>
                        <li>
                            <Link
                                to="#"
                                className={activeSection === 'add-books' ? 'active' : ''}
                                onClick={() => setActiveSection('add-books')}
                            >
                                Add Books
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="#"
                                className={activeSection === 'manage-books' ? 'active' : ''}
                                onClick={() => setActiveSection('manage-books')}
                            >
                                Manage Books
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="main-content">
                    {activeSection === 'add-books' && <AddBookForm />}
                    {activeSection === 'manage-books' && <ManageBooksTable />}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
