import React, { useEffect, useRef } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import JaylogPng from "assets/img/jaylog.png";
// import "mdb-react-ui-kit/dist/css/mdb.min.css";

const Join = () => {
  const refs = useRef({});

  const navigate = useNavigate();

  const requestJoin = () => {
    if (!validateFields()) {
      return;
    }

    if (localStorage.getItem("userList") === null) {
      localStorage.setItem("userList", JSON.stringify([]));
    }

    const userList = JSON.parse(localStorage.getItem("userList"));

    if (userList.some((user) => user.id === refs.current.idElement.value)) {
      alert("이미 존재하는 아이디입니다.");
      return;
    }

    const user = {
      idx: userList.length + 1,
      id: refs.current.idElement.value,
      pw: refs.current.pwElement.value,
      simpleDesc: refs.current.simpleDescElement.value,
      profileImg:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      createDate: new Date().toJSON(),
      updateDate: new Date().toJSON(),
      deleteDate: null,
    };

    userList.push(user);

    localStorage.setItem("userList", JSON.stringify(userList));

    alert("회원가입이 완료되었습니다.");

    navigate("/login");
  };

  const validateFields = () => {
    const { idElement, pwElement, pw2Element } = refs.current;

    if (idElement.value === "") {
      alert("아이디를 입력하세요.");
      idElement.focus();
      return false;
    }

    if (pwElement.value === "") {
      alert("비밀번호를 입력하세요.");
      pwElement.focus();
      return false;
    }

    if (pw2Element.value === "") {
      alert("비밀번호 확인을 입력하세요.");
      pw2Element.focus();
      return false;
    }

    if (pwElement.value !== pw2Element.value) {
      alert("비밀번호가 일치하지 않습니다.");
      pw2Element.focus();
      return false;
    }

    return true;
  };

  // strict모드에서는 두번실행됨
  useEffect(() => {
    refs.current.idElement.focus();
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
                    placeholder="* 아이디"
                  />
                </Form.Group>
                <Row>
                  <Col>
                    <Form.Group className=" mb-4">
                      <Form.Control
                        ref={(el) => (refs.current.pwElement = el)}
                        type="password"
                        placeholder="* 비밀번호"
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className=" mb-4">
                      <Form.Control
                        ref={(el) => (refs.current.pw2Element = el)}
                        type="password"
                        placeholder="* 비밀번호 확인"
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group className=" mb-4">
                  <Form.Control
                    ref={(el) => (refs.current.simpleDescElement = el)}
                    type="text"
                    placeholder="한줄 소개"
                  />
                </Form.Group>
                <Button
                  className="btn-primary btn-lg btn-block"
                  onClick={requestJoin}
                >
                  회원가입
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Join;
