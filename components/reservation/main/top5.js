import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import cards2 from '@/data/reservation/cards2.json';
import Crown from '@/public/reservation/crown.svg';
import Image from 'next/image';

export default function Top5() {
  return (
    <>
      <div className="d-flex justify-content-center border-bottom mb-3 pb-1">
        熱門排行
      </div>
      <div className="d-flex flex-column m-3">
        <div className="d-flex justify-content-center space-evenly">
          {cards2.datas.map((v) => {
            const { id, picture, name, type, location } = v;
            return (
              <Card
                className="m-2 h-25 position-relative"
                style={{ width: '21%', border: 'none', background: 'none' }}
              >
                <Image src={Crown} className='position-absolute top-0 start-0' />
                <Card.Img variant="top" src="../../reservation/c1.png" className='position-relative pt-5' />
                <Card.Body>
                  <Card.Title>{name}</Card.Title>
                </Card.Body>
              </Card>
            )
          })}
        </div>
      </div>
    </>
  );
}
