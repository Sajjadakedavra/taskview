import React from 'react';
import Dashboard from '../components/myProjects/Dashboard';
import SideView from '../components/myProjects/SideView';
import Signup from '../components/myProjects/Signup';
import TaskCreate from '../components/myProjects/TaskCreate';
import Timeline from '../components/myProjects/Timeline';
import { useSelector } from 'react-redux';

const Home = () => {

    const isAuthentiatedVal = useSelector(state => state.auth);

    return (
        <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', padding: 24 }}>
            <div style={{ width: '20%' }}>
                <TaskCreate />
            </div>
            <div style={{ width: '78%' }}>
                {isAuthentiatedVal.isAuthentiated && <Dashboard />}
                {/* <Timeline/> */}
            </div>
        </div>
    )
}


export default Home;