import MyCard from "components/commons/MyCard";
import CommonLayout from "components/layouts/CommonLayout";
import { CardGroup, Container } from "react-bootstrap";

const Posts = () => {
  const tempList = [1, 2, 3];

  return (
    <CommonLayout isNavbar={true}>
      <Container className="mt-3">
        <CardGroup className="jaybon-card-group row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xxl-4">
          {tempList.map((item, index) => (
            <MyCard key={index} item={item} />
          ))}
        </CardGroup>
      </Container>
    </CommonLayout>
  );
};

export default Posts;
