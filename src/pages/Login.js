import React, { useEffect, useRef } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import JaylogPng from "assets/img/jaylog.png";

const Login = () => {
  const refs = useRef({});

  const navigate = useNavigate();

  const requestLogin = () => {
    if (!validateFields()) {
      return;
    }

    const { idElement, pwElement, rememberMeElement } = refs.current;

    const userList = JSON.parse(localStorage.getItem("userList"));

    if (userList === null) {
      alert("아이디가 존재하지 않습니다.");
      idElement.value = "";
      pwElement.value = "";
      idElement.focus();
      return;
    }

    const user = userList.find((user) => user.id === idElement.value);

    if (user === undefined) {
      alert("해당 아이디가 존재하지 않습니다.");
      idElement.value = "";
      pwElement.value = "";
      idElement.focus();
      return;
    }

    if (user.pw !== pwElement.value) {
      alert("비밀번호가 일치하지 않습니다.");
      pwElement.value = "";
      pwElement.focus();
      return;
    }

    if (user.deleteDate !== null) {
      alert("탈퇴한 회원입니다.");
      idElement.value = "";
      pwElement.value = "";
      idElement.focus();
      return;
    }

    // 로그인 성공

    if (rememberMeElement.checked) {
      localStorage.setItem("rememberId", JSON.stringify(user.id));
    } else {
      localStorage.removeItem("rememberId");
    }

    const loginUser = {
      idx: user.idx,
      id: user.id,
      profileImg: user.profileImg,
      simpleDesc: user.simpleDesc,
    };

    localStorage.setItem("loginUser", JSON.stringify(loginUser));

    navigate("/");
  };

  const enterKeyLogin = (event) => {
    if (event.keyCode === 13) {
      requestLogin();
    }
  };

  const validateFields = () => {
    if (refs.current.idElement.value === "") {
      alert("아이디를 입력해주세요.");
      refs.current.idElement.focus();
      return false;
    }

    if (refs.current.pwElement.value === "") {
      alert("비밀번호를 입력해주세요.");
      refs.current.pwElement.focus();
      return false;
    }

    return true;
  };

  const setLoginPage = () => {
    refs.current.idElement.focus();
    const rememberId = JSON.parse(localStorage.getItem("rememberId"));
    if (rememberId !== null) {
      refs.current.idElement.value = rememberId;
      refs.current.rememberMeElement.checked = true;
    }
  };

  useEffect(() => {
    setLoginPage();
  }, []);

  return (
    <section>
      <Container className="py-5 h-100">
        <Row className="d-flex justify-content-center align-items-center h-100">
          <Col className="col-12 col-md-8 col-lg-6 col-xl-5">
            <Card className="shadow-2-strong" style={{ borderRadius: "1rem" }}>
              <Card.Body className="p-5 text-center">
                <h3 className="mb-3">
                  <img
                    src={JaylogPng}
                    style={{ height: "100px" }}
                    alt="jaylog"
                  ></img>
                </h3>
                <Form.Group className=" mb-4">
                  <Form.Control
                    ref={(el) => (refs.current.idElement = el)}
                    type="text"
                    placeholder="아이디"
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group className=" mb-4">
                      <Form.Control
                        ref={(el) => (refs.current.pwElement = el)}
                        type="password"
                        placeholder="비밀번호"
                        onKeyUp={enterKeyLogin}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className="d-flex justify-content-start mb-4">
                  <Form.Check
                    type="checkbox"
                    ref={(el) => (refs.current.rememberMeElement = el)}
                    label="아이디 기억하기"
                  ></Form.Check>
                </Form.Group>
                <Button
                  className="btn-primary btn-lg btn-block"
                  onClick={requestLogin}
                >
                  로그인
                </Button>
                <hr className="my-4" />
                <Link to="/join">아이디가 없으신가요? 회원가입</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
