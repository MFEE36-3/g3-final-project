import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Crown from '@/public/reservation/crown.svg';

export default function Top5() {
  return (
    <>
      <div className="d-flex flex-column m-3">
        <div className="d-flex justify-content-center border-bottom mb-3 pb-1">
          熱門排行
        </div>
        <div className="d-flex justify-content-center space-evenly">
          <Card
            className="m-2 h-25 "
            style={{ width: '21%', border: 'none', background: 'none' }}
          >
            <importImage src={Crown} />
            {/* <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="red"
            >
              1
            </text> */}

            <Card.Img variant="top" src="../../reservation/c1.png" />
            <Card.Body>
              <Card.Title>瓦城泰國餐廳</Card.Title>
              {/* <Card.Text>
                Some quick example text to build on the card title and make up
                the bulk.
              </Card.Text> */}

              <Button variant="primary">泰式</Button>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}
