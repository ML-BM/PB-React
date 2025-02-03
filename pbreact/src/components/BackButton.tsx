import * as React from 'react';
import { useNavigate } from 'react-router-dom';
const backArrow = 'https://img.icons8.com/ios-filled/50/000000/left.png';
import styles from './BackButton.module.css';
const BackButton: React.FC = () => {
    const navigate = useNavigate();

    return (
        <img
            src={backArrow}
            alt="Back"
            className={styles.backButton}
            onClick={() => navigate(-1)}
        />
    );
};

export default BackButton;