import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/AboutUs.css';
import SakshiImg from '../assets/2.png';
import ShrutiImg from '../assets/1.png';
import RohitImg from '../assets/3.png';

const teamMembers = [
    {
        name: 'Sakshi Jadhav',
        email: 'sakshianiljadhav@gmail.com',
        phone: '8605435729',
        image: SakshiImg,
        role: 'Frontend Developer'
    },
    {
        name: 'Shruti Patil',
        email: 'shrutipatil1103@gmail.com',
        phone: '9423449377',
        image: ShrutiImg,
        role: 'UI/UX Designer'
    },
    {
        name: 'Rohit Pardeshi',
        email: 'rspardeshi1251@gmail.com',
        phone: '9146719472',
        image: RohitImg,
        role: 'Backend Developer'
    }
];

const AboutUs = () => {
    return (
        <>
            <Header />
            <main className="about-container">
                <section className="about-intro">
                    <h1>About PageLoop</h1>
                    <p>
                        PageLoop is a next-gen platform designed for modern book readers and reviewers. Our mission is to offer an elegant, responsive, and efficient digital reading experience for all.
                    </p>
                </section>
                <section className="team-section">
                    <h2>Meet Our Team</h2>
                    <div className="team-grid">
                        {teamMembers.map((member, index) => (
                            <div className="team-card" key={index}>
                                <img src={member.image} alt={member.name} />
                                <h3>{member.name}</h3>
                                <p>{member.role}</p>
                                <p><strong>Email:</strong> {member.email}</p>
                                <p><strong>Phone:</strong> {member.phone}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default AboutUs;
