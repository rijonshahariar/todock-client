import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button, Container, Form, Row } from "react-bootstrap";
import auth from "../../firebase.init";
import { toast } from "react-toastify";
import './AddTask.css'
import { Link, useNavigate } from "react-router-dom";

const AddTask = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    const handleAddTask = (e) => {
        e.preventDefault();
        const taskAdd = {
            name: e.target.name.value,
            email: user.email,
            description: e.target.description.value,
        };
        fetch('https://whispering-atoll-74652.herokuapp.com/tasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(taskAdd)
        })
            .then(res => res.json())
            .then(data => {
                toast('Task Added');
                e.target.reset();
                navigate("/")
            })
    }
    return (
        <div>
            <Container>
                <Row>
                    <div className="col-md-6 mx-auto">
                        <h2 className="text-center my-5 fw-bold">
                            <span className="d-inline-block border-bottom border-danger border-2">
                                ADD TASK
                            </span>
                        </h2>
                        <h5 className="text-center">
                            <Link
                                className="w-25 mb-5 btn btn-primary"
                                to="/"
                            >
                                MY TASKS
                            </Link>
                        </h5>

                        <Form onSubmit={handleAddTask}>
                            <Form.Group className="mb-3" controlId="formBasicModel">
                                <Form.Label>Task Name</Form.Label>
                                <Form.Control type="text" name="name" required />
                            </Form.Group>

                            <Form.Group className="mb-3 hidden" controlId="formBasicEmail">
                                <Form.Label>Email Address</Form.Label>
                                <Form.Control
                                    type="email"
                                    value={user.email}
                                    readOnly
                                    disabled
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicDescription">
                                <Form.Label>Description</Form.Label>
                                <br />
                                <textarea
                                    className="w-100"
                                    rows="5"
                                    name="description"
                                    required
                                ></textarea>
                            </Form.Group>

                            <Button type="submit" className="w-100 fw-bold managebtn mb-5">
                                ADD TASK
                            </Button>
                        </Form>
                    </div>
                </Row>
            </Container>
        </div>
    );
};

export default AddTask;
