import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import './MyTask.css'
const Mytask = ({ task, children }) => {
    const [complete, setComplete] = useState(false);

    return (
        <div>
            <Container>
                <Row>
                    <div className="col-md-10 mx-auto">

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