import React from 'react';
import Dashboard from '../components/myProjects/Dashboard';
import SideView from '../components/myProjects/SideView';
import Signup from '../components/myProjects/Signup';
import TaskCreate from '../components/myProjects/TaskCreate';
import Timeline from '../components/myProjects/Timeline';
import { useSelector } from 'react-redux';

const Home = () => {

    const isAuthenticatedVal = useSelector(state => state.auth);
    const projectObj = useSelector(state => state.project);
    console.log("projects: ", projectObj.projects?.projects?.length)
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                padding: 24,
            }}
        >
            <div style={{ width: "20%" }}>
                {isAuthenticatedVal.isAuthenticated ? (
                    projectObj.projects?.projects?.length > 0 ? (<SideView />) :
                        (<TaskCreate />)
                ) : (<TaskCreate />)}
                {/* {projectObj.projects.projects.length === 0 ? <TaskCreate /> : <SideView />} */}
            </div>
            <div style={{ width: "78%" }}>
                {/* {console.log("projets: ", projectObj.projects.projects.length)} */}
                {isAuthenticatedVal.isAuthenticated && projectObj.projects?.projects?.length > 0 && <Dashboard projects={projectObj.projects.projects} />}
            </div>
        </div>
    );
}


export default Home;