import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import usetasks from '../../hooks/usetasks';
import Mytask from './Mytask';

const Mytasks = () => {
    const [user] = useAuthState(auth);
    const [tasks, setMytasks] = usetasks();
    const myCollection = tasks.filter((task) => task.email === user.email);
    const navigate = useNavigate();

    const handleDelete = id => {

        const url = `https://whispering-atoll-74652.herokuapp.com/tasks/${id}`;
        fetch(url, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                const remaining = tasks.filter((task) => task._id !== id);
                setMytasks(remaining);
                toast('Task Deleted');
            })

    }

    return (
        <div className="container">
            <div className="row">
                <div className="mb-5">
                    <h2 className="text-center my-5 fw-bold">
                        <span className="d-inline-block border-bottom border-danger border-2">
                            THINGS TO DO
                        </span>
                    </h2>
                    <h5 className="text-center">
                        <Link
                            className="w-25 mb-5 btn btn-primary"
                            to="/addtasks"
                        >
                            ADD TASK
                        </Link>
                    </h5>

                    <div className="d-flex flex-column">
                        {myCollection.map((task) => (
                            <Mytask key={task._id} task={task}>

                                <button
                                    onClick={() => handleDelete(task._id)}
                                    className="btn btn-sm btn-light btn-outline-danger"
                                >
                                    ❌
                                </button>

                            </Mytask>
                        ))}

                    </div>
                </div>

            </div>
        </div>

    );
};

export default Mytasks;