import React, { useMemo } from "react";
import { Card, Col, Image, InputGroup, Row } from "react-bootstrap";
import NoimageImg from "assets/img/no-image.png";
import LikeImg from "assets/img/like.svg";
import { useNavigate } from "react-router-dom";

const MyCard = ({ item }) => {
  const navigate = useNavigate();

  /** @type React.CSSProperties jaybonCardContainer */
  const jaybonCardContainer = useMemo(() => {
    return {
      height: "150px",
      overflow: "hidden",
    };
  }, []);

  /** @type React.CSSProperties jaybonCardImg */
  const jaybonCardImg = useMemo(() => {
    return {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      objectPosition: "center",
    };
  }, []);

  /** @type React.CSSProperties jaybonCardText */
  const jaybonCardText = useMemo(() => {
    return {
      display: "-webkit-box",
      wordWrap: "break-word",
      WebkitLineClamp: 4,
      WebkitBoxOrient: "vertical",
      overflow: "hidden",
      textOverflow: "ellipsis",
      height: "100px",
    };
  }, []);

  return (
    <Col>
      <Card className="m-3">
        <div style={jaybonCardContainer}>
          <Card.Img
            variant="top"
            src={NoimageImg}
            style={jaybonCardImg}
            alt="..."
          />
        </div>
        <Card.Body>
          <Card.Title
            onClick={() => navigate(`/post/${item}`)}
            style={{ cursor: "pointer" }}
          >
            {"Card Title" + String(item)}
          </Card.Title>
          <Card.Text style={jaybonCardText}>
            {"Some quick example text to build on the card title and makeup the bulk of the card's content.Some quick example text to build on the card title and makeup the bulk of the card's content." +
              item}
          </Card.Text>
          <small className="text-muted">2022-11-03</small>
        </Card.Body>
        <Card.Footer>
          <Row>
            <Col>
              <InputGroup>
                <Image
                  src={
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                  }
                  alt="profile"
                  className="ratio ratio-1x1 rounded-circle me-2"
                  style={{ width: "24px", height: "24px" }}
                />
                <strong>작성자</strong>
              </InputGroup>
            </Col>
            <Col className="col-auto">
              <InputGroup>
                <Image src={LikeImg} width="15" />
                <span className="mx-2 fs-6 text-black-50 fw-light">0</span>
              </InputGroup>
            </Col>
          </Row>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default MyCard;
