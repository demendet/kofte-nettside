import { useEffect, useState } from 'react';
import { auth } from '../firebase';
import UserDashboard from './UserDashboard';
import AdminDashboard from './AdminDashboard';

function Dashboard() {
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                user.getIdTokenResult().then(idTokenResult => {
                    setIsAdmin(idTokenResult.claims.admin);
                });
            } else {
                setIsAdmin(false);
            }
        });
    }, []);

    return (
        <div>
            <UserDashboard />
            {isAdmin && <AdminDashboard />}
        </div>
    );
}


export default Dashboard;