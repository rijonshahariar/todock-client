import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { toast } from 'react-toastify';
import './MyTask.css'
const Mytask = ({ task, children }) => {
    const [complete, setComplete] = useState(false);

    const handleComplete = (id) => {
        fetch(`http://localhost:5000/tasks/${id}`, {
            method: "PUT"
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount) {
                    toast.success("Congrats on finishing the task");

                }
            });
    }

    return (
        <div>
            <Container>
                <Row>
                    <div className="col-md-8 mx-auto">

                        <div className="d-flex mb-3 border justify-content-center align-items-center p-2">
                            <h5>{task.status ? "Completed" :
                                <button
                                    onClick={() => setComplete(!complete)}
                                    className="btn btn-sm btn-light btn-outline-success"
                                >
                                    ✔️
                                </button>
                            }
                            </h5>
                            <div className="w-100 ms-3">
                                <h5 className={!complete ? "text-dark" : "task-complete"}>{task.name}</h5>
                                <p className={!complete ? "text-dark" : "task-complete"}>{task.description}</p>
                            </div>
                            <div>{children}</div>
                        </div>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default Mytask;