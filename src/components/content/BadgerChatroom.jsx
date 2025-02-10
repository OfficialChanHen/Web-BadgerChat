import React, { useEffect, useState, useRef } from "react"
import { Col, Row, Container, Pagination, Form, Button } from "react-bootstrap"
import BadgerMessage from "./BadgerMessage";

export default function BadgerChatroom(props) {

    const [messages, setMessages] = useState([]);
    const [page, setPage] = useState(1);
    const postTitle = useRef();
    const postContent = useRef();

    const loadMessages = () => {
        fetch(`https://cs571.org/api/s24/hw6/messages?chatroom=${props.name}&page=${page}`, {
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            }
        })
        .then(res => res.json())
        .then(json => {
            setMessages(json.messages)
        })
    };


    // Why can't we just say []?
    // The BadgerChatroom doesn't unload/reload when switching
    // chatrooms, only its props change! Try it yourself.
    useEffect(loadMessages, [props, page]);

    const handlePost = () => {
        if(postTitle.current.value.length === 0 
            || postContent.current.value.length === 0) {
                alert("You must provide both a title and content!");
                return;
        } else {
            fetch(`https://cs571.org/api/s24/hw6/messages?chatroom=${props.name}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CS571-ID": CS571.getBadgerId()
                },
                credentials: "include",
                body: JSON.stringify({
                    "title": postTitle.current.value,
                    "content": postContent.current.value
                })
            })
            .then(res => {
                if(parseInt(res.status) === 200) {
                    alert("Successfully posted!");
                    loadMessages();
                }
            })
        }
    }

    const deletePost = (id) => {
        fetch(`https://cs571.org/api/s24/hw6/messages?id=${id}`, {
            method: "DELETE",
            headers: {
                "X-CS571-ID": CS571.getBadgerId()
            },
            credentials: "include",
        })
        .then(res => {
            if(parseInt(res.status) === 200) {
                alert("Successfully deleted the post!");
                loadMessages();
            }
        })
    }

    return <>
        <h1>{props.name} Chatroom</h1>
        {
            /* TODO: Allow an authenticated user to create a post. */ 
        }
        <hr/>
        { JSON.parse(sessionStorage.getItem("loginStatus"))[0] === true ?
        <>
            <Form>
                <Form.Label htmlFor="post-title">Post Title</Form.Label>
                <Form.Control id="post-title" ref={postTitle}></Form.Control>
                <Form.Label htmlFor="post-content">Post Content</Form.Label>
                <Form.Control id="post-content" ref={postContent}></Form.Control>
            </Form>
            <Button type="Submit" onClick={handlePost}>Post</Button>
        </>
        :
        <>
        <p>You must be logged in to post!</p>
        </>
        }
        {
            messages.length > 0 ?
                <>
                    {/* TODO: Complete displaying of messages. */}
                    <Container fluid={true}>
                        <Row>
                            {
                                messages.map(message => {
                                    return <Col key={message.id} xs={12} md={6} lg={4} xl={3}>
                                        <BadgerMessage {...message} delete={deletePost}/>
                                    </Col>
                                })
                            }
                        </Row>
                    </Container>
                </>
                :
                <>
                    <p>There are no messages on this page yet!</p>
                </>
        }
        <Pagination>
            <Pagination.Item active={page === 1} onClick={() => setPage(1)}>{1}
            </Pagination.Item>
            <Pagination.Item active={page === 2} onClick={() => setPage(2)}>{2}
            </Pagination.Item>
            <Pagination.Item active={page === 3} onClick={() => setPage(3)}>{3}
            </Pagination.Item>
            <Pagination.Item active={page === 4} onClick={() => setPage(4)}>{4}
            </Pagination.Item>
        </Pagination>
    </>
}
