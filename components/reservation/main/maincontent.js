import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import cards from '@/data/reservation/cards.json';
import { FaRegHeart } from 'react-icons/fa';
import { FaUtensils } from 'react-icons/fa6';

export default function MainContent() {
  return (
    <div className="d-flex flex-column m-3">
      <div className="d-flex justify-content-center border-bottom mb-3 pb-1">
        推薦必吃
      </div>
      <div className="d-flex justify-content-center space-evenly row flex-wrap">
        {cards.datas.map((v) => {
          const { id, picture, name, type, location } = v;
          return (
            <Card className="m-2 h-25 co1-4" style={{ width: '21%' }} key={id}>
              <Card.Img variant="top" src="../../reservation/respic.jpeg" />
              <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>{location}</Card.Text>
                <div className="d-flex align-item-center justify-content-between">
                  <Button
                    style={{
                      background: '#911010',
                      borderRadius: 20,
                      border: 0,
                      color: 'white',
                      padding: '5px',
                    }}
                  >
                    <FaUtensils />
                    {type}
                  </Button>
                  <div>
                    <FaRegHeart className="fs-4" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          );
        })}

        {/* <Card className="m-2 h-25 " style={{ width: '21%' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>Card Title</Card.Title>
            <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk.
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Card.Body>
        </Card> */}
      </div>
    </div>
  );
}
