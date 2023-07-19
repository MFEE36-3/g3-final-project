import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { FaRegHeart } from 'react-icons/fa';
import { FaUtensils } from 'react-icons/fa6';
import { AiFillStar } from 'react-icons/ai';
import style from '@/styles/reservation/style.module.css'
import { useState, useEffect } from 'react';

export default function MainContent() {

  return (
    <div className="d-flex flex-column m-3">
      <div className={`${style.fonttitle} d-flex justify-content-center mb-3 pb-3`}>
        查詢結果
      </div>
      <div className={`${style.fonttitle} d-flex mb-3 pb-2`}>
        符合結果
      </div>
      <div className="d-flex justify-content-center space-evenly row flex-wrap">
        {data.rows.map((v) => {
          const { sid, picture, shop, category,location } = v;
          return (
            <Card
              className="m-2 co1-4 px-0"
              style={{ width: '21%', border: 'none' }}
              key={sid}
            >
              <Card.Img
                variant="top"
                src="../../reservation/respic.jpeg"
                className="rounded-top-3"
              />

              <Card.Body>
                <Card.Title>{shop}</Card.Title>
                <Card.Text>{location}</Card.Text>
                <div className="d-flex align-item-center justify-content-between">
                  <Button
                    style={{
                      fontSize: '12px',
                      background: '#911010',
                      borderRadius: 20,
                      border: 0,
                      color: 'white',
                      padding: '5px',
                    }}
                  >
                    <FaUtensils className="me-1" />
                    {category}
                  </Button>
                  <div className="d-flex align-item-center">
                    <AiFillStar
                      className="fs-4 h-100 text-warning"
                      // style={{ color: '#ecbd18' }}
                    />
                    <div className="d-flex align-item-center">
                      4.5 / 5
                    </div>
                  </div>
                  <div className="d-flex align-item-center">
                    <FaRegHeart className="fs-4 h-100" />
                  </div>
                </div>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
