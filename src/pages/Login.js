import JaylogPng from "assets/img/jaylog.png";
import UserInfoLayout from "components/layouts/UserInfoLayout";
import { useEffect, useRef } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const refs = useRef({
    idElement: null,
    pwElement: null,
    rememberMeElement: null,
  });

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
    <UserInfoLayout>
      <Card className="shadow-2-strong" style={{ borderRadius: "1rem" }}>
        <Card.Body className="p-5 text-center">
          <h3 className="mb-3">
            <img src={JaylogPng} style={{ height: "100px" }} alt="jaylog"></img>
          </h3>
          <InputGroup className="mb-3">
            <InputGroup.Text id="idAddOn">&nbsp;아이디 &nbsp;</InputGroup.Text>
            <Form.Control
              ref={(el) => (refs.current.idElement = el)}
              type="text"
              aria-describedby="idAddOn"
            />
          </InputGroup>
          <Row>
            <Col>
              <InputGroup className="mb-3">
                <InputGroup.Text id="idAddOn">비밀번호</InputGroup.Text>
                <Form.Control
                  ref={(el) => (refs.current.pwElement = el)}
                  type="password"
                  onKeyUp={enterKeyLogin}
                />
              </InputGroup>
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
            className="btn-primary"
            type="button"
            style={{ width: "100%" }}
            onClick={requestLogin}
          >
            로그인
          </Button>
          <hr className="my-4" />
          <Link to="/join">아이디가 없으신가요? 회원가입</Link>
        </Card.Body>
      </Card>
    </UserInfoLayout>
  );
};

export default Login;
